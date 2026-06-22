'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Plane, Award, Heart, Shield, Sparkles } from 'lucide-react';

const stats = [
  { icon: Sparkles, value: '50+', label: 'Luxury Rooms' },
  { icon: Heart, value: '2', label: 'Restaurant & Bar' },
  { icon: Award, value: '5', label: 'Conference Halls' },
  { icon: Shield, value: '3', label: 'Wedding Gardens' },
  { icon: Sparkles, value: 'Free', label: 'Wi-Fi' },
];

const highlights = [
  { icon: Award, label: 'Award-Winning Service' },
  { icon: Shield, label: 'Safe & Secure' },
  { icon: Heart, label: 'Personalized Care' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side - Creative Layout */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 left-0 w-[70%] h-[75%] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/rooms/rooms/rm6.jpg"
                alt="The Grand Alton Resort"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/30 to-transparent" />

              {/* Floating badge inside main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-royal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <p className="font-playfair text-lg font-bold text-royal-500">Since 2024</p>
                  <p className="text-sm text-gray-600">Premier Hospitality in Kisumu</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 right-0 w-[50%] h-[45%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
            >
              <img
                src="/images/dining/dining/din2.jpg"
                alt="Fine Dining"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/40 to-transparent" />

              {/* Category tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-gold-400 text-royal-900 text-xs font-bold px-3 py-1.5 rounded-full">
                  FINE DINING
                </span>
              </div>
            </motion.div>

            {/* Accent floating element */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 lg:left-[65%] lg:translate-x-0 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 z-20"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center text-xs font-bold text-royal-900">5</div>
                <div className="w-8 h-8 rounded-full bg-royal-500 flex items-center justify-center text-xs font-bold text-white">4</div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white">2</div>
              </div>
              <div className="text-xs">
                <p className="font-bold text-gray-900">11+ Spaces</p>
                <p className="text-gray-500">for your events</p>
              </div>
            </motion.div>

            {/* Decorative circle */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-gold-400/20 rounded-full" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-royal-500/20 rounded-full" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-royal-50 text-royal-500 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>About Our Resort</span>
            </motion.div>

            <h2 className="heading-lg mb-6">
              Welcome to <span className="text-gold-400">The Grand Alton Resort</span>
            </h2>

            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              Experience the epitome of Kenyan hospitality at The Grand Alton Resort.
              Strategically positioned near Kisumu International Airport, we offer an
              extraordinary blend of luxury accommodation, world-class dining, and
              versatile event spaces.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you&apos;re here for business or leisure, our dedicated team ensures
              every moment of your stay is memorable. From our elegantly appointed rooms
              to our pristine gardens and modern conference facilities, every corner
              of our resort is designed for your comfort.
            </p>

            {/* Location highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-royal-50 transition-colors group">
                <MapPin className="w-5 h-5 text-royal-500 group-hover:text-gold-400 transition-colors" />
                <div>
                  <p className="font-medium text-gray-900">Otonglo, Kisumu</p>
                  <p className="text-sm text-gray-500">Behind Kodiaga Prison, Western Kenya</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-royal-50 transition-colors group">
                <Plane className="w-5 h-5 text-royal-500 group-hover:text-gold-400 transition-colors" />
                <div>
                  <p className="font-medium text-gray-900">Minutes from Airport</p>
                  <p className="text-sm text-gray-500">Convenient location near Kisumu International Airport</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-gold-400 hover:text-gold-600 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gold-400" />
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-royal-500 to-royal-600 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl font-bold text-white">What We Offer</h3>
            <p className="text-white/70 mt-2">Experience excellence at every turn</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center p-4"
              >
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-gold-400" />
                </div>
                <p className="font-playfair text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
