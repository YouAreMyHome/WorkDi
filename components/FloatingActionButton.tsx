import { Map as MapIcon } from 'lucide-react';
import Link from 'next/link';

export default function FloatingActionButton() {
  return (
    <Link
      href="/map"
      className="fixed bottom-6 right-6 z-40 bg-[#065f46] text-white p-4 rounded-full shadow-xl hover:bg-[#044e3a] transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
      aria-label="Mở bản đồ"
    >
      <MapIcon className="w-6 h-6" />
      <span className="sr-only">Mở bản đồ</span>
    </Link>
  );
}
