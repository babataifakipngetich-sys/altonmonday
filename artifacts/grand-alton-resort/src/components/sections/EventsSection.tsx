import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Heart, Cake, GraduationCap, Briefcase } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';
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
  '/images/hero/hero/hero3.jpg',
  '/images/others/others/IMG-20260618-WA0020.jpg',
  '/images/others/others/IMG-20260618-WA0026.jpg',
  '/images/hero/hero/hero1.jpg',
  '/images/others/others/IMG-20260618-WA0017.jpg',
];

const eventsStats = [
  { value: 3, label: 'Garden Venues' },
  { value: 200, suffix: '+', label: 'Guest Capacity' },
  { value: 50, suffix: '+', label: 'Events Hosted' },
  { value: 100, suffix: '%', label: 'Success Rate' },
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
        <div ref={ref} className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
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
                  <div className="relative aspect-[4/3]">
                    <img src={image} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="text-gold-400 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2">Celebrate With Us</p>
            <h2 className="heading-lg mb-4 sm:mb-6">
              Events & <span className="text-gold-400">Weddings</span>
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Create unforgettable memories at The Grand Alton Resort. Our beautiful gardens
              and elegant venues provide the perfect setting for your special occasions,
              from fairy-tale weddings to memorable celebrations.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8"
            >
              {eventsStats.map((stat) => (
                <div key={stat.label} className="text-center p-2 sm:p-3 bg-white rounded-lg">
                  <p className="font-playfair text-lg sm:text-2xl font-bold text-royal-500">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} duration={2000} />
                  </p>
                  <p className="text-gray-500 text-[10px] sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 bg-white rounded-lg hover:bg-royal-50 transition-colors group"
                >
                  <event.icon className="w-5 h-5 sm:w-6 sm:h-6 text-royal-500 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-royal-500 text-sm sm:text-base">{event.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={onPlanEvent}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gold-400 text-royal-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-gold-500 transition-colors"
            >
              Plan Your Event
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
