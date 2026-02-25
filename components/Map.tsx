'use client';

import dynamic from 'next/dynamic';
import { Cafe } from '@/types/schema';

// Dynamically import the MapClient component with SSR disabled
const MapClient = dynamic(() => import('./Map/MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-gray-400">Loading Map...</span>
    </div>
  ),
});

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: Cafe[];
  interactive?: boolean;
}

export default function Map(props: MapProps) {
  return <MapClient {...props} />;
}
