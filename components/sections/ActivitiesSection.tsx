'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Footprints, Sailboat, Bird, Landmark, Waves } from 'lucide-react';

const activities = [
  {
    icon: MapPin,
    title: 'City Tours',
    description: 'Explore Kisumu city and discover its rich history',
    image: 'https://images.pexels.com/photos/2409077/pexels-photo-2409077.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Footprints,
    title: 'Nature Walks',
    description: 'Scenic trails through beautiful landscapes',
    image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Sailboat,
    title: 'Boat Excursions on Lake Victoria',
    description: 'Experience Africa\'s largest freshwater lake',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Bird,
    title: 'Bird Watching',
    description: 'Discover diverse bird species in their natural habitat',
    image: 'https://images.pexels.com/photos/219550/pexels-photo-219550.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Landmark,
    title: 'Cultural Experiences',
    description: 'Immerse yourself in local traditions and heritage',
    image: 'https://images.pexels.com/photos/1378868/pexels-photo-1378868.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Waves,
    title: 'Relaxation by the Pool',
    description: 'Unwind in our pristine swimming pool',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
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
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Things To Do</p>
          <h2 className="heading-lg">
            Activities & <span className="text-gold-400">Experiences</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover exciting activities and experiences during your stay, from
            exploring Lake Victoria to cultural adventures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-xl cursor-pointer card-hover"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/80 to-transparent flex flex-col justify-end p-6">
                <activity.icon className="w-10 h-10 text-gold-400 mb-3" />
                <h3 className="font-playfair text-xl font-bold text-white mb-1">{activity.title}</h3>
                <p className="text-white/80 text-sm">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
