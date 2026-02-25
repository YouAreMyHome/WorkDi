import { getCafeById, getReviewsByCafeId } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, MapPin, Clock, Wifi, Zap, Wind, VolumeX, Maximize, Flower2, Utensils, Bike } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import Map from "@/components/Map";

// Map amenities to icons
const AMENITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  ac: Wind, // Air conditioning -> Wind icon
  power: Zap,
  quiet: VolumeX,
  spacious: Maximize,
  garden: Flower2,
  food: Utensils,
  parking: Bike,
};

export default async function CafeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cafe = getCafeById(id);

  if (!cafe) {
    notFound();
  }

  const reviews = getReviewsByCafeId(id);

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-24">
      <NavigationBar />

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 w-full mt-14">
        <Image
          src={cafe.images[0]}
          alt={cafe.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-3xl font-bold mb-2">{cafe.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{cafe.rating}</span>
            <span className="text-gray-300">({cafe.reviewsCount} đánh giá)</span>
            <span className="mx-2">•</span>
            <span className="bg-emerald-600 px-2 py-0.5 rounded text-xs font-bold">Work Score: {cafe.workScore}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Info Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              <div>
                <p className="text-gray-900 font-medium">{cafe.address}</p>
                <p className="text-sm text-gray-500">{cafe.district}, {cafe.city}</p>
              </div>
            </div>

            {cafe.openingHours && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                <p className="text-gray-700">{cafe.openingHours}</p>
              </div>
            )}

            <div className="mt-2 pt-4 border-t border-gray-100">
              <p className="text-gray-600 italic">&quot;{cafe.description}&quot;</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {cafe.coordinates && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Vị trí</h2>
            <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden relative z-0">
              <Map
                center={[cafe.coordinates.lat, cafe.coordinates.lng]}
                zoom={15}
                markers={[cafe]}
                interactive={false} // Static map initially
              />
            </div>
            <div className="mt-3 flex justify-end">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${cafe.coordinates.lat},${cafe.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                Mở Google Maps <MapPin className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tiện ích</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cafe.amenities.map((amenity) => {
              const Icon = AMENITY_ICONS[amenity.id] || Zap;
              return (
                <div key={amenity.id} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg gap-2 text-center">
                  <Icon className="w-6 h-6 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Đánh giá ({reviews.length})</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    {review.user.avatar && (
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.user.name}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
