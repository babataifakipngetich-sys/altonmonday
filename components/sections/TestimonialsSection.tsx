'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { AnimatedCounter } from '@/hooks/useCountUp';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'John Oketch',
    rating: 5,
    review: 'Exceptional hospitality and beautiful rooms. The staff went above and beyond to make our stay memorable. The food was delicious and the pool area is stunning. Highly recommended!',
    date: '2 months ago',
    avatar: 'JO',
  },
  {
    name: 'Mary Atieno',
    rating: 5,
    review: 'The perfect place for conferences and family vacations. Modern facilities, great internet, and the conference rooms are well equipped. Will definitely be back!',
    date: '1 month ago',
    avatar: 'MA',
  },
  {
    name: 'Peter Ochieng',
    rating: 5,
    review: 'Amazing food and professional staff. Truly unforgettable experience. The restaurant serves both local and international dishes with great attention to detail.',
    date: '3 weeks ago',
    avatar: 'PO',
  },
  {
    name: 'Grace Adhiambo',
    rating: 5,
    review: 'We had our wedding here and it was absolutely magical! The garden setup was beautiful, the coordination team was professional, and our guests were impressed.',
    date: '1 month ago',
    avatar: 'GA',
  },
  {
    name: 'Michael Otieno',
    rating: 5,
    review: 'Clean rooms, excellent service, and the location is perfect - just a short drive from the airport. The airport transfer service was very convenient.',
    date: '2 weeks ago',
    avatar: 'MO',
  },
  {
    name: 'Sarah Nyawanda',
    rating: 5,
    review: 'The Presidential Suite exceeded all expectations. Luxurious amenities, stunning views, and personalized service. Worth every penny for a special occasion!',
    date: '3 months ago',
    avatar: 'SN',
  },
];

const testimonialsStats = [
  { value: 127, suffix: '+', label: 'Reviews' },
  { value: 4.8, suffix: '/5', label: 'Average Rating', decimals: 1 },
  { value: 98, suffix: '%', label: 'Recommend Us' },
  { value: 500, suffix: '+', label: 'Happy Guests' },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gold-400 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2">Guest Reviews</p>
          <h2 className="heading-lg">
            What Our <span className="text-gold-400">Guests Say</span>
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Real reviews from our valued guests on Google Maps
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 bg-gray-50 rounded-xl p-4 sm:p-6"
        >
          {testimonialsStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-xl sm:text-2xl font-bold text-royal-500">
                <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} duration={2000} decimals={stat.decimals || 0} />
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={16}
            className="pb-10 sm:pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 h-full">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400/30 mb-3 sm:mb-4" />
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < testimonial.rating
                            ? 'text-gold-400 fill-gold-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm line-clamp-4">{testimonial.review}</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-royal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-royal-500 text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-6 sm:mt-8"
        >
          <a
            href="https://maps.app.goo.gl/xTB5WaNuvTjJ3CVh7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-royal-500 hover:text-gold-400 font-medium transition-colors text-sm sm:text-base"
          >
            See all reviews on Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
