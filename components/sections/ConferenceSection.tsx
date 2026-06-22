'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Users, Wifi, Video, Mic, Presentation, Coffee } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';

const capacities = [
  { guests: 50, label: 'Guests', type: 'Small Meeting Room' },
  { guests: 100, label: 'Guests', type: 'Medium Conference Hall' },
  { guests: 200, label: 'Guests', type: 'Large Conference Hall' },
];

const features = [
  { icon: Video, label: 'Audio-Visual Equipment' },
  { icon: Wifi, label: 'High-Speed Wi-Fi' },
  { icon: Mic, label: 'Sound Systems' },
  { icon: Presentation, label: 'Projectors' },
  { icon: Coffee, label: 'Tea Break Services' },
  { icon: Users, label: 'Team Building' },
];

const conferenceStats = [
  { value: 5, label: 'Conference Halls' },
  { value: 350, suffix: '+', label: 'Total Capacity' },
  { value: 50, suffix: '+', label: 'Events Hosted' },
  { value: 100, suffix: '%', label: 'Success Rate' },
];

interface ConferenceSectionProps {
  onBookNow?: () => void;
}

export default function ConferenceSection({ onBookNow }: ConferenceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="conference" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gold-400 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2">Business</p>
          <h2 className="heading-lg">Conference Facilities</h2>
          <p className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Modern meeting spaces equipped with state-of-the-art technology for
            corporate events, workshops, and team-building activities.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 bg-royal-500 rounded-xl p-4 sm:p-6 text-white"
        >
          {conferenceStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-2xl sm:text-3xl font-bold text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} duration={2000} />
              </p>
              <p className="text-white/70 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12"
        >
          <div className="relative h-48 sm:h-80 md:h-96">
            <Image
              src="/images/conference/conference/con1.jpg"
              alt="Conference facilities"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Modern Meeting Spaces</h3>
            <p className="text-white/80 text-xs sm:text-sm md:text-base">
              Fully equipped conference rooms for successful business events
            </p>
          </div>
        </motion.div>

        {/* Capacity Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {capacities.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="relative h-48 sm:h-64">
                <Image
                  src={`/images/conference/conference/con${index + 1}.jpg`}
                  alt={item.type}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-royal-900/60 group-hover:bg-royal-900/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="font-playfair text-4xl sm:text-5xl font-bold text-gold-400">
                  <AnimatedCounter value={item.guests} duration={2000} />
                </p>
                <p className="text-sm sm:text-lg">{item.label}</p>
                <p className="text-white/70 mt-1 sm:mt-2 text-xs sm:text-sm">{item.type}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
              className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-royal-50 transition-colors group"
            >
              <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-royal-500 group-hover:text-gold-400 transition-colors" />
              <span className="text-xs sm:text-sm text-gray-700 text-center">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <button
            onClick={onBookNow}
            className="bg-royal-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-semibold hover:bg-royal-600 transition-colors"
          >
            Book Conference Room
          </button>
        </motion.div>
      </div>
    </section>
  );
}
