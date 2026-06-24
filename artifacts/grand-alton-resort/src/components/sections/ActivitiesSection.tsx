import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Footprints, Sailboat, Bird, Landmark, Waves } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';

const activities = [
  {
    icon: MapPin,
    title: 'City Tours',
    description: 'Explore Kisumu city — vibrant markets, the iconic lakefront, and rich Luo heritage just minutes away.',
    image: '/images/activities/city-tours.jpg',
  },
  {
    icon: Footprints,
    title: 'Nature Walks',
    description: 'Stroll through Kisumu Impala Sanctuary and encounter impalas, monkeys, and lush tropical greenery.',
    image: '/images/activities/nature-walks.jpg',
  },
  {
    icon: Sailboat,
    title: 'Boat Excursions on Lake Victoria',
    description: "Sail across Africa's largest freshwater lake — spot fishermen, hippos, and breathtaking sunsets.",
    image: '/images/activities/boat-excursions.jpg',
  },
  {
    icon: Bird,
    title: 'Bird Watching',
    description: 'Spot the rare Shoebill Stork and 300+ species thriving in the wetlands fringing Lake Victoria.',
    image: '/images/activities/bird-watching.jpg',
  },
  {
    icon: Landmark,
    title: 'Cultural Experiences',
    description: 'Visit Kisumu Museum, explore traditional Luo homesteads, and immerse yourself in living heritage.',
    image: '/images/activities/cultural.webp',
  },
  {
    icon: Waves,
    title: 'Relaxation by the Pool',
    description: 'Unwind in our pristine pool surrounded by tropical gardens — your private oasis within the resort.',
    image: '/images/activities/pool.jpg',
  },
];

const activitiesStats = [
  { value: 6, suffix: '+', label: 'Activities' },
  { value: 50, suffix: '+', label: 'Tour Partners' },
  { value: 24, suffix: 'hr', label: 'Concierge' },
  { value: 100, suffix: '%', label: 'Memorable' },
];

export default function ActivitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="activities" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gold-400 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2">Things To Do</p>
          <h2 className="heading-lg">
            Activities & <span className="text-gold-400">Experiences</span>
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Discover exciting activities and experiences during your stay, from exploring Lake Victoria to cultural adventures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 bg-gray-50 rounded-xl p-4 sm:p-6"
        >
          {activitiesStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-xl sm:text-2xl font-bold text-royal-500">
                <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} duration={2000} />
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-xl cursor-pointer card-hover"
            >
              <div className="relative h-48 sm:h-72 overflow-hidden bg-gray-200">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/85 via-royal-900/20 to-transparent flex flex-col justify-end p-4 sm:p-6">
                <activity.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gold-400 mb-2 sm:mb-3" />
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{activity.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
