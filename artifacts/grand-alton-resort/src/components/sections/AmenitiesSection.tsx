import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Wifi, Car, UtensilsCrossed, ConciergeBell, Users, TreePalm, Shirt, Plane, Clock, Waves } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';

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

const amenitiesStats = [
  { value: 10, suffix: '+', label: 'Amenities' },
  { value: 24, suffix: '/7', label: 'Support' },
  { value: 100, suffix: '%', label: 'Free Wi-Fi' },
  { value: 50, suffix: '+', label: 'Car Park Spaces' },
];

export default function AmenitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="amenities" className="section-padding bg-royal-900 text-white relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gold-400 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2">What We Offer</p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold">
            Resort <span className="text-gold-400">Amenities</span>
          </h2>
          <p className="text-white/70 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Enjoy a comprehensive range of facilities and services designed for your comfort and convenience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          {amenitiesStats.map((stat) => (
            <div key={stat.label} className="text-center p-3 sm:p-4 bg-white/10 rounded-lg">
              <p className="font-playfair text-2xl sm:text-3xl font-bold text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} duration={2000} />
              </p>
              <p className="text-white/70 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center text-center p-4 sm:p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-gold-400 transition-colors">
                <amenity.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400 group-hover:text-royal-900 transition-colors" />
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{amenity.title}</h4>
              <p className="text-white/60 text-xs sm:text-sm hidden sm:block">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave divider → Activities (white) */}
      <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
