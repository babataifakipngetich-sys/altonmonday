import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import RoomsSection from '@/components/sections/RoomsSection';
import RestaurantSection from '@/components/sections/RestaurantSection';
import ConferenceSection from '@/components/sections/ConferenceSection';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import ActivitiesSection from '@/components/sections/ActivitiesSection';
import SpecialOffersSection from '@/components/sections/SpecialOffersSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import MapSection from '@/components/sections/MapSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import WhatsAppDialog from '@/components/WhatsAppDialog';

export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState<'general' | 'booking'>('general');

  const openBooking = () => {
    setDialogContext('booking');
    setDialogOpen(true);
  };

  const openGeneral = () => {
    setDialogContext('general');
    setDialogOpen(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen font-inter">
        <Navigation onBookNow={openBooking} />
        <HeroSection onBookNow={openBooking} />
        <AboutSection />
        <RoomsSection onBookNow={openBooking} />
        <RestaurantSection onReserveTable={openBooking} />
        <ConferenceSection onBookNow={openBooking} />
        <EventsSection onPlanEvent={openBooking} />
        <GallerySection />
        <AmenitiesSection />
        <ActivitiesSection />
        <SpecialOffersSection onBookOffer={openBooking} />
        <TestimonialsSection />
        <MapSection />
        <ContactSection />
        <FooterSection />
        <WhatsAppButton onClick={openGeneral} />
        <WhatsAppDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          context={dialogContext}
        />
      </div>
    </CartProvider>
  );
}
