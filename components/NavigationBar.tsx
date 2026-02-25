import { Coffee } from 'lucide-react';

export default function NavigationBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-[#065f46] p-1.5 rounded-lg">
          <Coffee className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg text-[#065f46] tracking-tight">WorkĐi</span>
      </div>
      <button className="px-4 py-1.5 bg-[#065f46] text-white text-sm font-medium rounded-full shadow-md hover:bg-[#044e3a] transition-colors">
        Đăng quán
      </button>
    </nav>
  );
}
