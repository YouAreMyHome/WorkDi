'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { Cafe } from '@/types/schema';
import Link from 'next/link';

// Fix for default marker icon not showing in production build
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: Cafe[];
  interactive?: boolean;
}

const MapClient = ({ center, zoom = 13, markers = [], interactive = true }: MapProps) => {
  useEffect(() => {
    // This effect runs only on client side to ensure Leaflet is loaded
    // We already imported CSS in globals.css, but just in case
    import('leaflet/dist/leaflet.css');
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={interactive}
      className="w-full h-full rounded-lg z-0"
      dragging={interactive}
      doubleClickZoom={interactive}
      zoomControl={interactive}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* If markers are provided, render them */}
      {markers.map((cafe) => (
        cafe.coordinates && (
          <Marker
            key={cafe.id}
            position={[cafe.coordinates.lat, cafe.coordinates.lng]}
          >
            <Popup>
              <div className="min-w-[150px]">
                <div className="text-sm font-bold mb-1">
                  {cafe.name}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {cafe.address}
                </div>
                <Link
                  href={`/cafe/${cafe.id}`}
                  className="block w-full text-center bg-emerald-600 text-white text-xs py-1.5 px-3 rounded hover:bg-emerald-700 transition-colors"
                >
                  Xem chi tiết
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      ))}

      {/* If no markers provided but center is a specific point, add a marker there */}
      {markers.length === 0 && (
        <Marker position={center}>
          <Popup>Current Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapClient;
