import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    image: '/images/hero/hero/hero1.jpg',
    title: 'Elegant Rooms',
    subtitle: '& Suites',
    description: 'Drift into luxury in our exquisitely designed rooms with panoramic views of Kisumu.',
    cta: 'Explore Rooms',
    href: '#rooms',
    badge: 'From KES 4,500 / Night',
  },
  {
    image: '/images/hero/hero/hero2.jpg',
    title: 'Fine Dining',
    subtitle: 'Experience',
    description: 'Indulge in local and continental cuisine crafted by our world-class culinary team.',
    cta: 'Reserve a Table',
    href: '#restaurant',
    badge: 'Open 24 Hours',
  },
  {
    image: '/images/hero/hero/hero3.jpg',
    title: 'Weddings &',
    subtitle: 'Events',
    description: 'Create unforgettable memories in our lush garden venues and elegant event spaces.',
    cta: 'Plan Your Event',
    href: '#events',
    badge: 'Up to 200 Guests',
  },
  {
    image: '/images/hero/hero/hero4.jpg',
    title: 'Conference',
    subtitle: 'Facilities',
    description: 'State-of-the-art meeting rooms fully equipped for corporate events and workshops.',
    cta: 'Book a Venue',
    href: '#conference',
    badge: 'Full AV & Catering',
  },
  {
    image: '/images/hero/hero/hero5.jpg',
    title: 'Pool &',
    subtitle: 'Gardens',
    description: 'Relax in paradise by our pristine pool surrounded by lush tropical gardens.',
    cta: 'Discover Amenities',
    href: '#amenities',
    badge: 'Pool · Gardens · Gym',
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
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
      if (intervalRef.current) clearTimeout(intervalRef.current);
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
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* ── Branded header bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="absolute top-0 left-0 right-0 flex justify-center pt-[72px] pointer-events-none z-10"
      >
        <div className="flex flex-col items-center gap-1 px-6 py-3 bg-black/30 backdrop-blur-sm border-b border-white/10 w-full">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-gold-400/70" />
            <p className="text-white text-[9px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.45em] uppercase font-semibold">
              The Grand Alton Resort
            </p>
            <span className="h-px w-8 sm:w-12 bg-gold-400/70" />
          </div>
          <p className="text-gold-400 text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] uppercase font-medium">
            Kisumu&apos;s Premier Hospitality Destination
          </p>
        </div>
      </motion.div>

      {/* ── Main slide content ── */}
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
                  className="inline-flex items-center gap-2 mb-4 sm:mb-6"
                >
                  <span className="h-px w-6 sm:w-8 bg-gold-400" />
                  <span className="text-gold-400 text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium">
                    {slide.badge}
                  </span>
                </motion.div>

                {/* Title */}
                <div className="overflow-hidden mb-1 sm:mb-2">
                  <motion.h1
                    custom={0.1}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-playfair text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                  >
                    {slide.title}
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-4 sm:mb-6">
                  <motion.h1
                    custom={0.2}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-playfair text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gold-400 leading-tight"
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
                  className="text-white/80 text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-sm md:max-w-xl mb-6 sm:mb-8 leading-relaxed"
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
                  className="flex flex-wrap gap-2 sm:gap-4"
                >
                  <a
                    href={slide.href}
                    className="group flex items-center gap-2 bg-gold-400 text-royal-900 px-4 sm:px-7 py-3 sm:py-4 rounded-md font-semibold text-xs sm:text-base hover:bg-gold-500 transition-all duration-300 shadow-lg"
                  >
                    {slide.cta}
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    onClick={onBookNow}
                    className="flex items-center gap-2 border-2 border-white/50 text-white px-4 sm:px-7 py-3 sm:py-4 rounded-md font-semibold text-xs sm:text-base hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    Book Now
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Slide Thumbnails (desktop) ── */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 sm:gap-3">
        {heroSlides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative overflow-hidden rounded-lg transition-all duration-500 ${
              i === current
                ? 'w-16 sm:w-20 h-10 sm:h-14 ring-2 ring-gold-400 ring-offset-2 ring-offset-transparent'
                : 'w-12 sm:w-16 h-8 sm:h-11 opacity-50 hover:opacity-80'
            }`}
          >
            <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
            {i === current && (
              <div className="absolute bottom-0 left-0 h-0.5 bg-gold-400" style={{ width: `${progress}%`, transition: 'width 0.05s linear' }} />
            )}
          </button>
        ))}
      </div>

      {/* ── Bottom Controls ── */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="font-playfair text-2xl sm:text-4xl font-bold text-white/30">
              0{current + 1}
            </span>
            <div className="h-px w-8 sm:w-12 bg-white/30" />
            <span className="text-xs sm:text-sm text-white/50 tracking-wider">
              / 0{heroSlides.length}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}>
                <span
                  className={`block rounded-full transition-all duration-400 ${
                    i === current
                      ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-gold-400'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => paginate(-1)}
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
        <div className="h-full bg-gold-400" style={{ width: `${progress}%`, transition: 'width 0.05s linear' }} />
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-20 sm:bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
        <span className="text-[10px] hidden sm:block tracking-widest uppercase">Scroll</span>
      </motion.a>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
