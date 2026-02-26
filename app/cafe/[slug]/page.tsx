"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Star, MapPin, Clock,
  Wifi, Zap, Wind, Volume2, ShieldCheck,
  Share2, Bookmark
} from "lucide-react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getCafeBySlug } from "@/lib/api/cafes";

// Define type based on the API return type
type CafeDetail = NonNullable<Awaited<ReturnType<typeof getCafeBySlug>>>;

// Dynamic Map Import
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-48 bg-gray-100 animate-pulse rounded-xl" />
});

// Helper to get Icon Component
const getAmenityIcon = (iconName: string | null) => {
  switch (iconName) {
    case 'Wifi': return Wifi;
    case 'Plug': return Zap;
    case 'Wind': return Wind;
    case 'ThermometerSnowflake': return Wind;
    case 'VolumeX': return Volume2;
    default: return ShieldCheck;
  }
};

export default function CafeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [cafe, setCafe] = useState<CafeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCafe() {
      if (!slug) return;
      try {
        const data = await getCafeBySlug(slug);
        if (!data) {
          // notFound(); // Client-side navigation to 404 is tricky, usually requires server component
          setCafe(null);
        } else {
          setCafe(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCafe();
  }, [slug]);

  if (loading) {
     return (
        <div className="min-h-screen bg-white flex items-center justify-center">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
     );
  }

  if (!cafe) return <div className="text-center py-20">Cafe not found</div>;

  // Type-safe optional chaining
  // Note: operating_hours is Json, so we need to cast or check safely
  const hours = cafe.operating_hours as { monday?: { open: string; close: string } } | null;

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. Hero Image & Navigation */}
      <div className="relative h-72 w-full">
        {cafe.cover_image ? (
            <Image
            src={cafe.cover_image}
            alt={cafe.name}
            fill
            className="object-cover"
            priority
            />
        ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-10">
          <Link href="/" className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-3">
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h1 className="text-3xl font-bold mb-2 leading-tight">{cafe.name}</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{cafe.district}, {cafe.city}</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10">
        {/* 2. Key Stats Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 flex justify-between items-center border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-yellow-500 mb-1">
              <span className="text-xl font-bold">{cafe.avg_rating || 'N/A'}</span>
              <Star className="w-4 h-4 fill-yellow-500" />
            </div>
            <span className="text-xs text-gray-500">{cafe.total_reviews} đánh giá</span>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex flex-col items-center">
             {/* Work Score isn't in DB yet, mocking or calculating */}
            <span className="text-xl font-bold text-emerald-600">4.5</span>
            <span className="text-xs text-gray-500">Work Score</span>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-700">$$</span>
            <span className="text-xs text-gray-500">Giá TB</span>
          </div>
        </div>

        {/* 3. Description & Info */}
        <div className="mt-6 space-y-4">
          <p className="text-gray-600 leading-relaxed text-sm">
            {cafe.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <span>{cafe.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Clock className="w-5 h-5 text-gray-400 shrink-0" />
              <span>{hours?.monday?.open || '07:00'} - {hours?.monday?.close || '22:00'}</span>
            </div>
          </div>
        </div>

        {/* 4. Amenities Grid */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tiện ích làm việc</h2>
          <div className="grid grid-cols-2 gap-3">
            {cafe.amenities?.map((amenity) => {
              const Icon = getAmenityIcon(amenity.icon_name || 'ShieldCheck');
              return (
                <div key={amenity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">{amenity.name}</span>
                    {amenity.note && <span className="text-xs text-gray-500 block">{amenity.note}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Map Preview */}
        {cafe.latitude && cafe.longitude && (
             <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Vị trí</h2>
                <div className="h-48 w-full rounded-xl overflow-hidden border border-gray-200">
                    <Map
                        center={[cafe.latitude, cafe.longitude]}
                        zoom={15}
                        interactive={false}
                        markers={[{
                            id: cafe.id,
                            name: cafe.name,
                            latitude: cafe.latitude,
                            longitude: cafe.longitude,
                            address: cafe.address
                        }]}
                    />
                </div>
            </div>
        )}

        {/* 6. Reviews Preview */}
        <div className="mt-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Đánh giá gần đây</h2>
            <Link href="#" className="text-sm text-emerald-600 font-medium">Xem tất cả</Link>
          </div>

          <div className="space-y-4">
            {cafe.reviews?.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    {review.user?.avatar_url && (
                      <Image
                        src={review.user.avatar_url}
                        alt={review.user.full_name || 'User'}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.user?.full_name}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < review.overall_rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
