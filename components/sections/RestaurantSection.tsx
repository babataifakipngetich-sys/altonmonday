'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { UtensilsCrossed, Wine, Coffee, Sunrise, Clock, MapPin } from 'lucide-react';

const diningOptions = [
  {
    icon: UtensilsCrossed,
    title: 'Local Cuisine',
    description: 'Authentic Kenyan dishes prepared with fresh, locally sourced ingredients.',
  },
  {
    icon: Wine,
    title: 'Continental Cuisine',
    description: 'International flavors crafted by our expert culinary team.',
  },
  {
    icon: Sunrise,
    title: 'Breakfast Buffet',
    description: 'Start your day with our lavish breakfast spread.',
  },
  {
    icon: Coffee,
    title: 'Bar & Lounge',
    description: 'Premium beverages and signature cocktails.',
  },
];

const hours = [
  { day: 'Breakfast', time: '6:00 AM - 10:00 AM' },
  { day: 'Lunch', time: '12:00 PM - 3:00 PM' },
  { day: 'Dinner', time: '6:00 PM - 10:00 PM' },
  { day: 'Bar & Lounge', time: '10:00 AM - 11:00 PM' },
];

interface RestaurantSectionProps {
  onReserveTable?: () => void;
}

export default function RestaurantSection({ onReserveTable }: RestaurantSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="restaurant" className="section-padding bg-royal-900 text-white">
      <div className="container-custom">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Dining Experience</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gold-400">Restaurant</span>
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed text-lg">
              Indulge in a culinary journey at our elegant restaurant, where our talented chefs
              create exquisite dishes using the finest ingredients. From traditional Kenyan
              delicacies to international favorites, every meal is a celebration of flavors.
            </p>

            {/* Dining Options Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {diningOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-3 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors">
                    <option.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{option.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{option.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Opening Hours */}
            <div className="bg-white/5 rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gold-400" />
                <h4 className="font-semibold">Opening Hours</h4>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {hours.map((slot) => (
                  <div key={slot.day} className="flex justify-between">
                    <span className="text-white/60">{slot.day}</span>
                    <span className="text-white font-medium">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={onReserveTable}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gold-400 text-royal-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-500 transition-colors"
            >
              Reserve a Table
            </motion.button>
          </motion.div>

          {/* Image Side - Creative Staggered Layout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[550px]"
          >
            {/* Large Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-0 left-0 w-[65%] h-[70%] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/dining/dining/din1.jpg"
                alt="Restaurant interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/40 to-transparent" />

              {/* Floating tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <UtensilsCrossed className="w-5 h-5 text-royal-900" />
                </div>
                <div>
                  <p className="font-bold text-royal-900 text-sm">Fine Dining</p>
                  <p className="text-gray-600 text-xs">Local & Continental</p>
                </div>
              </div>
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-0 right-0 w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-royal-900 z-10"
            >
              <img
                src="/images/dining/dining/din2.jpg"
                alt="Signature dishes"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/50 to-transparent" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-gold-400 text-royal-900 text-xs font-bold px-3 py-1.5 rounded-full">
                  SIGNATURE DISHES
                </span>
              </div>
            </motion.div>

            {/* Accent Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-[45%] right-[45%] w-[30%] h-[30%] rounded-xl overflow-hidden shadow-xl z-20"
            >
              <img
                src="/images/dining/dining/din3.jpg"
                alt="Bar & cocktails"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-royal-900/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wine className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold-400/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-white/10 rounded-full" />
          </motion.div>
        </div>

        {/* Outdoor Dining Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative rounded-2xl overflow-hidden group"
        >
          <img
            src="/images/dining/dining/din3.jpg"
            alt="Outdoor dining experience"
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-900/90 via-royal-900/50 to-transparent flex items-center">
            <div className="p-8 md:p-12 max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span className="text-gold-400 text-sm tracking-wide uppercase">Garden Setting</span>
              </div>
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Outdoor Dining</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Enjoy your meals in our beautiful garden setting with stunning views
                and fresh air. Perfect for romantic dinners and special occasions.
              </p>
              <button
                onClick={onReserveTable}
                className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors"
              >
                <span>Book Garden Table</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
