'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Wifi, Video, Mic, Presentation, Coffee } from 'lucide-react';

const capacities = [
  { guests: '50', label: 'Guests', type: 'Small Meeting Room' },
  { guests: '100', label: 'Guests', type: 'Medium Conference Hall' },
  { guests: '200', label: 'Guests', type: 'Large Conference Hall' },
];

const features = [
  { icon: Video, label: 'Audio-Visual Equipment' },
  { icon: Wifi, label: 'High-Speed Wi-Fi' },
  { icon: Mic, label: 'Sound Systems' },
  { icon: Presentation, label: 'Projectors' },
  { icon: Coffee, label: 'Tea Break Services' },
  { icon: Users, label: 'Team Building' },
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
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Business</p>
          <h2 className="heading-lg">Conference Facilities</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Modern meeting spaces equipped with state-of-the-art technology for
            corporate events, workshops, and team-building activities.
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          <img
            src="/images/conference/conference/con1.jpg"
            alt="Conference facilities"
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="font-playfair text-3xl font-bold mb-2">Modern Meeting Spaces</h3>
            <p className="text-white/80">
              Fully equipped conference rooms for successful business events
            </p>
          </div>
        </motion.div>

        {/* Capacity Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {capacities.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={`/images/conference/conference/con${index + 1}.jpg`}
                alt={item.type}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-royal-900/60 group-hover:bg-royal-900/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="font-playfair text-5xl font-bold text-gold-400">{item.guests}</p>
                <p className="text-lg">{item.label}</p>
                <p className="text-white/70 mt-2">{item.type}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-royal-50 transition-colors group"
            >
              <feature.icon className="w-8 h-8 text-royal-500 group-hover:text-gold-400 transition-colors" />
              <span className="text-sm text-gray-700 text-center">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={onBookNow}
            className="bg-royal-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-royal-600 transition-colors"
          >
            Book Conference Room
          </button>
        </motion.div>
      </div>
    </section>
  );
}
