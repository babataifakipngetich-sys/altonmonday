'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const heroSlides = [
  {
    image: '/images/hero/hero/hero1.jpg',
    title: 'Elegant Rooms',
    subtitle: '& Suites',
    description: 'Drift into luxury in our exquisitely designed rooms with panoramic views of Kisumu.',
    cta: 'Explore Rooms',
    href: '#rooms',
    badge: 'From KES 8,500/night',
    accent: '#D4AF37',
  },
  {
    image: '/images/hero/hero/hero2.jpg',
    title: 'Fine Dining',
    subtitle: 'Experience',
    description: 'Indulge in local and continental cuisine crafted by our world-class culinary team.',
    cta: 'Reserve a Table',
    href: '#restaurant',
    badge: 'Open Daily 6am – 11pm',
    accent: '#D4AF37',
  },
  {
    image: '/images/hero/hero/hero3.jpg',
    title: 'Weddings &',
    subtitle: 'Events',
    description: 'Create unforgettable memories in our lush garden venues and elegant event spaces.',
    cta: 'Plan Your Event',
    href: '#events',
    badge: 'Capacity up to 200 guests',
    accent: '#D4AF37',
  },
  {
    image: '/images/hero/hero/hero4.jpg',
    title: 'Conference',
    subtitle: 'Facilities',
    description: 'State-of-the-art meeting rooms equipped for corporate events and workshops.',
    cta: 'Book a Venue',
    href: '#conference',
    badge: 'AV Equipment Included',
    accent: '#D4AF37',
  },
  {
    image: '/images/hero/hero/hero5.jpg',
    title: 'Pool &',
    subtitle: 'Gardens',
    description: 'Relax in paradise by our pristine pool surrounded by lush tropical gardens.',
    cta: 'Discover Amenities',
    href: '#amenities',
    badge: 'Open 7am – 9pm',
    accent: '#D4AF37',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: 'easeIn' as const },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

interface HeroSectionProps {
  onBookNow?: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const [[current, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION = 6000;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prev]) => {
      const next = (prev + newDirection + heroSlides.length) % heroSlides.length;
      return [next, newDirection];
    });
    setProgress(0);
  }, []);

  const goTo = (index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (DURATION / 50), 100));
    }, 50);

    intervalRef.current = setTimeout(() => {
      paginate(1);
    }, DURATION);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, isPlaying, paginate]);

  const slide = heroSlides[current];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Animated grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={current}>
                {/* Badge */}
                <motion.div
                  custom={0}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <span className="h-px w-8 bg-gold-400" />
                  <span className="text-gold-400 text-sm tracking-[0.25em] uppercase font-medium">
                    {slide.badge}
                  </span>
                </motion.div>

                {/* Heading */}
                <div className="overflow-hidden mb-2">
                  <motion.h1
                    custom={0.1}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                  >
                    {slide.title}
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6">
                  <motion.h1
                    custom={0.2}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                    style={{ color: '#D4AF37' }}
                  >
                    {slide.subtitle}
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  custom={0.3}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white/80 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  custom={0.4}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-wrap gap-4"
                >
                  <a
                    href={slide.href}
                    className="group flex items-center gap-2 bg-gold-400 text-royal-900 px-7 py-4 rounded-md font-semibold text-base hover:bg-gold-500 transition-all duration-300 shadow-lg hover:shadow-gold-400/30 hover:shadow-2xl"
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    onClick={onBookNow}
                    className="flex items-center gap-2 border-2 border-white/50 text-white px-7 py-4 rounded-md font-semibold text-base hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Thumbnails — right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {heroSlides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative overflow-hidden rounded-lg transition-all duration-500 ${
              i === current
                ? 'w-20 h-14 ring-2 ring-gold-400 ring-offset-2 ring-offset-transparent'
                : 'w-16 h-11 opacity-50 hover:opacity-80'
            }`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            {i === current && (
              <div className="absolute bottom-0 left-0 h-0.5 bg-gold-400" style={{ width: `${progress}%`, transition: 'width 0.05s linear' }} />
            )}
          </button>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container-custom flex items-center justify-between">
          {/* Slide counter */}
          <div className="flex items-center gap-4">
            <span className="font-playfair text-4xl font-bold text-white/30">
              0{current + 1}
            </span>
            <div className="h-px w-12 bg-white/30" />
            <span className="text-sm text-white/50 tracking-wider">
              / 0{heroSlides.length}
            </span>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative group"
              >
                <span
                  className={`block rounded-full transition-all duration-400 ${
                    i === current
                      ? 'w-8 h-2 bg-gold-400'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Prev / Play / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar — top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
        <motion.div
          className="h-full bg-gold-400"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Hotel name — top center */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-24 left-0 right-0 flex justify-center pointer-events-none"
      >
        <div className="text-center">
          <p className="text-white/40 text-xs tracking-[0.5em] uppercase">
            THE GRAND ALTON RESORT
          </p>
          <p className="text-gold-400/60 text-[10px] tracking-[0.3em] uppercase mt-1">
            UNFORGETABLE EXPERIENCE
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
