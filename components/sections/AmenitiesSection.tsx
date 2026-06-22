'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Wifi, Car, UtensilsCrossed, ConciergeBell, Users, TreePalm, Shirt, Plane, Clock, Waves } from 'lucide-react';

const amenities = [
  { icon: Wifi, title: 'Free Wi-Fi', description: 'High-speed internet throughout the resort' },
  { icon: Waves, title: 'Swimming Pool', description: 'Relax in our pristine pool' },
  { icon: Car, title: 'Secure Parking', description: 'Ample parking space for guests' },
  { icon: UtensilsCrossed, title: 'Restaurant & Bar', description: 'Fine dining and refreshing drinks' },
  { icon: ConciergeBell, title: 'Room Service', description: '24-hour in-room dining' },
  { icon: Users, title: 'Conference Rooms', description: 'Modern meeting facilities' },
  { icon: TreePalm, title: 'Garden Spaces', description: 'Beautiful landscaped gardens' },
  { icon: Shirt, title: 'Laundry Services', description: 'Professional laundry care' },
  { icon: Plane, title: 'Airport Transfers', description: 'Convenient airport shuttle' },
  { icon: Clock, title: '24-Hour Reception', description: 'Always at your service' },
];

export default function AmenitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="amenities" className="section-padding bg-royal-900 text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">What We Offer</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold">
            Resort <span className="text-gold-400">Amenities</span>
          </h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Enjoy a comprehensive range of facilities and services designed for your comfort and convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold-400 transition-colors">
                <amenity.icon className="w-8 h-8 text-gold-400 group-hover:text-royal-900 transition-colors" />
              </div>
              <h4 className="font-semibold mb-2">{amenity.title}</h4>
              <p className="text-white/60 text-sm">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
