# Development Roadmap

This document outlines the plan for continued development of the WorkĐi platform, categorized by priority as requested.

## 1. Priority Features (Ưu tiên)

These features are critical for the MVP (Minimum Viable Product) and user engagement.

### 1.1 Interactive Map (Bản đồ tương tác)
- **Goal:** Enable users to visualize cafe locations on a map, both on the listing page (Home) and detail page.
- **Tasks:**
  - Update API to return latitude/longitude from PostGIS `location` column.
  - Implement Map view toggle on Home Page.
  - Re-enable and fix Map component on Detail Page.
- **API Requirements:**
  - `get_nearby_cafes`: Return `lat`, `lng` explicitly.
  - `get_cafe_by_slug`: Return `lat`, `lng` explicitly.

### 1.2 Advanced Search & Filters (Tìm kiếm & Bộ lọc)
- **Goal:** Allow users to find cafes based on specific needs (Wifi, AC, Price, Open Status).
- **Tasks:**
  - Create Filter UI (Modal/Slide-over).
  - Update API to support filtering by:
    - Amenities (e.g., Wifi, AC)
    - Price Range
    - Open Now status
- **API Requirements:**
  - `search_cafes` (RPC) or modified `get_nearby_cafes`: Accept `amenity_ids[]`, `min_price`, `max_price`, `is_open`.

### 1.3 User Authentication (Xác thực người dùng)
- **Goal:** Allow users to sign up/login to access personalized features (Reviews, Bookmarks).
- **Tasks:**
  - Implement Login/Register pages or Modal using Supabase Auth.
  - Create `AuthProvider` for global session management.
  - Add User Menu in Header.
- **API Requirements:**
  - Use Supabase Auth Client.
  - Ensure `profiles` table syncs correctly on signup (Trigger already exists or needs check).

---

## 2. Normal Features (Bình thường)

These features enhance the user experience and encourage content creation.

### 2.1 Write Reviews (Viết đánh giá)
- **Goal:** Enable community-driven content.
- **Tasks:**
  - Review Form with Star Ratings (Overall, Wifi, Noise, etc.).
  - Photo Upload (Supabase Storage).
  - Submit API integration.

### 2.2 Bookmarks (Lưu địa điểm)
- **Goal:** Allow users to save favorite places.
- **Tasks:**
  - "Save" button on Cafe Card/Detail.
  - "Saved Places" list in User Profile.
  - API: `bookmarks` table (create if not exists), insert/delete logic.

### 2.3 User Profile (Hồ sơ cá nhân)
- **Goal:** User dashboard.
- **Tasks:**
  - View/Edit Profile (Name, Avatar, Bio).
  - View My Reviews.
  - View Saved Places.

---

## 3. Later Features (Có thể phát triển sau)

Features for growth, community building, and monetization.

### 3.1 Suggest New Cafe (Đề xuất quán mới)
- **Goal:** Crowdsource database expansion.
- **Tasks:**
  - Submission form with basic details.
  - Admin approval workflow.

### 3.2 Community & Gamification
- **Goal:** Increase engagement.
- **Tasks:**
  - Badges for top reviewers.
  - Leaderboards.
  - Reputation scores.

### 3.3 Owner Claims
- **Goal:** Business verification.
- **Tasks:**
  - Flow for cafe owners to claim and manage their listing.
