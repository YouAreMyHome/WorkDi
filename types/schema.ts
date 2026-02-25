// User
export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  role?: 'user' | 'admin';
  createdAt?: string;
}

// Amenity Category (e.g., 'Work', 'Comfort', 'Food & Drink')
export interface AmenityCategory {
  id: string;
  name: string;
}

// Amenity (e.g., 'Wifi 100Mbps', 'Quiet', 'AC')
export interface Amenity {
  id: string;
  name: string;
  icon?: string; // Lucide icon name or image URL
  categoryId?: string;
}

// Review
export interface Review {
  id: string;
  userId: string;
  cafeId: string;
  user: User; // Include user details for display
  rating: number; // 1-5
  content: string;
  createdAt: string;
  images?: string[];
  likes?: number;
}

// Cafe
export interface Cafe {
  id: string;
  name: string;
  slug: string; // URL-friendly name
  description?: string;
  address: string;
  district?: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: string[];
  rating: number; // Average rating
  reviewsCount: number;
  workScore: number; // Special score for working suitability (1-5)
  amenities: Amenity[];
  priceRange?: 'low' | 'medium' | 'high';
  openingHours?: string; // e.g., '07:00 - 22:00'
  isVerified?: boolean;
}
