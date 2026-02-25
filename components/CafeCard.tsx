import { Star, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Cafe } from '@/types/schema';

export default function CafeCard({ cafe }: { cafe: Cafe }) {
  return (
    <Link href={`/cafe/${cafe.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all group h-full flex flex-col">
        <div className="aspect-[4/3] w-full relative overflow-hidden shrink-0">
          <Image
            src={cafe.images[0]}
            alt={cafe.name}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-[#065f46] shadow-sm flex items-center gap-1 z-10">
            <span className="text-sm">{cafe.workScore.toFixed(1)}</span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">Work Score</span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-[#1f2937] leading-tight mb-1 line-clamp-1">{cafe.name}</h3>
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <p className="text-xs truncate">{cafe.address}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-[#1f2937]">{cafe.rating}</span>
              <span className="text-xs text-gray-400">({cafe.reviewsCount})</span>
            </div>
            <div className="flex gap-1">
               {cafe.amenities.slice(0, 2).map((amenity) => (
                 <span key={amenity.id} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                   {amenity.name}
                 </span>
               ))}
               {cafe.amenities.length > 2 && (
                 <span className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded-full whitespace-nowrap">
                   +{cafe.amenities.length - 2}
                 </span>
               )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
