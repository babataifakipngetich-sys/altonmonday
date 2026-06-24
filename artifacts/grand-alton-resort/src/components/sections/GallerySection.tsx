import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => { setCurrentIndex(index); setLightboxOpen(true); };
  const prev = () => setCurrentIndex(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setCurrentIndex(i => (i + 1) % filtered.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightboxOpen, filtered.length]);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Visual Tour</p>
          <h2 className="heading-lg">Our Gallery</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Take a visual tour of our beautiful resort and discover the elegance that awaits you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-royal-500 text-white shadow-lg shadow-royal-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-royal-50 hover:text-royal-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filtered.map((image, index) => (
            <div
              key={image.src + activeCategory + index}
              className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group bg-gray-100"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-royal-900/0 group-hover:bg-royal-900/55 transition-colors duration-300 flex items-end p-3">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-playfair text-sm font-semibold leading-tight">{image.title}</p>
                  <span className="inline-block mt-1 bg-gold-400 text-royal-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-400 text-sm mt-6"
        >
          Showing <span className="text-royal-500 font-semibold">{filtered.length}</span> images
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </motion.p>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-white/10 backdrop-blur-sm rounded-full p-2.5 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white bg-white/10 backdrop-blur-sm rounded-full p-2.5 transition-colors" aria-label="Previous">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white bg-white/10 backdrop-blur-sm rounded-full p-2.5 transition-colors" aria-label="Next">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full flex items-center justify-center" style={{ minHeight: '55vh' }}>
              <img
                src={filtered[currentIndex]?.src ?? ''}
                alt={filtered[currentIndex]?.title ?? ''}
                className="w-auto h-auto max-w-full rounded-lg"
                style={{ maxHeight: '65vh', objectFit: 'contain' }}
              />
            </div>
            <div className="text-center mt-3">
              <p className="text-white font-playfair text-base font-bold">{filtered[currentIndex]?.title}</p>
              <p className="text-white/50 text-xs mt-1">
                {filtered[currentIndex]?.category} &bull; {currentIndex + 1} / {filtered.length}
              </p>
            </div>
            <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-1">
              {filtered.map((img, idx) => (
                <button
                  key={img.src + idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden transition-all ${
                    idx === currentIndex ? 'ring-2 ring-gold-400 scale-110' : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
