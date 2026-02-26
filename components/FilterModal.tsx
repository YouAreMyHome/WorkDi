"use client";

import { useState } from "react";
import { Filter, X, Check } from "lucide-react";

interface FilterState {
  amenities: number[];
  priceRange: { min: number | null; max: number | null };
  isOpen: boolean;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
  amenitiesList: { id: number; name: string }[];
}

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  currentFilters,
  amenitiesList,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  if (!isOpen) return null;

  const toggleAmenity = (id: number) => {
    setFilters((prev) => {
      if (prev.amenities.includes(id)) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== id) };
      } else {
        return { ...prev, amenities: [...prev.amenities, id] };
      }
    });
  };

  const setPrice = (type: 'min' | 'max', value: string) => {
    const num = value ? parseInt(value) : null;
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: num },
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-600" />
            Bộ lọc tìm kiếm
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Trạng thái</h3>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.isOpen ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300 bg-white'}`}>
                {filters.isOpen && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.isOpen}
                onChange={(e) => setFilters(prev => ({ ...prev, isOpen: e.target.checked }))}
              />
              <span className="text-sm font-medium text-gray-700">Đang mở cửa</span>
            </label>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Mức giá (VND)</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Thấp nhất"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                value={filters.priceRange.min || ''}
                onChange={(e) => setPrice('min', e.target.value)}
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Cao nhất"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                value={filters.priceRange.max || ''}
                onChange={(e) => setPrice('max', e.target.value)}
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tiện ích</h3>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border text-left transition-all ${
                    filters.amenities.includes(amenity.id)
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {amenity.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button
            onClick={() => setFilters({ amenities: [], priceRange: { min: null, max: null }, isOpen: false })}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            Đặt lại
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-md transition-transform active:scale-[0.98]"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
