import CafeCard, { Cafe } from './CafeCard';

const MOCK_CAFES: Cafe[] = [
  {
    id: 1,
    name: 'The Workshop Coffee',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    workScore: 4.8,
    address: '27 Ngô Đức Kế, Quận 1, TP.HCM',
    reviews: 342,
    amenities: ['Wi-Fi 100Mbps', 'Quiet', 'AC']
  },
  {
    id: 2,
    name: 'Thinker & Dreamer',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    rating: 4.2,
    workScore: 4.0,
    address: '42 Nguyễn Huệ, Quận 1, TP.HCM',
    reviews: 156,
    amenities: ['Cozy', 'Power Plugs']
  },
  {
    id: 3,
    name: 'Okkio Caffe',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    workScore: 4.5,
    address: '110 Xuân Thủy, Thảo Điền, TP.HCM',
    reviews: 89,
    amenities: ['Garden', 'Spacious']
  },
  {
    id: 4,
    name: 'Barista Collective',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    workScore: 4.7,
    address: '41 Hồ Xuân Hương, Quận 3, TP.HCM',
    reviews: 210,
    amenities: ['Quiet', 'Pro Coffee']
  },
  {
    id: 5,
    name: 'Rang Rang Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    rating: 4.3,
    workScore: 3.8,
    address: '148 Hai Bà Trưng, Quận 1, TP.HCM',
    reviews: 112,
    amenities: ['Modern', 'AC']
  },
  {
    id: 6,
    name: 'Every Half Coffee Roasters',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    workScore: 4.9,
    address: '6E Tú Xương, Quận 3, TP.HCM',
    reviews: 530,
    amenities: ['Roastery', 'Outdoor']
  }
];

export default function CafeList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-24">
      {MOCK_CAFES.map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
}
