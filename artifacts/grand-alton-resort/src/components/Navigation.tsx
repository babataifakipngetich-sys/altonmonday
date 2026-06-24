import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import CartSheet from '@/components/pricing/CartSheet';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Rooms & Suites', href: '#rooms' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Restaurant', href: '#restaurant' },
  { name: 'Conference', href: '#conference' },
  { name: 'Events', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Activities', href: '#activities' },
  { name: 'Special Offers', href: '#offers' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onBookNow?: () => void;
}

export default function Navigation({ onBookNow }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-royal-500 shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="font-playfair text-xl md:text-2xl font-bold text-white">
              THE GRAND ALTON RESORT
            </div>
          </a>

          <div className="hidden xl:flex items-center gap-6">
            {navLinks.slice(0, 6).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-gold-400 text-white"
              >
                {link.name}
              </a>
            ))}

            <div className="relative group">
              <button className="text-sm font-medium transition-colors hover:text-gold-400 text-white">
                More
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {navLinks.slice(6).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-50 hover:text-royal-500 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <CartSheet />

            <button
              onClick={onBookNow}
              className="flex items-center gap-2 bg-gold-400 text-royal-900 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gold-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Book Now
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-royal-500 shadow-lg"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-white hover:text-gold-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-3 mt-4">
                <CartSheet />
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookNow?.();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gold-400 text-royal-900 px-4 py-3 rounded-md font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
