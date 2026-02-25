import { Search } from 'lucide-react';

const filters = [
  'Wi-Fi > 50Mbps',
  'Nhiều ổ cắm',
  'Ghế đệm',
  'Yên tĩnh',
  'Mở 24/7',
  'Điều hòa mát',
  'Bàn rộng'
];

export default function SearchFilterHero() {
  return (
    <div className="pt-24 pb-6 px-4 bg-gradient-to-b from-[#e6f4f1] to-transparent">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Tìm quán cafe gần bạn..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-white text-[#1f2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#065f46] focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="flex-shrink-0 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-[#1f2937] hover:bg-[#065f46] hover:text-white hover:border-[#065f46] transition-all whitespace-nowrap shadow-sm"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
