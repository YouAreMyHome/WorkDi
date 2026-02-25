import Map from '@/components/Map';
import { MOCK_CAFES } from '@/lib/data';
import NavigationBar from '@/components/NavigationBar';
import Link from 'next/link';
import { List } from 'lucide-react';

export default function MapPage() {
  const HCMC_CENTER: [number, number] = [10.7769, 106.7009];

  return (
    <div className="h-screen flex flex-col relative bg-[#f5f5f7]">
      <NavigationBar />

      {/* Map Container */}
      <div className="flex-1 w-full relative z-0 mt-14">
        <Map
          center={HCMC_CENTER}
          zoom={13}
          markers={MOCK_CAFES}
          interactive={true}
        />
      </div>

      {/* Floating Action Button - Switch to List */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-40 bg-white text-[#065f46] p-4 rounded-full shadow-xl hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center border border-gray-200"
        aria-label="Xem danh sách"
      >
        <List className="w-6 h-6" />
        <span className="sr-only">Xem danh sách</span>
      </Link>
    </div>
  );
}
