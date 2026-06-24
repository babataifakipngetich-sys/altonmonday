import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Footprints, Sailboat, Bird, Landmark, Waves } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';

const activities = [
  { icon: MapPin, title: 'City Tours', description: 'Explore Kisumu city and discover its rich history', image: '/images/hero/hero/hero1.jpg' },
  { icon: Footprints, title: 'Nature Walks', description: 'Scenic trails through beautiful landscapes', image: '/images/others/others/IMG-20260618-WA0029.jpg' },
  { icon: Sailboat, title: 'Boat Excursions on Lake Victoria', description: "Experience Africa's largest freshwater lake", image: '/images/hero/hero/hero2.jpg' },
  { icon: Bird, title: 'Bird Watching', description: 'Discover diverse bird species in their natural habitat', image: '/images/others/others/IMG-20260618-WA0022.jpg' },
  { icon: Landmark, title: 'Cultural Experiences', description: 'Immerse yourself in local traditions and heritage', image: '/images/hero/hero/hero3.jpg' },
  { icon: Waves, title: 'Relaxation by the Pool', description: 'Unwind in our pristine swimming pool', image: '/images/hero/hero/hero5.jpg' },
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
              <div className="relative h-48 sm:h-72 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/80 to-transparent flex flex-col justify-end p-4 sm:p-6">
                <activity.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gold-400 mb-2 sm:mb-3" />
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{activity.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
