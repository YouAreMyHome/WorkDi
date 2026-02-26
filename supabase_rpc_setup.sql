CREATE OR REPLACE FUNCTION search_cafes(
  lat DOUBLE PRECISION,
  long DOUBLE PRECISION,
  radius_km DOUBLE PRECISION,
  amenity_ids INTEGER[] DEFAULT NULL,
  min_price INTEGER DEFAULT NULL,
  max_price INTEGER DEFAULT NULL,
  is_open BOOLEAN DEFAULT NULL
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
  dist_meters DOUBLE PRECISION,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
DECLARE
  current_dow TEXT;
  current_time TEXT;
BEGIN
  -- Get current day of week (e.g., 'monday') and time (e.g., '14:30')
  -- Note: Timezone handling might be needed depending on server config, assuming server is UTC or configured correctly.
  -- Ideally, we pass the client's local time or day, but for now we use server time or assume VN time (UTC+7).
  SELECT lower(trim(to_char(now() AT TIME ZONE 'Asia/Ho_Chi_Minh', 'Day'))) INTO current_dow;
  SELECT to_char(now() AT TIME ZONE 'Asia/Ho_Chi_Minh', 'HH24:MI') INTO current_time;

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
    ) AS dist_meters,
    ST_Y(c.location::geometry) AS latitude,
    ST_X(c.location::geometry) AS longitude
  FROM
    cafes c
  WHERE
    ST_DWithin(
      c.location,
      ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography,
      radius_km * 1000
    )
    AND c.status = 'active'
    -- Filter by Amenities
    AND (
      amenity_ids IS NULL
      OR EXISTS (
        SELECT 1 FROM cafe_amenities ca
        WHERE ca.cafe_id = c.id
        AND ca.amenity_id = ANY(amenity_ids)
        GROUP BY ca.cafe_id
        HAVING COUNT(DISTINCT ca.amenity_id) = array_length(amenity_ids, 1) -- Must have ALL selected amenities
      )
    )
    -- Filter by Price
    AND (
      (min_price IS NULL OR (c.price_range->>'min')::int >= min_price)
      AND
      (max_price IS NULL OR (c.price_range->>'max')::int <= max_price)
    )
    -- Filter by Open Status
    AND (
      is_open IS NULL
      OR is_open = FALSE
      OR (
        c.operating_hours->current_dow->>'open' <= current_time
        AND
        c.operating_hours->current_dow->>'close' >= current_time
      )
    )
  ORDER BY
    dist_meters ASC;
END;
$$;
