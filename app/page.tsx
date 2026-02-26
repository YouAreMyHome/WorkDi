"use client";

import { useState, useEffect } from "react";
import CafeList from "@/components/CafeList";
import { getNearbyCafes, NearbyCafe } from "@/lib/api/cafes";
import { searchCafes } from "@/lib/api/search";
import dynamic from "next/dynamic";
import { MapPin, List, Filter } from "lucide-react";
import FilterModal from "@/components/FilterModal";

// Dynamic Map Import
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse rounded-xl" />
});

// Define interface for ActiveFilters to ensure type safety with FilterModal
interface ActiveFilters {
  amenities: number[];
  priceRange: { min: number | null; max: number | null };
  isOpen: boolean;
}

export default function Home() {
  const [cafes, setCafes] = useState<NearbyCafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    amenities: [],
    priceRange: { min: null, max: null },
    isOpen: false
  });

  // Mock amenities for now, or fetch from API
  // In a real app, we would fetch this using getAmenities()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [amenitiesList, setAmenitiesList] = useState<{id: number, name: string}[]>([
    { id: 1, name: "Wifi" },
    { id: 2, name: "Ổ cắm" },
    { id: 3, name: "Máy lạnh" },
    { id: 4, name: "Yên tĩnh" }
  ]);

  // Default to Ho Chi Minh City Center
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 10.7769,
    lng: 106.7009,
  });

  useEffect(() => {
    // 1. Try to get real user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.warn("Geolocation access denied or error, using default HCMC.");
        }
      );
    }

    // Fetch amenities if needed
    // const loadAmenities = async () => { ... }
  }, []);

  useEffect(() => {
    // 2. Fetch data from Supabase via our API wrapper
    async function fetchData() {
      try {
        setLoading(true);
        // Use searchCafes if filters are active, otherwise getNearbyCafes (or searchCafes with defaults)
        const hasFilters = activeFilters.amenities.length > 0 || activeFilters.priceRange.min || activeFilters.priceRange.max || activeFilters.isOpen;

        if (hasFilters) {
             const data = await searchCafes({
                 lat: coords.lat,
                 lng: coords.lng,
                 radiusKm: 10,
                 amenityIds: activeFilters.amenities,
                 minPrice: activeFilters.priceRange.min,
                 maxPrice: activeFilters.priceRange.max,
                 isOpen: activeFilters.isOpen
             });
             setCafes(data);
        } else {
             const data = await getNearbyCafes(coords.lat, coords.lng, 10); // 10km radius
             setCafes(data);
        }
      } catch (error) {
        console.error("Failed to fetch cafes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [coords, activeFilters]);

  return (
    <main className="min-h-screen pb-20 bg-gray-50 relative">
      {/* Header / Hero */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khám Phá</h1>
          <p className="text-sm text-gray-500">Tìm không gian làm việc lý tưởng gần bạn</p>
        </div>
        <button
            onClick={() => setIsFilterOpen(true)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
        >
            <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={(filters) => {
                setActiveFilters(filters);
                setIsFilterOpen(false);
            }}
            currentFilters={activeFilters}
            amenitiesList={amenitiesList}
        />
      )}

      {/* Content */}
      <div className="container mx-auto max-w-5xl">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <CafeList cafes={cafes} />
            ) : (
              <div className="h-[calc(100vh-180px)] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm mx-4 md:mx-0">
                 <Map
                    center={[coords.lat, coords.lng]}
                    zoom={13}
                    markers={cafes.map(c => ({
                      id: c.id,
                      name: c.name,
                      latitude: c.latitude,
                      longitude: c.longitude,
                      address: c.address,
                      slug: c.slug
                    }))}
                 />
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Action Button for Map View Toggle */}
      <div className="fixed bottom-24 right-6 z-20">
        <button
          onClick={() => setViewMode(prev => prev === 'list' ? 'map' : 'list')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
        >
          {viewMode === 'list' ? (
            <>
              <MapPin className="w-6 h-6" />
              <span className="font-medium pr-1">Bản đồ</span>
            </>
          ) : (
            <>
              <List className="w-6 h-6" />
              <span className="font-medium pr-1">Danh sách</span>
            </>
          )}
        </button>
      </div>
    </main>
  );
}
