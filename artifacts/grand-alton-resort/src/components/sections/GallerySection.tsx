import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const categories = ['All', 'Rooms', 'Restaurant', 'Conference', 'Events', 'Gardens'];

const galleryImages = [
  { src: '/images/hero/hero/hero1.jpg', category: 'Rooms', title: 'Luxury Accommodation' },
  { src: '/images/hero/hero/hero2.jpg', category: 'Restaurant', title: 'Fine Dining Experience' },
  { src: '/images/hero/hero/hero3.jpg', category: 'Events', title: 'Wedding Venue' },
  { src: '/images/hero/hero/hero4.jpg', category: 'Conference', title: 'Conference Facilities' },
  { src: '/images/hero/hero/hero5.jpg', category: 'Gardens', title: 'Resort Gardens' },
  { src: '/images/dining/dining/din1.jpg', category: 'Restaurant', title: 'Restaurant Interior' },
  { src: '/images/dining/dining/din2.jpg', category: 'Restaurant', title: 'Gourmet Cuisine' },
  { src: '/images/dining/dining/din3.jpg', category: 'Restaurant', title: 'Bar & Lounge' },
  { src: '/images/conference/conference/con1.jpg', category: 'Conference', title: 'Main Conference Hall' },
  { src: '/images/conference/conference/con2.jpg', category: 'Conference', title: 'Meeting Room' },
  { src: '/images/conference/conference/con3.jpg', category: 'Conference', title: 'Seminar Room' },
  { src: '/images/others/others/IMG-20260618-WA0017.jpg', category: 'Gardens', title: 'Resort Grounds' },
  { src: '/images/others/others/IMG-20260618-WA0018.jpg', category: 'Rooms', title: 'Executive Suite' },
  { src: '/images/others/others/IMG-20260618-WA0020.jpg', category: 'Events', title: 'Event Setup' },
  { src: '/images/others/others/IMG-20260618-WA0022.jpg', category: 'Gardens', title: 'Poolside Area' },
  { src: '/images/others/others/IMG-20260618-WA0024.jpg', category: 'Rooms', title: 'Deluxe Room' },
  { src: '/images/others/others/IMG-20260618-WA0026.jpg', category: 'Events', title: 'Garden Events' },
  { src: '/images/others/others/IMG-20260618-WA0029.jpg', category: 'Gardens', title: 'Outdoor Space' },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, prev, next]);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-gold-400 text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Visual Tour</p>
          <h2 className="heading-lg">
            Our <span className="text-gold-400">Gallery</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Explore the elegance and beauty of The Grand Alton Resort.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-royal-500 text-white border-royal-500 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-royal-300 hover:text-royal-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid via CSS columns */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            columns: 'var(--gallery-cols)',
            columnGap: '12px',
          } as React.CSSProperties}
          className="[--gallery-cols:2] sm:[--gallery-cols:3] lg:[--gallery-cols:4]"
        >
          {filtered.map((image, index) => (
            <motion.div
              key={image.src + activeCategory + index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
              className="relative overflow-hidden rounded-xl cursor-pointer group bg-gray-200 mb-3"
              style={{ breakInside: 'avoid' }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white font-playfair text-sm font-semibold leading-tight">{image.title}</p>
                <span className="inline-block mt-1 w-fit bg-gold-400 text-royal-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {image.category}
                </span>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                <ZoomIn className="w-3.5 h-3.5 text-royal-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-gray-400 text-xs mt-4">
          {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && ` · ${activeCategory}`}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl flex flex-col items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filtered[lightboxIndex]?.src ?? ''}
                  alt={filtered[lightboxIndex]?.title ?? ''}
                  className="rounded-xl max-h-[72vh] w-auto max-w-full object-contain shadow-2xl"
                />
                <div className="text-center">
                  <p className="text-white font-playfair font-semibold text-base">
                    {filtered[lightboxIndex]?.title}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">
                    {filtered[lightboxIndex]?.category} &nbsp;&bull;&nbsp; {lightboxIndex + 1} / {filtered.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 overflow-x-auto px-4 pb-1">
              {filtered.map((img, idx) => (
                <button
                  key={img.src + idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden transition-all ${
                    idx === lightboxIndex
                      ? 'ring-2 ring-gold-400 opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
