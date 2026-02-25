import { NearbyCafe } from '@/lib/api/cafes';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

export default function CafeCard({ cafe }: { cafe: NearbyCafe }) {
  // Format rating
  const rating = typeof cafe.avg_rating === 'number' ? cafe.avg_rating.toFixed(1) : 'New';

  // Format distance if available (convert meters to km)
  const distance = cafe.dist_meters
    ? (cafe.dist_meters / 1000).toFixed(1) + ' km'
    : '';

  return (
    <Link href={`/cafe/${cafe.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 w-full bg-gray-100">
          {cafe.cover_image ? (
            <Image
              src={cafe.cover_image}
              alt={cafe.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-sm">Chưa có ảnh</span>
            </div>
          )}

          {/* Distance Badge */}
          {distance && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-700 shadow-sm flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              {distance}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-emerald-700 transition-colors">
              {cafe.name}
            </h3>
            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-800">{rating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 line-clamp-1 mb-3">
            {cafe.address}
            {cafe.district && `, ${cafe.district}`}
          </p>

          <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
            <span>{cafe.total_reviews} đánh giá</span>
            <span className="font-medium text-emerald-600">Mở cửa</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
