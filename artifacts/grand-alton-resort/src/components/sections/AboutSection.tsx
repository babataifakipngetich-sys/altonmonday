import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Plane, Award, Heart, Shield, Sparkles } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';

const stats = [
  { icon: Sparkles, value: 50, label: 'Luxury Rooms', suffix: '+' },
  { icon: Heart, value: 2, label: 'Restaurant & Bar' },
  { icon: Award, value: 5, label: 'Conference Halls' },
  { icon: Shield, value: 3, label: 'Wedding Gardens' },
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
      <div className="absolute top-20 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] sm:h-[450px] lg:h-[550px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 left-0 w-[70%] h-[75%] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/hero/hero/hero1.jpg"
                alt="The Grand Alton Resort"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/30 to-transparent" />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-royal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-7 sm:h-7 text-gold-400" />
                </div>
                <div>
                  <p className="font-playfair text-sm sm:text-lg font-bold text-royal-500">Since 2024</p>
                  <p className="text-xs sm:text-sm text-gray-600">Premier Hospitality in Kisumu</p>
                </div>
              </motion.div>
            </motion.div>

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
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="bg-gold-400 text-royal-900 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  FINE DINING
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 lg:left-[65%] lg:translate-x-0 bg-white rounded-xl shadow-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 z-20"
            >
              <div className="flex -space-x-1 sm:-space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gold-400 flex items-center justify-center text-[10px] sm:text-xs font-bold text-royal-900">5</div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-royal-500 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white">4</div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white">2</div>
              </div>
              <div className="text-[10px] sm:text-xs">
                <p className="font-bold text-gray-900">11+ Spaces</p>
                <p className="text-gray-500">for your events</p>
              </div>
            </motion.div>

            <div className="absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 border-2 border-gold-400/20 rounded-full" />
            <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 border-2 border-royal-500/20 rounded-full" />
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
              className="inline-flex items-center gap-2 bg-royal-50 text-royal-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>About Our Resort</span>
            </motion.div>

            <h2 className="heading-lg mb-4 sm:mb-6">
              Welcome to <span className="text-gold-400">The Grand Alton Resort</span>
            </h2>

            <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base lg:text-lg">
              Experience the epitome of Kenyan hospitality at The Grand Alton Resort.
              Strategically positioned near Kisumu International Airport, we offer an
              extraordinary blend of luxury accommodation, world-class dining, and
              versatile event spaces.
            </p>

            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Whether you're here for business or leisure, our dedicated team ensures
              every moment of your stay is memorable. From our elegantly appointed rooms
              to our pristine gardens and modern conference facilities, every corner
              of our resort is designed for your comfort.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-royal-50 transition-colors group">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-royal-500 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Otonglo, Kisumu</p>
                  <p className="text-xs sm:text-sm text-gray-500">Behind Kodiaga Prison, Western Kenya</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-royal-50 transition-colors group">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-royal-500 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Minutes from Airport</p>
                  <p className="text-xs sm:text-sm text-gray-500">Convenient location near Kisumu International Airport</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm hover:border-gold-400 hover:text-gold-600 transition-colors"
                >
                  <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400" />
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-royal-500 to-royal-600 rounded-2xl p-6 sm:p-8 md:p-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">What We Offer</h3>
            <p className="text-white/70 mt-2 text-sm sm:text-base">Experience excellence at every turn</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center p-3 sm:p-4"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
                </div>
                <p className="font-playfair text-2xl sm:text-3xl font-bold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} duration={2000} />
                </p>
                <p className="text-white/70 text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
