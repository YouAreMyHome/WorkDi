import CafeCard from './CafeCard';
import { MOCK_CAFES } from '@/lib/data';

export default function CafeList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-24">
      {MOCK_CAFES.map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
}
