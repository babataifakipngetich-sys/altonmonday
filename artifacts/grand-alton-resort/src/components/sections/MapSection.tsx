import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Navigation, Phone, MessageCircle } from 'lucide-react';

export default function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative h-96 md:h-[500px] w-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7665096478897!2d34.72345678901234!3d-0.12345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDcnMjQuNCJTIDM0wrA0Myc0NC40IkU!5e0!3m2!1sen!2ske!4v1234567890123"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-sm"
      >
        <h3 className="font-playfair text-xl font-bold text-royal-500 mb-4">
          The Grand Alton Resort
        </h3>
        <p className="text-gray-600 text-sm mb-6 flex items-start gap-2">
          <MapPin className="w-5 h-5 text-royal-500 flex-shrink-0 mt-0.5" />
          <span>Otonglo, behind Kodiaga Prison, Kisumu, Kenya</span>
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="https://maps.app.goo.gl/xTB5WaNuvTjJ3CVh7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-royal-500 text-white px-4 py-3 rounded-md hover:bg-royal-600 transition-colors"
          >
            <Navigation className="w-5 h-5" />
            <span className="font-medium">Get Directions</span>
          </a>
          <a
            href="tel:+254794000020"
            className="flex items-center gap-3 border border-royal-500 text-royal-500 px-4 py-3 rounded-md hover:bg-royal-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">Call Us</span>
          </a>
          <a
            href="https://wa.me/254794000020"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
