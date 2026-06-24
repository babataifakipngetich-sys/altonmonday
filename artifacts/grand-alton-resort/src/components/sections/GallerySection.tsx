import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Plus } from 'lucide-react';

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

const PAGE_SIZE = 9;

function GalleryCard({
  image,
  onClick,
  visible,
}: {
  image: (typeof galleryImages)[0];
  onClick: () => void;
  visible: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl cursor-pointer group bg-gray-100 w-full transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ breakInside: 'avoid', marginBottom: '12px' }}
      onClick={onClick}
    >
      <img
        src={image.src}
        alt={image.title}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="text-white font-playfair text-sm font-semibold leading-tight">{image.title}</p>
        <span className="inline-block mt-1 w-fit text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400 text-royal-900">
          {image.category}
        </span>
      </div>
      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow hidden group-hover:flex items-center justify-center">
        <ZoomIn className="w-3.5 h-3.5 text-royal-500" />
      </div>
    </div>
  );
}

function MasonryGrid({
  items,
  cols,
  onClickItem,
  visible,
}: {
  items: typeof galleryImages;
  cols: number;
  onClickItem: (i: number) => void;
  visible: boolean;
}) {
  const columns: (typeof galleryImages)[] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => columns[i % cols].push(item));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '12px',
        alignItems: 'start',
      }}
    >
      {columns.map((col, ci) => (
        <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {col.map((image) => {
            const flatIndex = items.indexOf(image);
            return (
              <GalleryCard
                key={image.src}
                image={image}
                onClick={() => onClickItem(flatIndex)}
                visible={visible}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' });

  const filtered =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const displayed = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisible(PAGE_SIZE);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
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
    <section id="gallery" ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-royal-500 text-white border-royal-500 shadow-md'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-royal-400 hover:text-royal-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid — single component, CSS breakpoints via inline style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + visible}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Mobile: 2 cols */}
            <div className="sm:hidden">
              <MasonryGrid items={displayed} cols={2} onClickItem={setLightboxIndex} visible={inView} />
            </div>
            {/* Tablet: 3 cols */}
            <div className="hidden sm:block lg:hidden">
              <MasonryGrid items={displayed} cols={3} onClickItem={setLightboxIndex} visible={inView} />
            </div>
            {/* Desktop: 4 cols */}
            <div className="hidden lg:block">
              <MasonryGrid items={displayed} cols={4} onClickItem={setLightboxIndex} visible={inView} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Count + Load More */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <p className="text-gray-400 text-xs">
            Showing{' '}
            <span className="text-royal-500 font-semibold">{displayed.length}</span> of{' '}
            <span className="text-royal-500 font-semibold">{filtered.length}</span> photos
            {activeCategory !== 'All' && ` · ${activeCategory}`}
          </p>

          {hasMore && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-royal-500 text-royal-500 rounded-full text-sm font-semibold hover:bg-royal-500 hover:text-white transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Load More Photos
            </motion.button>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="w-full max-w-3xl flex flex-col items-center gap-3 pb-16"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filtered[lightboxIndex]?.src ?? ''}
                  alt={filtered[lightboxIndex]?.title ?? ''}
                  className="rounded-xl max-h-[68vh] w-auto max-w-full object-contain shadow-2xl"
                />
                <div className="text-center">
                  <p className="text-white font-playfair font-semibold text-base">
                    {filtered[lightboxIndex]?.title}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">
                    {filtered[lightboxIndex]?.category} &nbsp;·&nbsp; {lightboxIndex + 1} / {filtered.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail strip */}
            <div
              className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 overflow-x-auto px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {filtered.map((img, idx) => (
                <button
                  key={img.src + idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden transition-all ${
                    idx === lightboxIndex
                      ? 'ring-2 ring-gold-400 opacity-100 scale-110'
                      : 'opacity-35 hover:opacity-70'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
