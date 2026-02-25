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
}

// 1. Get Nearby Cafes (Using RPC)
export async function getNearbyCafes(lat: number, lng: number, radiusKm: number = 5): Promise<NearbyCafe[]> {
  const { data, error } = await supabase.rpc('get_nearby_cafes', {
    lat,
    long: lng,
    radius_km: radiusKm,
  });

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
  }));
}

// 2. Get Cafe Details by Slug
export async function getCafeBySlug(slug: string) {
  // A. Fetch Cafe Info
  const { data: cafe, error: cafeError } = await supabase
    .from('cafes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (cafeError || !cafe) {
    console.error('Error fetching cafe by slug:', cafeError);
    return null;
  }

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
    .eq('cafe_id', cafe.id);

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

  const amenities = (amenitiesRaw as unknown as AmenityJoinResult[])?.map((item) => ({
    ...item.amenities, // Flatten the nested amenity object
    note: item.note,   // Add the specific note for this cafe
  })) || [];


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
    .eq('cafe_id', cafe.id)
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

  const reviews = (reviewsRaw as unknown as ReviewJoinResult[])?.map((r) => ({
    ...r,
    user: r.profiles, // Rename 'profiles' to 'user' for cleaner frontend usage
  })) || [];

  return {
    ...cafe,
    amenities,
    reviews,
  };
}
