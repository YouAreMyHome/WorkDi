-- SQL for Supabase SQL Editor

-- 1. Enable PostGIS if not already enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Create RPC function for finding nearby cafes
CREATE OR REPLACE FUNCTION get_nearby_cafes(
  lat DOUBLE PRECISION,
  long DOUBLE PRECISION,
  radius_km DOUBLE PRECISION
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  address TEXT,
  district VARCHAR,
  city VARCHAR,
  cover_image TEXT,
  rating NUMERIC,
  reviews_count INTEGER,
  dist_meters DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.name,
    c.slug,
    c.address,
    c.district,
    c.city,
    c.cover_image,
    c.avg_rating,
    c.total_reviews,
    ST_Distance(
      c.location,
      ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography
    ) AS dist_meters
  FROM
    cafes c
  WHERE
    ST_DWithin(
      c.location,
      ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography,
      radius_km * 1000 -- Convert km to meters
    )
    AND c.status = 'active'
  ORDER BY
    dist_meters ASC;
END;
$$;
