# Feature: Advanced Filters

## Overview
This feature allows users to filter cafes based on specific criteria such as amenities (Wifi, AC), price range, and open status.

## Technical Implementation

### Frontend
- **Components:** `components/FilterModal.tsx`.
- **State Management:** `activeFilters` state in `app/page.tsx`.
- **UI:** A modal/slide-over containing:
  - Checkboxes for "Open Now".
  - Min/Max input fields for Price Range.
  - Toggle buttons for Amenities.

### Backend (Supabase)
- **RPC Function:** `search_cafes`
  - **Inputs:** `lat`, `long`, `radius_km`, `amenity_ids`, `min_price`, `max_price`, `is_open`.
  - **Logic:**
    - Filters by distance (PostGIS `ST_DWithin`).
    - Filters by amenities (using `EXISTS` on `cafe_amenities` join).
    - Filters by price range (JSONB `price_range` field).
    - Filters by open status (comparing current server time against JSONB `operating_hours`).

## API Reference

### `searchCafes`
Fetches cafes matching the provided filter criteria.

```typescript
interface SearchFilters {
  lat: number;
  lng: number;
  radiusKm?: number;
  amenityIds?: number[];
  minPrice?: number | null;
  maxPrice?: number | null;
  isOpen?: boolean;
}
```

## Usage
- Click the filter icon on the Home page header.
- Select desired filters and click "Apply".
- The cafe list updates to show only matching results.
