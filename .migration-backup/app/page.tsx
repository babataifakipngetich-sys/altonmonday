'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import WhatsAppButton from '../components/WhatsAppButton';
import WhatsAppDialog from '../components/WhatsAppDialog';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import RoomsSection from '../components/sections/RoomsSection';
import RestaurantSection from '../components/sections/RestaurantSection';
import ConferenceSection from '../components/sections/ConferenceSection';
import EventsSection from '../components/sections/EventsSection';
import GallerySection from '../components/sections/GallerySection';
import AmenitiesSection from '../components/sections/AmenitiesSection';
import ActivitiesSection from '../components/sections/ActivitiesSection';
import SpecialOffersSection from '../components/sections/SpecialOffersSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import MapSection from '../components/sections/MapSection';
import ContactSection from '../components/sections/ContactSection';
import FooterSection from '../components/sections/FooterSection';

export default function Home() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState<'general' | 'booking'>('general');

  const handleOpenWhatsApp = (context: 'general' | 'booking' = 'general') => {
    setDialogContext(context);
    setIsWhatsAppOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navigation onBookNow={() => handleOpenWhatsApp('booking')} />
      <WhatsAppButton onClick={() => handleOpenWhatsApp('general')} />
      <WhatsAppDialog
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        context={dialogContext}
      />
      <HeroSection onBookNow={() => handleOpenWhatsApp('booking')} />
      <AboutSection />
      <RoomsSection onBookNow={() => handleOpenWhatsApp('booking')} />
      <RestaurantSection onReserveTable={() => handleOpenWhatsApp('booking')} />
      <ConferenceSection onBookNow={() => handleOpenWhatsApp('booking')} />
      <EventsSection onPlanEvent={() => handleOpenWhatsApp('booking')} />
      <GallerySection />
      <AmenitiesSection />
      <ActivitiesSection />
      <SpecialOffersSection onBookOffer={() => handleOpenWhatsApp('booking')} />
      <TestimonialsSection />
      <MapSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
