import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  onClick?: () => void;
}

export default function WhatsAppButton({ onClick }: WhatsAppButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-royal-900 text-sm font-medium px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-white" />
      </span>
      <span className="absolute -top-1 -right-1 bg-gold-400 text-royal-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        1
      </span>
    </motion.button>
  );
}
