import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

interface WhatsAppDialogProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

export default function WhatsAppDialog({ isOpen, onClose, context = 'general' }: WhatsAppDialogProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isEmailMode, setIsEmailMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMessage = `Hello, I'm ${formData.name}.%0A%0A${formData.message}%0A%0APhone: ${formData.phone}`;
    window.open(`https://wa.me/254794000020?text=${fullMessage}`, '_blank');
    onClose();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:thegrandaltonresort@gmail.com?subject=${subject}&body=${body}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold">Contact Us</h3>
                    <p className="text-white/80 text-sm">We typically reply within minutes</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-b">
                <div className="flex bg-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setIsEmailMode(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                      !isEmailMode ? 'bg-green-500 text-white shadow' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setIsEmailMode(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                      isEmailMode ? 'bg-royal-500 text-white shadow' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3 bg-gray-50 border-b">
                {!isEmailMode ? (
                  <a
                    href="https://wa.me/254794000020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">+254 794 000 020</p>
                      <p className="text-sm text-gray-500">Tap to open WhatsApp directly</p>
                    </div>
                  </a>
                ) : (
                  <a
                    href="mailto:thegrandaltonresort@gmail.com"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-royal-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-royal-100 rounded-full flex items-center justify-center group-hover:bg-royal-200 transition-colors">
                      <Mail className="w-5 h-5 text-royal-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">thegrandaltonresort@gmail.com</p>
                      <p className="text-sm text-gray-500">Tap to open your email app</p>
                    </div>
                  </a>
                )}
              </div>

              <form onSubmit={isEmailMode ? handleEmailSubmit : handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {context === 'booking' ? 'Booking Details' : 'Your Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder={context === 'booking' ? 'Tell us your check-in date, room preference, and any special requests...' : 'How can we help you?'}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 text-white transition-all ${
                    isEmailMode ? 'bg-royal-500 hover:bg-royal-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  {isEmailMode ? 'Send Email' : 'Send via WhatsApp'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
