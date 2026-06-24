import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Calendar, Users, Building2, Tag, Percent } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';

const offers = [
  { icon: Heart, title: 'Honeymoon Package', description: 'Romantic getaway with candlelit dinner, spa treatment, and luxury suite', discount: 20, image: '/images/hero/hero/hero3.jpg' },
  { icon: Calendar, title: 'Weekend Getaway', description: 'Perfect weekend escape with complementary breakfast and late checkout', discount: 15, image: '/images/hero/hero/hero1.jpg' },
  { icon: Users, title: 'Conference Package', description: 'Business meeting solutions with AV equipment, catering, and accommodation', discount: 25, image: '/images/conference/conference/con1.jpg' },
  { icon: Tag, title: 'Family Holiday', description: 'Fun for the whole family with kids activities and family-friendly amenities', discount: 15, image: '/images/others/others/IMG-20260618-WA0020.jpg' },
  { icon: Building2, title: 'Corporate Discount', description: 'Special rates for corporate clients with flexible booking options', discount: 20, image: '/images/conference/conference/con2.jpg' },
];

const offersStats = [
  { value: 25, suffix: '%', label: 'Max Discount' },
  { value: 500, suffix: '+', label: 'Happy Guests' },
  { value: 10, suffix: '+', label: 'Packages' },
  { value: 24, suffix: 'hr', label: 'Support' },
];

interface SpecialOffersSectionProps {
  onBookOffer?: () => void;
}

export default function SpecialOffersSection({ onBookOffer }: SpecialOffersSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="offers" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gold-400 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2">Exclusive Deals</p>
          <h2 className="heading-lg">
            Special <span className="text-gold-400">Offers</span>
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Take advantage of our exclusive packages and special rates designed to make your stay even more memorable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 bg-white rounded-xl p-4 sm:p-6 shadow-md"
        >
          {offersStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-xl sm:text-2xl font-bold text-royal-500">
                <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} duration={2000} />
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gold-400 text-royal-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  {offer.discount}% OFF
                </div>
                <div className="absolute inset-0 bg-royal-900/30 group-hover:bg-royal-900/10 transition-colors" />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <offer.icon className="w-5 h-5 sm:w-6 sm:h-6 text-royal-500" />
                  <h3 className="font-playfair text-base sm:text-lg font-bold text-royal-500">{offer.title}</h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{offer.description}</p>
                <button
                  onClick={onBookOffer}
                  className="w-full bg-royal-500 text-white py-2.5 sm:py-3 rounded-md font-medium text-sm sm:text-base hover:bg-royal-600 transition-colors"
                >
                  Book Offer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
