"use client";

import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

// Fix for default Leaflet marker icons in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to update map center when props change
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

interface MapProps {
  center: [number, number];
  zoom: number;
  interactive?: boolean;
  markers?: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address?: string;
    slug?: string;
  }[];
}

export default function Map({ center, zoom, interactive = true, markers = [] }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={interactive}
      className="h-full w-full z-0"
      dragging={interactive}
    >
      <ChangeView center={center} zoom={zoom} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.latitude, marker.longitude]}
        >
          <Popup>
            <div className="min-w-[150px]">
              <h3 className="font-bold text-gray-900 mb-1">{marker.name}</h3>
              {marker.address && (
                <p className="text-xs text-gray-600 flex items-start gap-1 mb-2">
                  <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                  {marker.address}
                </p>
              )}
              {marker.slug && (
                <Link
                  href={`/cafe/${marker.slug}`}
                  className="block w-full text-center bg-emerald-600 text-white text-xs py-1.5 rounded hover:bg-emerald-700 transition-colors"
                >
                  Xem chi tiết
                </Link>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
