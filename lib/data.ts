import { Cafe, Amenity, Review, User } from '../types/schema';

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    role: 'user',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'u2',
    name: 'Trần Thị B',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    role: 'user',
    createdAt: '2023-02-15T00:00:00Z',
  },
  {
    id: 'u3',
    name: 'Lê Văn C',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    role: 'admin',
    createdAt: '2023-03-20T00:00:00Z',
  },
];

// Mock Amenities
export const MOCK_AMENITIES: Amenity[] = [
  { id: 'wifi', name: 'Wifi Mạnh', icon: 'Wifi', categoryId: 'work' },
  { id: 'ac', name: 'Máy Lạnh', icon: 'ThermometerSnowflake', categoryId: 'comfort' },
  { id: 'power', name: 'Ổ Cắm Điện', icon: 'Plug', categoryId: 'work' },
  { id: 'quiet', name: 'Yên Tĩnh', icon: 'VolumeX', categoryId: 'environment' },
  { id: 'spacious', name: 'Rộng Rãi', icon: 'Maximize', categoryId: 'environment' },
  { id: 'garden', name: 'Sân Vườn', icon: 'Flower2', categoryId: 'environment' },
  { id: 'food', name: 'Đồ Ăn Nhẹ', icon: 'Utensils', categoryId: 'food' },
  { id: 'parking', name: 'Giữ Xe Miễn Phí', icon: 'Bike', categoryId: 'convenience' },
];

// Mock Reviews
const generateReviews = (cafeId: string): Review[] => [
  {
    id: `r-${cafeId}-1`,
    userId: 'u1',
    cafeId: cafeId,
    user: MOCK_USERS[0],
    rating: 5,
    content: 'Quán rất đẹp, wifi cực mạnh, thích hợp để làm việc cả ngày.',
    createdAt: '2023-10-15T09:30:00Z',
    likes: 12,
  },
  {
    id: `r-${cafeId}-2`,
    userId: 'u2',
    cafeId: cafeId,
    user: MOCK_USERS[1],
    rating: 4,
    content: 'Không gian hơi ồn vào buổi trưa nhưng cà phê ngon.',
    createdAt: '2023-10-16T14:15:00Z',
    likes: 5,
  },
];

// Mock Cafes
export const MOCK_CAFES: Cafe[] = [
  {
    id: '1',
    name: 'The Workshop Coffee',
    slug: 'the-workshop-coffee',
    description: 'Một không gian làm việc chuyên nghiệp ngay trung tâm Quận 1. Nổi tiếng với cà phê specialty và không gian yên tĩnh, rộng rãi.',
    address: '27 Ngô Đức Kế, Bến Nghé, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'TP.HCM',
    coordinates: { lat: 10.7763, lng: 106.7048 }, // Near Bitexco
    images: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop', // Extra image
    ],
    rating: 4.5,
    reviewsCount: 342,
    workScore: 4.8,
    amenities: [
      MOCK_AMENITIES.find(a => a.id === 'wifi')!,
      MOCK_AMENITIES.find(a => a.id === 'quiet')!,
      MOCK_AMENITIES.find(a => a.id === 'ac')!,
      MOCK_AMENITIES.find(a => a.id === 'power')!,
    ],
    priceRange: 'high',
    openingHours: '08:00 - 21:00',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Thinker & Dreamer',
    slug: 'thinker-and-dreamer',
    description: 'Quán nhỏ xinh nằm trong chung cư 42 Nguyễn Huệ. View đẹp, không gian ấm cúng, phù hợp làm việc nhẹ nhàng hoặc đọc sách.',
    address: '42 Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'TP.HCM',
    coordinates: { lat: 10.7744, lng: 106.7032 }, // Nguyen Hue Walking Street
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop',
    ],
    rating: 4.2,
    reviewsCount: 156,
    workScore: 4.0,
    amenities: [
      MOCK_AMENITIES.find(a => a.id === 'wifi')!,
      MOCK_AMENITIES.find(a => a.id === 'ac')!,
      MOCK_AMENITIES.find(a => a.id === 'power')!,
    ],
    priceRange: 'medium',
    openingHours: '09:00 - 22:00',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Okkio Caffe',
    slug: 'okkio-caffe-thao-dien',
    description: 'Thiết kế hiện đại, nhiều ánh sáng tự nhiên. Nằm ở khu Thảo Điền yên bình, rất thích hợp cho digital nomads.',
    address: '110 Xuân Thủy, Thảo Điền, Quận 2, TP.HCM',
    district: 'Quận 2',
    city: 'TP.HCM',
    coordinates: { lat: 10.8045, lng: 106.7451 }, // Thao Dien
    images: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop',
    ],
    rating: 4.7,
    reviewsCount: 89,
    workScore: 4.5,
    amenities: [
      MOCK_AMENITIES.find(a => a.id === 'garden')!,
      MOCK_AMENITIES.find(a => a.id === 'spacious')!,
      MOCK_AMENITIES.find(a => a.id === 'wifi')!,
      MOCK_AMENITIES.find(a => a.id === 'parking')!,
    ],
    priceRange: 'medium',
    openingHours: '07:30 - 22:30',
    isVerified: false,
  },
  {
    id: '4',
    name: 'Every Half Coffee Roasters',
    slug: 'every-half-coffee-roasters',
    description: 'Dành cho tín đồ yêu cà phê rang xay. Không gian mở, thoáng mát, nhiều cây xanh.',
    address: '6E Tú Xương, Võ Thị Sáu, Quận 3, TP.HCM',
    district: 'Quận 3',
    city: 'TP.HCM',
    coordinates: { lat: 10.7865, lng: 106.6872 }, // District 3
    images: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop',
    ],
    rating: 4.8,
    reviewsCount: 530,
    workScore: 4.9,
    amenities: [
      MOCK_AMENITIES.find(a => a.id === 'garden')!,
      MOCK_AMENITIES.find(a => a.id === 'spacious')!,
      MOCK_AMENITIES.find(a => a.id === 'wifi')!,
    ],
    priceRange: 'medium',
    openingHours: '07:00 - 21:00',
    isVerified: true,
  },
];

// Helper to get reviews
export const getReviewsByCafeId = (cafeId: string): Review[] => generateReviews(cafeId);

// Helper to get cafe by ID
export const getCafeById = (id: string): Cafe | undefined => MOCK_CAFES.find(c => c.id === id);

// Helper to get cafe by Slug (for SEO friendly URLs later if needed)
export const getCafeBySlug = (slug: string): Cafe | undefined => MOCK_CAFES.find(c => c.slug === slug);
