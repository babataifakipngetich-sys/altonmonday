'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['All', 'Rooms', 'Restaurant', 'Conference', 'Events', 'Gardens'];

const galleryImages = [
  // Hero images (resort overview and rooms)
  { src: '/images/hero/hero/hero1.jpg', category: 'Rooms', title: 'Luxury Accommodation' },
  { src: '/images/hero/hero/hero2.jpg', category: 'Restaurant', title: 'Fine Dining Experience' },
  { src: '/images/hero/hero/hero3.jpg', category: 'Events', title: 'Wedding Venue' },
  { src: '/images/hero/hero/hero4.jpg', category: 'Conference', title: 'Conference Facilities' },
  { src: '/images/hero/hero/hero5.jpg', category: 'Gardens', title: 'Resort Gardens' },

  // Dining images
  { src: '/images/dining/dining/din1.jpg', category: 'Restaurant', title: 'Restaurant Interior' },
  { src: '/images/dining/dining/din2.jpg', category: 'Restaurant', title: 'Gourmet Cuisine' },
  { src: '/images/dining/dining/din3.jpg', category: 'Restaurant', title: 'Bar & Lounge' },

  // Conference images
  { src: '/images/conference/conference/con1.jpg', category: 'Conference', title: 'Main Conference Hall' },
  { src: '/images/conference/conference/con2.jpg', category: 'Conference', title: 'Meeting Room' },
  { src: '/images/conference/conference/con3.jpg', category: 'Conference', title: 'Seminar Room' },

  // Other resort images
  { src: '/images/others/others/IMG-20260618-WA0017.jpg', category: 'Gardens', title: 'Resort Grounds' },
  { src: '/images/others/others/IMG-20260618-WA0018.jpg', category: 'Rooms', title: 'Executive Suite' },
  { src: '/images/others/others/IMG-20260618-WA0020.jpg', category: 'Events', title: 'Event Setup' },
  { src: '/images/others/others/IMG-20260618-WA0022.jpg', category: 'Gardens', title: 'Poolside Area' },
  { src: '/images/others/others/IMG-20260618-WA0024.jpg', category: 'Rooms', title: 'Deluxe Room' },
  { src: '/images/others/others/IMG-20260618-WA0026.jpg', category: 'Events', title: 'Garden Events' },
  { src: '/images/others/others/IMG-20260618-WA0029.jpg', category: 'Gardens', title: 'Outdoor Space' },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Visual Tour</p>
          <h2 className="heading-lg">Our Gallery</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Take a visual tour of our beautiful resort and discover the elegance
            that awaits you at The Grand Alton Resort.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-royal-500 text-white shadow-lg shadow-royal-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-royal-100 hover:text-royal-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Responsive Grid - Uniform on mobile, varied on larger screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {filteredImages.map((image, index) => {
            // Create varied sizes for masonry effect - only on md+ screens
            const isLarge = index % 7 === 0;
            const isMedium = index % 5 === 2;

            return (
              <motion.div
                key={image.src + index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`
                  relative cursor-pointer overflow-hidden rounded-lg md:rounded-xl group
                  ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                  ${isMedium ? 'md:col-span-1 md:row-span-2' : ''}
                `}
                onClick={() => openLightbox(index)}
              >
                <div className={`relative w-full overflow-hidden ${
                  isLarge
                    ? 'aspect-square md:aspect-[4/3]'
                    : isMedium
                      ? 'aspect-[4/3] md:aspect-[3/4]'
                      : 'aspect-[4/3]'
                }`}>
                  {/* Skeleton loader */}
                  {!loadedImages.has(image.src) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}

                  {/* Next.js Image with priority for first few */}
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 6}
                    className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                      loadedImages.has(image.src) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(image.src)}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-royal-900/0 group-hover:bg-royal-900/60 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-3 md:px-4">
                      <p className="font-playfair text-sm md:text-base font-bold mb-1">{image.title}</p>
                      <p className="text-xs text-white/80">{image.category}</p>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-gold-400 text-royal-900 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Image count indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            Showing <span className="text-royal-500 font-semibold">{filteredImages.length}</span> images
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-3 right-3 md:top-6 md:right-6 z-10 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full p-2.5"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full p-2.5"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full p-2.5"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex items-center justify-center min-h-[50vh] md:min-h-[60vh]">
              <Image
                src={filteredImages[currentImageIndex]?.src || ''}
                alt={filteredImages[currentImageIndex]?.title || ''}
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg"
                priority
              />
            </div>

            {/* Image info */}
            <div className="text-center mt-4">
              <p className="text-white font-playfair text-lg font-bold">
                {filteredImages[currentImageIndex]?.title}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {filteredImages[currentImageIndex]?.category} • {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>

            {/* Thumbnail strip */}
            <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {filteredImages.map((img, idx) => (
                <button
                  key={img.src + idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden transition-all ${
                    idx === currentImageIndex
                      ? 'ring-2 ring-gold-400 scale-110'
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
