# Kế hoạch Phát triển Dự án WorkĐi

Tài liệu này phác thảo lộ trình phát triển tính năng cho nền tảng WorkĐi, dựa trên yêu cầu ưu tiên của người dùng.

## 1. Ưu tiên Cao (Priority) - Giai đoạn Hiện tại
Các tính năng cốt lõi cần hoàn thiện ngay để đảm bảo trải nghiệm người dùng cơ bản và nền tảng kỹ thuật vững chắc.

### 1.1. Thiết kế Cơ sở Dữ liệu (Database Design)
*   **Mục tiêu:** Xây dựng cấu trúc dữ liệu chuẩn (Schema) để mô phỏng và sau này dễ dàng chuyển đổi sang Database thật (Supabase/PostgreSQL).
*   **Thực hiện:**
    *   Tạo file `types/schema.ts` định nghĩa các interfaces: `User`, `Cafe`, `Review`, `Amenity`, `AmenityCategory`.
    *   Tạo file `lib/data.ts` chứa dữ liệu giả lập (Mock Data) có quan hệ (Relational) để sử dụng ngay cho Frontend.
    *   **Lợi ích:** Giúp Frontend code logic thật thay vì hardcode UI.

### 1.2. Trang Chi tiết Quán (Cafe Detail Page)
*   **Mục tiêu:** Hiển thị đầy đủ thông tin của một quán cafe khi người dùng chọn từ danh sách.
*   **Thực hiện:**
    *   Tạo Dynamic Route: `app/cafe/[id]/page.tsx`.
    *   **UI Components:**
        *   Hero Section: Ảnh bìa lớn, Tên quán, Rating tổng quan.
        *   Info Section: Địa chỉ, Giờ mở cửa, Giá cả.
        *   Amenities Section: Các tiện ích (Wifi, Ổ điện, AC...) với icon trực quan.
        *   Reviews Section: Danh sách đánh giá từ người dùng (Avatar, Tên, Nội dung, Số sao).
        *   Map Section: Bản đồ nhỏ hiển thị vị trí quán.

### 1.3. Tích hợp Bản đồ Tương tác (Interactive Map)
*   **Mục tiêu:** Cho phép người dùng xem vị trí các quán trên bản đồ thực tế.
*   **Công nghệ:** `Leaflet` (OpenStreetMap) kết hợp `react-leaflet`.
*   **Thực hiện:**
    *   Cài đặt thư viện và cấu hình CSS cho Map.
    *   Tạo Component `Map` tái sử dụng (xử lý SSR của Next.js).
    *   **Tính năng:**
        *   Hiển thị Pin (Marker) cho từng quán.
        *   Popup thông tin tóm tắt khi click vào Pin.
        *   Chế độ "Xem Bản đồ" (Full-screen Map View) từ trang chủ.

---

## 2. Bình thường (Normal) - Giai đoạn Tiếp theo
Các tính năng nâng cao trải nghiệm tìm kiếm và đóng góp nội dung.

### 2.1. Tìm kiếm & Bộ lọc Nâng cao (Advanced Search & Filter)
*   **Yêu cầu:** Chỉ thực hiện sau khi có Database/Mock Data chuẩn.
*   **Tính năng:**
    *   Lọc theo Tiện ích (Wifi mạnh, Yên tĩnh, Mở 24h...).
    *   Lọc theo Khu vực (Quận/Huyện).
    *   Sắp xếp theo Đánh giá, Khoảng cách.

### 2.2. Xác thực Người dùng Cơ bản (Basic Auth)
*   **Mục tiêu:** Định danh người dùng để thực hiện các tác vụ cá nhân.
*   **Tính năng:**
    *   Đăng ký / Đăng nhập (UI trước, logic sau).
    *   Lưu quán yêu thích (Wishlist).

### 2.3. Đăng tải Quán (Post a Cafe)
*   **Mục tiêu:** Cho phép cộng đồng đóng góp địa điểm mới.
*   **Tính năng:** Form điền thông tin quán cơ bản + Upload ảnh (Mock).

---

## 3. Có thể phát triển sau (Later) - Giai đoạn Mở rộng
Các tính năng gia tăng sự gắn kết và quản trị.

### 3.1. Tính năng Xã hội (Social Features)
*   **Chi tiết:**
    *   Bình luận & Trả lời bình luận.
    *   Thả tim (Like) review.
    *   Chia sẻ quán lên Mạng xã hội.

### 3.2. Hồ sơ Người dùng Nâng cao (Advanced Profile)
*   **Chi tiết:**
    *   Thống kê số quán đã đến (Check-in).
    *   Cấp bậc thành viên (Gamification).
    *   Chỉnh sửa thông tin cá nhân.

### 3.3. Trang Quản trị (Admin Dashboard)
*   **Chi tiết:** Duyệt quán mới, Quản lý báo cáo vi phạm, Thống kê hệ thống.

---

## Ghi chú Kỹ thuật
*   **Tech Stack:** Next.js 14 (App Router), Tailwind CSS, TypeScript.
*   **Map Provider:** OpenStreetMap (Free, no API key required for basic usage).
*   **Icons:** Lucide React.
*   **Deploy:** Vercel.
