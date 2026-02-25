import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Mock Data to Seed
const MOCK_CAFES = [
  {
    name: 'The Workshop Coffee',
    slug: 'the-workshop-coffee',
    description: 'Một không gian làm việc chuyên nghiệp ngay trung tâm Quận 1. Nổi tiếng với cà phê specialty và không gian yên tĩnh, rộng rãi.',
    address: '27 Ngô Đức Kế, Bến Nghé, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'TP.HCM',
    lat: 10.7763,
    lng: 106.7048,
    cover_image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
    price_range: { min: 45000, max: 95000, currency: 'VND' },
    policies: { has_surcharge: false },
    operating_hours: { monday: { open: '08:00', close: '21:00' } },
    avg_rating: 4.5,
    total_reviews: 342,
    status: 'active',
  },
  {
    name: 'Thinker & Dreamer',
    slug: 'thinker-and-dreamer',
    description: 'Quán nhỏ xinh nằm trong chung cư 42 Nguyễn Huệ. View đẹp, không gian ấm cúng, phù hợp làm việc nhẹ nhàng hoặc đọc sách.',
    address: '42 Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'TP.HCM',
    lat: 10.7744,
    lng: 106.7032,
    cover_image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    price_range: { min: 35000, max: 75000, currency: 'VND' },
    policies: { has_surcharge: false },
    operating_hours: { monday: { open: '09:00', close: '22:00' } },
    avg_rating: 4.2,
    total_reviews: 156,
    status: 'active',
  },
  {
    name: 'Okkio Caffe',
    slug: 'okkio-caffe-thao-dien',
    description: 'Thiết kế hiện đại, nhiều ánh sáng tự nhiên. Nằm ở khu Thảo Điền yên bình, rất thích hợp cho digital nomads.',
    address: '110 Xuân Thủy, Thảo Điền, Quận 2, TP.HCM',
    district: 'Quận 2',
    city: 'TP.HCM',
    lat: 10.8045,
    lng: 106.7451,
    cover_image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop',
    price_range: { min: 55000, max: 110000, currency: 'VND' },
    policies: { has_surcharge: true, surcharge_note: 'Phụ thu 10% VAT' },
    operating_hours: { monday: { open: '07:30', close: '22:30' } },
    avg_rating: 4.7,
    total_reviews: 89,
    status: 'active',
  },
];

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seededCafes: any[] = [];
  const errors: string[] = [];

  for (const cafe of MOCK_CAFES) {
    // Check if cafe already exists to prevent duplicates
    const { data: existing } = await supabase
      .from('cafes')
      .select('id')
      .eq('slug', cafe.slug)
      .single();

    if (existing) {
      errors.push(`Cafe ${cafe.slug} already exists.`);
      continue;
    }

    // Insert new cafe
    // Workaround: We will use a standard insert, but for 'location', we need to pass a specific PostGIS string or object.
    // const locationString = `SRID=4326;POINT(${cafe.lng} ${cafe.lat})`;

    const { data, error } = await supabase.from('cafes').insert({
      name: cafe.name,
      slug: cafe.slug,
      description: cafe.description,
      address: cafe.address,
      district: cafe.district,
      city: cafe.city,
      cover_image: cafe.cover_image,
      price_range: cafe.price_range, // JSONB
      policies: cafe.policies, // JSONB
      operating_hours: cafe.operating_hours, // JSONB
      avg_rating: cafe.avg_rating,
      total_reviews: cafe.total_reviews,
      status: cafe.status,
      // location: locationString // This might fail if Supabase client doesn't auto-cast string to geography.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).select().single();

    if (error) {
        console.error('Error inserting cafe:', error);
        errors.push(`Failed to insert ${cafe.slug}: ${error.message}`);
    } else {
        seededCafes.push(data);
    }
  }

  return NextResponse.json({
    message: 'Seeding process completed',
    success_count: seededCafes.length,
    errors: errors,
    seeded_cafes: seededCafes
  });
}
