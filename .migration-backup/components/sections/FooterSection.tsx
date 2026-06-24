'use client';

import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Rooms & Suites', href: '#rooms' },
  { name: 'Restaurant', href: '#restaurant' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  { name: 'Conference Facilities', href: '#conference' },
  { name: 'Events & Weddings', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Activities', href: '#activities' },
  { name: 'Special Offers', href: '#offers' },
];

export default function FooterSection() {
  return (
    <footer className="bg-royal-900 text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">
              THE GRAND ALTON RESORT
            </h3>
            <p className="text-white/70 mb-4">
              A premier hospitality destination in Kisumu, Kenya. Experience luxury,
              comfort, and personalized service.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-400 hover:text-royal-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-400 hover:text-royal-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-400 hover:text-royal-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-4 text-gold-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-4 text-gold-400">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-gold-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-4 text-gold-400">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Otonglo, behind Kodiaga Prison, Kisumu, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <a href="tel:+254794000020" className="text-white/70 hover:text-gold-400 transition-colors">
                  +254 794 000 020
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <a href="mailto:thegrandaltonresort@gmail.com" className="text-white/70 hover:text-gold-400 transition-colors">
                  thegrandaltonresort@gmail.com
                </a>
              </li>
            </ul>

            {/* Mini Map */}
            <div className="mt-4 h-24 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7665096478897!2d34.72345678901234!3d-0.12345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDcnMjQuNCJTIDM0wrA0Myc0NC40IkU!5e0!3m2!1sen!2ske!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white/60 text-sm mb-2">Accepted Payment Methods</p>
              <div className="flex items-center gap-6">
                {/* M-Pesa Logo */}
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
                  <svg
                    width="60"
                    height="28"
                    viewBox="0 0 60 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="60" height="28" rx="4" fill="#00A651"/>
                    <text x="30" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">M-PESA</text>
                  </svg>
                </div>

                {/* Mastercard Logo */}
                <div className="flex items-center">
                  <svg
                    width="48"
                    height="32"
                    viewBox="0 0 48 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                    <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                    <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                    <path
                      d="M24 8.5C26.4 10.2 28 13 28 16C28 19 26.4 21.8 24 23.5C21.6 21.8 20 19 20 16C20 13 21.6 10.2 24 8.5Z"
                      fill="#FF5F00"
                    />
                  </svg>
                </div>

                <span className="text-white/40 text-sm">and more</span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gold-400 font-medium">Secure Payments</p>
              <p className="text-white/50 text-xs">All transactions are encrypted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom text-center text-white/60 text-sm">
          <p>&copy; 2026 THE GRAND ALTON RESORT. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
