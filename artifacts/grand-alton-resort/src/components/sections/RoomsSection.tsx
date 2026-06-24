import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Wifi, Tv, Wind, Coffee, BedDouble, ShoppingCart, Phone } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';
import { type Product, ProductSchema, STATIC_PRODUCTS, formatKES } from '@/lib/pricing';
import PricingCatalogue from '@/components/pricing/PricingCatalogue';
import CartSheet from '@/components/pricing/CartSheet';
import { useCart } from '@/context/CartContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const rooms = [
  {
    id: 1,
    name: 'Standard Room',
    description: 'Comfortable and well-appointed room for solo travelers or couples seeking a relaxing retreat near Kisumu Airport.',
    image: '/images/hero/hero/hero1.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '25 sqm',
    beds: '1 Bed',
  },
  {
    id: 2,
    name: 'Standard Double',
    description: 'Spacious standard room with a double bed and all essential amenities for a comfortable stay.',
    image: '/images/others/others/IMG-20260618-WA0018.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '28 sqm',
    beds: '1 Double Bed',
  },
  {
    id: 3,
    name: 'Deluxe Room',
    description: 'Elevated comfort with premium furnishings, enhanced amenities, and beautiful views of the resort grounds.',
    image: '/images/others/others/IMG-20260618-WA0024.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '32 sqm',
    beds: '1 Queen Bed',
  },
  {
    id: 4,
    name: 'Deluxe Double',
    description: 'Our finest double room featuring upgraded decor, extra space, and exclusive resort views.',
    image: '/images/hero/hero/hero2.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '38 sqm',
    beds: '1 King Bed',
  },
];

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi,
  'AC': Wind,
  'TV': Tv,
  'Coffee': Coffee,
};

const roomStats = [
  { value: 18, suffix: '+', label: 'Luxury Rooms' },
  { value: 4500, prefix: 'KES ', label: 'Starting Price', suffix: '' },
  { value: 24, suffix: '/7', label: 'Room Service' },
  { value: 100, suffix: '%', label: 'Guest Satisfaction' },
];

async function fetchProducts(): Promise<Product[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=*&order=category,name,price`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data as unknown[])
      .map((row) => {
        const r = row as Record<string, unknown>;
        const result = ProductSchema.safeParse({ ...r, price: Number(r.price) });
        return result.success ? result.data : null;
      })
      .filter((p): p is Product => p !== null);
  } catch {
    return [];
  }
}

interface RoomsSectionProps {
  onBookNow?: () => void;
}

export default function RoomsSection({ onBookNow }: RoomsSectionProps) {
  const ref = useRef(null);
  const pricingRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isPricingInView = useInView(pricingRef, { once: true, margin: '-80px' });
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { count, total } = useCart();

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.length > 0 ? data : STATIC_PRODUCTS);
      })
      .finally(() => setLoadingProducts(false));
  }, []);

  return (
    <section id="rooms" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gold-400 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2">Accommodation</p>
          <h2 className="heading-lg">
            Rooms & <span className="text-gold-400">Suites</span>
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Experience unparalleled comfort in our elegantly appointed rooms and suites,
            each designed with your relaxation in mind.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 bg-white rounded-xl p-4 sm:p-6 shadow-lg"
        >
          {roomStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-royal-500">
                {stat.prefix || ''}
                <AnimatedCounter value={stat.value} suffix={stat.suffix ?? ''} duration={2000} />
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg card-hover group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-playfair text-base sm:text-lg font-semibold text-royal-500 mb-1.5">{room.name}</h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{room.description}</p>
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                  <BedDouble className="w-3.5 h-3.5 text-royal-500 flex-shrink-0" />
                  <span>{room.beds}</span>
                  <span className="text-gray-300 mx-1">|</span>
                  <span>{room.size}</span>
                </div>
                <div className="flex gap-2.5 mb-4">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="text-gray-400" title={amenity}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={onBookNow}
                  className="w-full bg-royal-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-royal-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={pricingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-20"
          id="pricing"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="text-center">
              <p className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-1">Transparent Pricing</p>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-royal-500">Room Rates</h3>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            All rates are per room per night in Kenyan Shillings. Choose your room type and preferred meal plan below.
          </p>

          {count > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-16 z-30 mb-8 bg-white border border-royal-100 rounded-xl shadow-lg px-4 sm:px-5 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-royal-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-royal-500">
                    {count} item{count !== 1 ? 's' : ''} in cart
                  </p>
                  <p className="text-xs text-gray-500">Estimated total: {formatKES(total)}</p>
                </div>
              </div>
              <CartSheet />
            </motion.div>
          )}

          {loadingProducts ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-royal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isPricingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <PricingCatalogue products={products} />
            </motion.div>
          )}

          {!loadingProducts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 text-center"
            >
              <div className="inline-flex flex-wrap items-center justify-center gap-3">
                <CartSheet />
                <a
                  href="tel:+254794000020"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-royal-500 text-royal-500 rounded-md font-semibold text-sm hover:bg-royal-500 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call to Book
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Tel: +254 794 000 020 &nbsp;|&nbsp; thegrandaltonresort@gmail.com
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
