'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Heart, Cake, GraduationCap, Briefcase, PartyPopper } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

const eventTypes = [
  { icon: Heart, title: 'Wedding Receptions', description: 'Create magical memories' },
  { icon: Heart, title: 'Garden Weddings', description: 'Romantic outdoor ceremonies' },
  { icon: Cake, title: 'Birthday Parties', description: 'Celebrate in style' },
  { icon: Briefcase, title: 'Corporate Events', description: 'Professional gatherings' },
  { icon: GraduationCap, title: 'Graduation Celebrations', description: 'Honor achievements' },
];

const eventImages = [
  '/images/hero/hero1.jpg',
  '/images/hero/hero2.jpg',
  '/images/hero/hero3.jpg',
  '/images/hero/hero4.jpg',
  '/images/hero/hero5.jpg',
];

interface EventsSectionProps {
  onPlanEvent?: () => void;
}

export default function EventsSection({ onPlanEvent }: EventsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="events" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              {eventImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/3]">
                    <img
                      src={image}
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Celebrate With Us</p>
            <h2 className="heading-lg mb-6">
              Events & <span className="text-gold-400">Weddings</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Create unforgettable memories at The Grand Alton Resort. Our beautiful gardens
              and elegant venues provide the perfect setting for your special occasions,
              from fairy-tale weddings to memorable celebrations.
            </p>

            <div className="space-y-4 mb-8">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-white rounded-lg hover:bg-royal-50 transition-colors group"
                >
                  <event.icon className="w-6 h-6 text-royal-500 group-hover:text-gold-400 transition-colors" />
                  <div>
                    <h4 className="font-semibold text-royal-500">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={onPlanEvent}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gold-400 text-royal-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-500 transition-colors"
            >
              Plan Your Event
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
