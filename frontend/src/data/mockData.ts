export type Category = 'Food' | 'Cosmetics' | 'Medicine' | 'Beverages' | 'Dairy' | 'Snacks';
export type UrgencyLevel = 'urgent' | 'moderate' | 'safe';

export interface Product {
  _id: string;
  id: string;
  name: string;
  category: Category;
  expiryDate: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  image: string;
  stock: number;
  sellerId: string;
  sellerName: string;
  description: string;
  urgency: UrgencyLevel;
  daysLeft: number;
  rating: number;
  reviews: number;
}

export interface Seller {
  id: string;
  name: string;
  shopName: string;
  email: string;
  status: 'approved' | 'pending' | 'rejected';
  products: number;
  revenue: number;
  joinDate: string;
  avatar: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: { productId: string; name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  date: string;
  deliveryDate: string;
}

// Category icons & colors
export const categoryConfig: Record<Category, { icon: string; color: string; bg: string }> = {
  Food: { icon: '🥗', color: 'text-green-700', bg: 'bg-green-50' },
  Cosmetics: { icon: '💄', color: 'text-pink-700', bg: 'bg-pink-50' },
  Medicine: { icon: '💊', color: 'text-blue-700', bg: 'bg-blue-50' },
  Beverages: { icon: '🧃', color: 'text-orange-700', bg: 'bg-orange-50' },
  Dairy: { icon: '🥛', color: 'text-yellow-700', bg: 'bg-yellow-50' },
  Snacks: { icon: '🍿', color: 'text-red-700', bg: 'bg-red-50' },
};

export const products: Product[] = [
  {
    _id: 'p1',
    id: 'p1',
    name: 'Organic Mixed Berry Yogurt Pack',
    category: 'Dairy',
    expiryDate: '2025-03-05',
    originalPrice: 320,
    discountPrice: 160,
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    stock: 24,
    sellerId: 's1',
    sellerName: 'FreshMart',
    description: 'Premium organic mixed berry yogurt, rich in probiotics. Perfect for a healthy breakfast.',
    urgency: 'urgent',
    daysLeft: 6,
    rating: 4.5,
    reviews: 128,
  },
  {
    _id: 'p2',
    id: 'p2',
    name: 'Vitamin C Serum 30ml',
    category: 'Cosmetics',
    expiryDate: '2025-04-10',
    originalPrice: 899,
    discountPrice: 539,
    discountPercent: 40,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
    stock: 15,
    sellerId: 's2',
    sellerName: 'GlowBeauty',
    description: 'High-potency Vitamin C serum for brightening and anti-aging. Dermatologist tested.',
    urgency: 'moderate',
    daysLeft: 42,
    rating: 4.8,
    reviews: 256,
  },
  {
    _id: 'p3',
    id: 'p3',
    name: 'Multivitamin Tablets (90 Count)',
    category: 'Medicine',
    expiryDate: '2025-05-15',
    originalPrice: 650,
    discountPrice: 455,
    discountPercent: 30,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    stock: 50,
    sellerId: 's3',
    sellerName: 'HealthHub',
    description: 'Complete daily multivitamin with essential minerals. Supports immune health and energy.',
    urgency: 'safe',
    daysLeft: 77,
    rating: 4.3,
    reviews: 89,
  },
  {
    _id: 'p4',
    id: 'p4',
    name: 'Mango Juice 1L Pack (6pcs)',
    category: 'Beverages',
    expiryDate: '2025-03-08',
    originalPrice: 480,
    discountPrice: 192,
    discountPercent: 60,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    stock: 30,
    sellerId: 's1',
    sellerName: 'FreshMart',
    description: 'Freshly pressed mango juice with no added preservatives. 100% natural ingredients.',
    urgency: 'urgent',
    daysLeft: 9,
    rating: 4.6,
    reviews: 342,
  },
  {
    _id: 'p5',
    id: 'p5',
    name: 'Almond Butter 400g',
    category: 'Food',
    expiryDate: '2025-04-20',
    originalPrice: 560,
    discountPrice: 392,
    discountPercent: 30,
    image: 'https://images.unsplash.com/photo-1559181567-c3190100191e?w=400',
    stock: 20,
    sellerId: 's4',
    sellerName: 'NutriStore',
    description: 'Creamy natural almond butter, packed with protein and healthy fats. No added sugar.',
    urgency: 'moderate',
    daysLeft: 52,
    rating: 4.7,
    reviews: 175,
  },
  {
    _id: 'p6',
    id: 'p6',
    name: 'Cheese Puffs Variety Pack',
    category: 'Snacks',
    expiryDate: '2025-03-12',
    originalPrice: 240,
    discountPrice: 108,
    discountPercent: 55,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
    stock: 45,
    sellerId: 's1',
    sellerName: 'FreshMart',
    description: 'Assorted cheese puffs variety pack. 6 different flavors for the whole family.',
    urgency: 'urgent',
    daysLeft: 13,
    rating: 4.1,
    reviews: 67,
  },
  {
    _id: 'p7',
    id: 'p7',
    name: 'Moisturizing Face Cream SPF 50',
    category: 'Cosmetics',
    expiryDate: '2025-06-30',
    originalPrice: 750,
    discountPrice: 562,
    discountPercent: 25,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    stock: 12,
    sellerId: 's2',
    sellerName: 'GlowBeauty',
    description: 'Lightweight moisturizer with SPF 50 protection. Hydrates and shields from UV damage.',
    urgency: 'safe',
    daysLeft: 123,
    rating: 4.9,
    reviews: 411,
  },
  {
    _id: 'p8',
    id: 'p8',
    name: 'Paracetamol 500mg (Strip of 10)',
    category: 'Medicine',
    expiryDate: '2025-04-01',
    originalPrice: 30,
    discountPrice: 21,
    discountPercent: 30,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400',
    stock: 100,
    sellerId: 's3',
    sellerName: 'HealthHub',
    description: 'Fast-acting pain relief tablet. Effective for headache, fever, and body pain.',
    urgency: 'moderate',
    daysLeft: 33,
    rating: 4.4,
    reviews: 520,
  },
];

export const sellers: Seller[] = [
  { id: 's1', name: 'Rajesh Kumar', shopName: 'FreshMart', email: 'rajesh@freshmart.com', status: 'approved', products: 45, revenue: 128500, joinDate: '2024-06-15', avatar: 'RK' },
  { id: 's2', name: 'Priya Sharma', shopName: 'GlowBeauty', email: 'priya@glowbeauty.com', status: 'approved', products: 28, revenue: 87200, joinDate: '2024-08-20', avatar: 'PS' },
  { id: 's3', name: 'Dr. Amit Patel', shopName: 'HealthHub', email: 'amit@healthhub.com', status: 'approved', products: 63, revenue: 215000, joinDate: '2024-05-10', avatar: 'AP' },
  { id: 's4', name: 'Sunita Verma', shopName: 'NutriStore', email: 'sunita@nutristore.com', status: 'pending', products: 0, revenue: 0, joinDate: '2025-02-20', avatar: 'SV' },
  { id: 's5', name: 'Vivek Joshi', shopName: 'QuickBazaar', email: 'vivek@quickbazaar.com', status: 'pending', products: 0, revenue: 0, joinDate: '2025-02-25', avatar: 'VJ' },
];

export const orders: Order[] = [
  {
    id: 'ord-001',
    customerId: 'c1',
    customerName: 'Ananya Singh',
    products: [
      { productId: 'p1', name: 'Organic Mixed Berry Yogurt Pack', qty: 2, price: 160 },
      { productId: 'p4', name: 'Mango Juice 1L Pack', qty: 1, price: 192 },
    ],
    total: 512,
    status: 'delivered',
    paymentStatus: 'paid',
    date: '2025-02-20',
    deliveryDate: '2025-02-23',
  },
  {
    id: 'ord-002',
    customerId: 'c2',
    customerName: 'Rohan Mehta',
    products: [{ productId: 'p2', name: 'Vitamin C Serum 30ml', qty: 1, price: 539 }],
    total: 539,
    status: 'shipped',
    paymentStatus: 'paid',
    date: '2025-02-24',
    deliveryDate: '2025-02-27',
  },
  {
    id: 'ord-003',
    customerId: 'c3',
    customerName: 'Kavya Reddy',
    products: [
      { productId: 'p5', name: 'Almond Butter 400g', qty: 1, price: 392 },
      { productId: 'p6', name: 'Cheese Puffs Variety Pack', qty: 2, price: 108 },
    ],
    total: 608,
    status: 'confirmed',
    paymentStatus: 'paid',
    date: '2025-02-26',
    deliveryDate: '2025-03-01',
  },
  {
    id: 'ord-004',
    customerId: 'c4',
    customerName: 'Arjun Nair',
    products: [{ productId: 'p3', name: 'Multivitamin Tablets', qty: 2, price: 455 }],
    total: 910,
    status: 'pending',
    paymentStatus: 'pending',
    date: '2025-02-27',
    deliveryDate: '2025-03-02',
  },
];

export const adminStats = {
  totalUsers: 12847,
  totalSellers: 348,
  totalOrders: 8920,
  totalRevenue: 4250000,
  pendingSellers: 12,
  activeProducts: 2340,
  wasteSaved: 1840, // kg
  avgDiscount: 38, // %
};

export const sellerStats = {
  totalProducts: 45,
  activeOrders: 12,
  totalRevenue: 128500,
  monthlyRevenue: 24300,
  expiringAlerts: 8,
  totalCustomers: 342,
};
