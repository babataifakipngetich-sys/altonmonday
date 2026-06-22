'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Wifi, Tv, Wind, Coffee, BedDouble } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'Comfortable and elegant room perfect for solo travelers or couples seeking a cozy retreat.',
    price: 'KES 8,500',
    image: '/images/rooms/rooms/rm1.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '28 sqm',
    beds: '1 Queen Bed',
  },
  {
    id: 2,
    name: 'Executive Room',
    description: 'Spacious room with premium amenities and a work area, ideal for business travelers.',
    price: 'KES 12,000',
    image: '/images/rooms/rooms/rm2.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '35 sqm',
    beds: '1 King Bed',
  },
  {
    id: 3,
    name: 'Twin Room',
    description: 'Two comfortable single beds, perfect for friends or colleagues traveling together.',
    price: 'KES 10,000',
    image: '/images/rooms/rooms/rm3.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '30 sqm',
    beds: '2 Single Beds',
  },
  {
    id: 4,
    name: 'Family Suite',
    description: 'Spacious suite with separate living area, perfect for families seeking comfort and convenience.',
    price: 'KES 18,000',
    image: '/images/rooms/rooms/rm4.jpg',
    amenities: ['Wi-Fi', 'AC', 'TV', 'Coffee'],
    size: '55 sqm',
    beds: '1 King + 2 Singles',
  },
  {
    id: 5,
    name: 'Presidential Suite',
    description: 'Our most luxurious accommodation featuring premium amenities, stunning views, and exclusive services.',
    price: 'KES 35,000',
    image: '/images/rooms/rooms/rm5.jpg',
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
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Accommodation</p>
          <h2 className="heading-lg">
            Rooms & <span className="text-gold-400">Suites</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Experience unparalleled comfort in our elegantly appointed rooms and suites,
            each designed with your relaxation in mind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg card-hover group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 bg-gold-400 text-royal-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {room.price}/night
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-royal-500 mb-2">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <BedDouble className="w-4 h-4 text-royal-500" />
                  <span className="text-sm text-gray-600">{room.beds}</span>
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-sm text-gray-600">{room.size}</span>
                </div>

                <div className="flex gap-3 mb-4">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="flex items-center gap-1 text-gray-500">
                        <Icon className="w-4 h-4" />
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={onBookNow}
                  className="w-full bg-royal-500 text-white py-3 rounded-md font-medium hover:bg-royal-600 transition-colors"
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
