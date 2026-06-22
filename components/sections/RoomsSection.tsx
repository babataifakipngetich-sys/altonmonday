'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Wifi, Tv, Wind, Coffee, BedDouble } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'Comfortable and elegant room perfect for solo travelers or couples seeking a cozy retreat.',
    price: 8500,
    image: '/images/hero/hero/hero1.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '28 sqm',
    beds: '1 Queen Bed',
  },
  {
    id: 2,
    name: 'Executive Room',
    description: 'Spacious room with premium amenities and a work area, ideal for business travelers.',
    price: 12000,
    image: '/images/others/others/IMG-20260618-WA0018.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '35 sqm',
    beds: '1 King Bed',
  },
  {
    id: 3,
    name: 'Twin Room',
    description: 'Two comfortable single beds, perfect for friends or colleagues traveling together.',
    price: 10000,
    image: '/images/others/others/IMG-20260618-WA0024.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '30 sqm',
    beds: '2 Single Beds',
  },
  {
    id: 4,
    name: 'Family Suite',
    description: 'Spacious suite with separate living area, perfect for families seeking comfort and convenience.',
    price: 18000,
    image: '/images/hero/hero/hero2.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '55 sqm',
    beds: '1 King + 2 Singles',
  },
  {
    id: 5,
    name: 'Presidential Suite',
    description: 'Our most luxurious accommodation featuring premium amenities, stunning views, and exclusive services.',
    price: 35000,
    image: '/images/hero/hero/hero5.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '85 sqm',
    beds: '1 King Bed + Living Room',
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  'Wi-Fi': Wifi,
  'AC': Wind,
  'TV': Tv,
  'Coffee': Coffee,
};

const roomStats = [
  { value: 50, suffix: '+', label: 'Luxury Rooms' },
  { value: 8500, prefix: 'KES ', label: 'Starting Price', suffix: '' },
  { value: 24, suffix: '/7', label: 'Room Service' },
  { value: 100, suffix: '%', label: 'Guest Satisfaction' },
];

interface RoomsSectionProps {
  onBookNow?: () => void;
}

export default function RoomsSection({ onBookNow }: RoomsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        {/* Room Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 bg-white rounded-xl p-4 sm:p-6 shadow-lg"
        >
          {roomStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-royal-500">
                {stat.prefix || ''}{stat.value}{stat.suffix}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg card-hover group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gold-400 text-royal-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                  KES {room.price.toLocaleString()}/night
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-playfair text-lg sm:text-xl font-semibold text-royal-500 mb-2">{room.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{room.description}</p>

                <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                  <BedDouble className="w-3 h-3 sm:w-4 sm:h-4 text-royal-500 flex-shrink-0" />
                  <span className="text-gray-600">{room.beds}</span>
                  <span className="text-gray-400 mx-1 sm:mx-2">|</span>
                  <span className="text-gray-600">{room.size}</span>
                </div>

                <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="flex items-center gap-1 text-gray-500" title={amenity}>
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={onBookNow}
                  className="w-full bg-royal-500 text-white py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-royal-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
