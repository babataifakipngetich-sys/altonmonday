'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';

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
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Guest Reviews</p>
          <h2 className="heading-lg">
            What Our <span className="text-gold-400">Guests Say</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Real reviews from our valued guests on Google Maps
          </p>
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
            spaceBetween={24}
 className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-50 rounded-xl p-6 h-full">
                  <Quote className="w-8 h-8 text-gold-400/30 mb-4" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? 'text-gold-400 fill-gold-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-4">{testimonial.review}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-royal-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-royal-500">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
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
          className="text-center mt-8"
        >
          <a
            href="https://maps.app.goo.gl/xTB5WaNuvTjJ3CVh7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-royal-500 hover:text-gold-400 font-medium transition-colors"
          >
            See all reviews on Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
