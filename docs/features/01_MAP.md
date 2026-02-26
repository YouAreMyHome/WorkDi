# Feature: Interactive Map

## Overview
This feature allows users to visualize cafe locations on an interactive map. It is available on both the Home page (Toggle View) and the Cafe Detail page.

## Technical Implementation

### Frontend
- **Components:** `components/Map.tsx` (using `react-leaflet`).
- **Home Page:** Added a toggle button to switch between List and Map view.
- **Detail Page:** Displays a static map with the cafe's location.
- **Library:** `react-leaflet`, `leaflet`.

### Backend (Supabase)
- **Database Schema:** `cafes` table uses PostGIS `geography(Point, 4326)` for the `location` column.
- **RPC Function:** `get_nearby_cafes`
  - **Inputs:** `lat`, `long`, `radius_km`
  - **Outputs:** List of cafes including `latitude` and `longitude` extracted from the PostGIS column using `ST_Y` and `ST_X`.

## API Reference

### `getNearbyCafes`
Fetches cafes within a radius and returns coordinates.

```typescript
interface NearbyCafe {
  id: string;
  name: string;
  slug: string;
  address: string;
  // ...
  latitude: number;
  longitude: number;
}
```

### `getCafeBySlug`
Fetches detailed info for a single cafe, including coordinates parsed from the `location` column.

## Usage
- The map centers on the user's current location (if granted) or defaults to Ho Chi Minh City.
- Markers are clickable and show a popup with the cafe name and a link to details.
