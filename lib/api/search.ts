import { supabase, NearbyCafe } from './cafes';

export interface SearchFilters {
  lat: number;
  lng: number;
  radiusKm?: number;
  amenityIds?: number[];
  minPrice?: number | null;
  maxPrice?: number | null;
  isOpen?: boolean;
}

export async function searchCafes(filters: SearchFilters): Promise<NearbyCafe[]> {
  const {
    lat,
    lng,
    radiusKm = 10,
    amenityIds = [],
    minPrice = null,
    maxPrice = null,
    isOpen = false
  } = filters;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase.rpc('search_cafes' as any, {
    lat,
    long: lng,
    radius_km: radiusKm,
    amenity_ids: amenityIds.length > 0 ? amenityIds : null,
    min_price: minPrice,
    max_price: maxPrice,
    is_open: isOpen ? true : null // Only filter if isOpen is true, otherwise ignore
  } as unknown as undefined);

  if (error) {
    console.error('Error searching cafes:', error);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((c) => ({
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

export async function getAmenities() {
  const { data, error } = await supabase
    .from('amenities')
    .select('id, name, category, icon_name')
    .order('name');

  if (error) {
    console.error('Error fetching amenities:', error);
    return [];
  }

  return data || [];
}
