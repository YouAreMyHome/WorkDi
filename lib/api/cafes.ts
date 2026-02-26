// lib/api/cafes.ts

import { createClient } from '@supabase/supabase-js';
import { Database, Json } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase Client (can be used on client or server with anon key)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export interface NearbyCafe {
  id: string;
  name: string;
  slug: string;
  address: string;
  district: string | null;
  city: string | null;
  cover_image: string | null;
  avg_rating: number; // Mapped from 'rating'
  total_reviews: number; // Mapped from 'reviews_count'
  dist_meters: number;
  latitude: number;
  longitude: number;
}

interface NearbyCafeRPC {
  id: string;
  name: string;
  slug: string;
  address: string;
  district: string;
  city: string;
  cover_image: string;
  rating: number | null;
  reviews_count: number | null;
  dist_meters: number;
  latitude: number;
  longitude: number;
}

// 1. Get Nearby Cafes (Using RPC)
export async function getNearbyCafes(lat: number, lng: number, radiusKm: number = 5): Promise<NearbyCafe[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase.rpc('get_nearby_cafes' as any, {
    lat,
    long: lng,
    radius_km: radiusKm,
  } as unknown as undefined); // Force undefined to bypass TS check if type def is stubborn

  if (error) {
    console.error('Error fetching nearby cafes:', error);
    return [];
  }

  // Map the RPC response (snake_case from SQL) to our TypeScript interface
  return (data as unknown as NearbyCafeRPC[]).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    address: c.address,
    district: c.district,
    city: c.city,
    cover_image: c.cover_image,
    avg_rating: c.rating ? Number(c.rating) : 0,
    total_reviews: c.reviews_count ? Number(c.reviews_count) : 0,
    dist_meters: c.dist_meters,
    latitude: c.latitude,
    longitude: c.longitude,
  }));
}

// 2. Get Cafe Details by Slug
export async function getCafeBySlug(slug: string) {
  // A. Fetch Cafe Info
  // We need to parse lat/lng from the location column if possible, but 'location' is 'unknown' in types.
  // Standard select returns GeoJSON object for geography type: { type: "Point", coordinates: [lng, lat] }
  const { data: cafe, error: cafeError } = await supabase
    .from('cafes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (cafeError || !cafe) {
    console.error('Error fetching cafe by slug:', cafeError);
    return null;
  }

  // Cast cafe to any to access id safely if TS complains
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cafeData = cafe as any;

  // B. Fetch Amenities (via Many-to-Many Join)
  const { data: amenitiesRaw, error: amError } = await supabase
    .from('cafe_amenities')
    .select(`
      note,
      amenities (
        id,
        name,
        icon_name,
        category
      )
    `)
    .eq('cafe_id', cafeData.id);

  if (amError) {
      console.error('Error fetching amenities:', amError);
  }

  // Define interface for the join result manually since type inference for nested relations can be tricky
  interface AmenityJoinResult {
    note: string | null;
    amenities: {
      id: number;
      name: string;
      icon_name: string | null;
      category: string;
    } | null;
  }

  // Use 'any' to bypass TS check for now if casting fails repeatedly due to schema gen issues or complex types
  // The goal is to get it working first, then refine types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const amenitiesData = amenitiesRaw as any as AmenityJoinResult[];

  const amenities = amenitiesData?.map((item) => {
    // Flatten the nested amenity object, ensuring it's not null before spreading
    const amenityData = item.amenities || { id: 0, name: '', icon_name: null, category: '' };
    return {
      ...amenityData,
      note: item.note,
    };
  }).filter(a => a.id !== 0) || [];


  // C. Fetch Recent Reviews
  const { data: reviewsRaw, error: revError } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (
        full_name,
        avatar_url,
        role
      )
    `)
    .eq('cafe_id', cafeData.id)
    .order('created_at', { ascending: false })
    .limit(5);

  if (revError) {
      console.error('Error fetching reviews:', revError);
  }

  // Define interface for review join
  interface ReviewJoinResult extends Omit<Database['public']['Tables']['reviews']['Row'], 'gallery'> {
      gallery: Json | null;
      profiles: {
          full_name: string;
          avatar_url: string | null;
          role: 'user' | 'owner' | 'admin';
      } | null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reviewsData = reviewsRaw as any as ReviewJoinResult[];

  const reviews = reviewsData?.map((r) => {
      // Create a clean object to avoid spreading complex types or nulls incorrectly if that was the issue
      return {
          id: r.id,
          cafe_id: r.cafe_id,
          user_id: r.user_id,
          overall_rating: r.overall_rating,
          workspace_rating: r.workspace_rating,
          service_rating: r.service_rating,
          wifi_speed_mbps: r.wifi_speed_mbps,
          speedtest_image_url: r.speedtest_image_url,
          noise_level: r.noise_level,
          content: r.content,
          gallery: r.gallery,
          helpful_votes: r.helpful_votes,
          is_hidden: r.is_hidden,
          created_at: r.created_at,
          updated_at: r.updated_at,
          user: r.profiles, // Rename 'profiles' to 'user'
      };
  }) || [];

  // Parse location if it exists as GeoJSON
  let latitude = 0;
  let longitude = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loc = (cafe as any).location;
  if (loc && loc.coordinates && Array.isArray(loc.coordinates)) {
      longitude = loc.coordinates[0];
      latitude = loc.coordinates[1];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cafeAny = cafe as any;

  return {
    id: cafeAny.id,
    name: cafeAny.name,
    slug: cafeAny.slug,
    description: cafeAny.description,
    address: cafeAny.address,
    ward: cafeAny.ward,
    district: cafeAny.district,
    city: cafeAny.city,
    location: cafeAny.location,
    price_range: cafeAny.price_range,
    policies: cafeAny.policies,
    operating_hours: cafeAny.operating_hours,
    cover_image: cafeAny.cover_image,
    gallery: cafeAny.gallery,
    total_reviews: cafeAny.total_reviews,
    avg_rating: cafeAny.avg_rating,
    avg_wifi_speed: cafeAny.avg_wifi_speed,
    status: cafeAny.status,
    is_verified: cafeAny.is_verified,
    created_at: cafeAny.created_at,
    updated_at: cafeAny.updated_at,
    created_by: cafeAny.created_by,
    latitude,
    longitude,
    amenities,
    reviews,
  };
}
