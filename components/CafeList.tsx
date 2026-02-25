import CafeCard from './CafeCard';
import { NearbyCafe } from '@/lib/api/cafes';

interface CafeListProps {
  cafes: NearbyCafe[];
}

export default function CafeList({ cafes }: CafeListProps) {
  if (!cafes || cafes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <p className="text-gray-500 mb-2">Chưa tìm thấy quán nào gần bạn.</p>
        <p className="text-sm text-gray-400">Hãy thử thay đổi vị trí hoặc bán kính tìm kiếm.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-24">
      {cafes.map((cafe) => (
        <CafeCard
          key={cafe.id}
          cafe={cafe}
        />
      ))}
    </div>
  );
}
