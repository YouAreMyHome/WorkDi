"use client";

import { useState, useEffect } from "react";
import CafeList from "@/components/CafeList";
import { getNearbyCafes, NearbyCafe } from "@/lib/api/cafes";

export default function Home() {
  const [cafes, setCafes] = useState<NearbyCafe[]>([]);
  const [loading, setLoading] = useState(true);

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
        (error) => {
          console.warn("Geolocation access denied or error, using default HCMC.");
        }
      );
    }
  }, []);

  useEffect(() => {
    // 2. Fetch data from Supabase via our API wrapper
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getNearbyCafes(coords.lat, coords.lng, 10); // 10km radius
        setCafes(data);
      } catch (error) {
        console.error("Failed to fetch cafes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [coords]);

  return (
    <main className="min-h-screen pb-20 bg-gray-50">
      {/* Header / Hero */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Khám Phá</h1>
        <p className="text-sm text-gray-500">Tìm không gian làm việc lý tưởng gần bạn</p>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <CafeList cafes={cafes} />
        )}
      </div>

      {/* Floating Action Button for Map View (Optional) */}
      {/* ... (Keep existing FAB logic if needed) ... */}
    </main>
  );
}
