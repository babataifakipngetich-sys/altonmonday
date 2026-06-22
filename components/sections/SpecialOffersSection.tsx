'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Calendar, Users, Building2, Tag } from 'lucide-react';

const offers = [
  {
    icon: Heart,
    title: 'Honeymoon Package',
    description: 'Romantic getaway with candlelit dinner, spa treatment, and luxury suite',
    discount: '20% OFF',
    image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Calendar,
    title: 'Weekend Getaway',
    description: 'Perfect weekend escape with complementary breakfast and late checkout',
    discount: '15% OFF',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Users,
    title: 'Conference Package',
    description: 'Business meeting solutions with AV equipment, catering, and accommodation',
    discount: '25% OFF',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Tag,
    title: 'Family Holiday',
    description: 'Fun for the whole family with kids activities and family-friendly amenities',
    discount: '15% OFF',
    image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    icon: Building2,
    title: 'Corporate Discount',
    description: 'Special rates for corporate clients with flexible booking options',
    discount: '20% OFF',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
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
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Exclusive Deals</p>
          <h2 className="heading-lg">
            Special <span className="text-gold-400">Offers</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Take advantage of our exclusive packages and special rates designed
            to make your stay even more memorable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-gold-400 text-royal-900 px-3 py-1 rounded-full text-sm font-bold">
                  {offer.discount}
                </div>
                <div className="absolute inset-0 bg-royal-900/30 group-hover:bg-royal-900/10 transition-colors" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <offer.icon className="w-6 h-6 text-royal-500" />
                  <h3 className="font-playfair text-lg font-bold text-royal-500">{offer.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                <button
                  onClick={onBookOffer}
                  className="w-full bg-royal-500 text-white py-3 rounded-md font-medium hover:bg-royal-600 transition-colors"
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
