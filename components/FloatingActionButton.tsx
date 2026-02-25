import { Map } from 'lucide-react';

export default function FloatingActionButton() {
  return (
    <button className="fixed bottom-6 right-6 z-40 bg-[#065f46] text-white p-4 rounded-full shadow-xl hover:bg-[#044e3a] transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
      <Map className="w-6 h-6" />
      <span className="sr-only">Mở bản đồ</span>
    </button>
  );
}
