# Tổng Quan Kỹ Thuật (Technical Summary) - Dự Án WorkĐi

Tài liệu này tóm tắt các công nghệ, kỹ thuật và mô hình kiến trúc đã được triển khai trong dự án WorkĐi.

## 1. Tech Stack (Công Nghệ Cốt Lõi)

*   **Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router)
    *   Sử dụng kiến trúc Server Components (RSC) mặc định để tối ưu hiệu suất.
    *   Client Components chỉ được sử dụng khi cần tương tác (ví dụ: Map, Hooks).
*   **Language:** [TypeScript 5](https://www.typescriptlang.org/)
    *   Strict mode được bật để đảm bảo an toàn kiểu dữ liệu.
    *   Định nghĩa Interface rõ ràng cho các thực thể (Entity) trong `types/schema.ts`.
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
    *   Sử dụng `@theme` và CSS variables cho design system (màu sắc, font).
    *   Custom Utility: `scrollbar-hide` để ẩn thanh cuộn nhưng vẫn giữ chức năng cuộn.
*   **Icons:** [Lucide React](https://lucide.dev/)
    *   Bộ icon nhẹ, đồng bộ và dễ tùy biến.

## 2. Kỹ Thuật & Mô Hình Triển Khai (Key Techniques)

### 2.1. Bản Đồ Tương Tác (Interactive Maps)
Tích hợp bản đồ OpenStreetMap vào Next.js đòi hỏi xử lý đặc biệt do thư viện `leaflet` phụ thuộc vào `window` (chỉ có ở client-side).

*   **Thư viện:** `leaflet`, `react-leaflet`.
*   **Kỹ thuật Dynamic Import:** Sử dụng `next/dynamic` với `ssr: false` để disable Server-Side Rendering cho component bản đồ.
    ```tsx
    // components/Map.tsx
    const MapClient = dynamic(() => import('./Map/MapClient'), {
      ssr: false, // Quan trọng: Ngăn Next.js render trên server
      loading: () => <LoadingSkeleton />,
    });
    ```
*   **Client Component:** File `MapClient.tsx` được đánh dấu `'use client'` để sử dụng các hooks của React và Leaflet.
*   **Fix CSS:** Import CSS của Leaflet trong `app/globals.css` và thêm `types/css.d.ts` để TypeScript hiểu file `.css`.

### 2.2. Dữ Liệu Giả Lập & Schema (Mock Data Architecture)
Thay vì hardcode dữ liệu vào UI, dự án sử dụng mô hình "Service" giả lập để dễ dàng chuyển đổi sang Database thật sau này.

*   **Schema First:** Định nghĩa `types/schema.ts` trước khi code.
    *   Các Interface: `Cafe`, `User`, `Review`, `Amenity`.
*   **Mock Data Service:** `lib/data.ts` đóng vai trò như một "Database" in-memory.
    *   Chứa dữ liệu mẫu (MOCK_CAFES, MOCK_USERS).
    *   Export các hàm helper giống ORM: `getCafeById(id)`, `getReviewsByCafeId(id)`.
    *   **Lợi ích:** Frontend Component gọi hàm `getCafeById` giống như gọi API, tách biệt logic view và logic data.

### 2.3. Dynamic Routing (Định Tuyến Động)
Sử dụng tính năng Dynamic Segments của Next.js App Router để tạo trang chi tiết cho hàng nghìn quán cafe chỉ với 1 file code.

*   **File Path:** `app/cafe/[id]/page.tsx`.
*   **Cơ chế:**
    *   Nhận `params.id` từ URL.
    *   Dùng `params.id` để query dữ liệu từ `lib/data.ts`.
    *   Hiển thị trang 404 (dùng `notFound()`) nếu không tìm thấy dữ liệu.

### 2.4. Xử Lý Hình Ảnh (Image Optimization)
Sử dụng `next/image` để tối ưu hóa hiệu suất load ảnh và ngăn Layout Shift.

*   **Remote Patterns:** Cấu hình `next.config.ts` để cho phép load ảnh từ các nguồn bên ngoài (`images.unsplash.com`, `api.dicebear.com`).
*   **SVG Support:** Cấu hình `dangerouslyAllowSVG: true` để hỗ trợ avatar dạng SVG từ Dicebear API.

## 3. Cấu Trúc Dự Án (Project Structure)

```
/
├── app/
│   ├── cafe/[id]/      # Trang chi tiết quán (Dynamic Route)
│   ├── map/            # Trang bản đồ toàn màn hình
│   ├── globals.css     # Global styles & Tailwind config
│   └── layout.tsx      # Root Layout (Navbar, Fonts)
├── components/         # Các UI components tái sử dụng
│   ├── Map/            # Các component liên quan đến bản đồ
│   └── ...
├── lib/                # Business logic & Data access layer
│   └── data.ts         # Mock data & Helper functions
├── types/              # TypeScript definitions
│   ├── schema.ts       # Data models
│   └── ...
└── public/             # Static assets
```
