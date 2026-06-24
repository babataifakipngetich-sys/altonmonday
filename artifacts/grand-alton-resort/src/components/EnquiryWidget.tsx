import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, CheckCircle, ChevronDown, Phone, Clock } from 'lucide-react';

const WA_NUMBER = '254794000020';

type Step = 'idle' | 'open' | 'sent';

export default function EnquiryWidget() {
  const [step, setStep] = useState<Step>('idle');
  const [form, setForm] = useState({ name: '', phone: '', question: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.question.trim()) e.question = 'Please enter your question';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      `Hi, I have a quick enquiry from your website.`,
      ``,
      `*Name:* ${form.name.trim()}`,
      form.phone.trim() ? `*Phone:* ${form.phone.trim()}` : null,
      ``,
      `*Question:*`,
      form.question.trim(),
    ]
      .filter((l) => l !== null)
      .join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`, '_blank');
    setStep('sent');
  };

  const reset = () => {
    setForm({ name: '', phone: '', question: '' });
    setErrors({});
    setStep('idle');
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {step !== 'idle' && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="w-[310px] sm:w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-royal-500 to-royal-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-royal-500" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Grand Alton Support</p>
                  <p className="text-white/70 text-[11px] mt-0.5">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={reset}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === 'open' ? (
              <>
                {/* Chat bubble intro */}
                <div className="px-4 pt-4 pb-2">
                  <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2.5 inline-block max-w-[85%]">
                    <p className="text-gray-700 text-sm leading-snug">
                      👋 Hi there! Ask us anything — rooms, dining, events, or bookings.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 ml-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-[11px] text-gray-400">Reply within 1 hour</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSend} className="px-4 pb-4 space-y-2.5">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-400 transition-all ${
                        errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-400 transition-all"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Your question... *"
                      rows={3}
                      value={form.question}
                      onChange={(e) => setForm({ ...form, question: e.target.value })}
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-400 transition-all resize-none ${
                        errors.question ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.question && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.question}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    Send via WhatsApp
                  </button>

                  <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3" />
                    +254 794 000 020
                  </p>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="px-4 py-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp opened!</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your message is ready to send. We'll reply within the hour.
                  </p>
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={reset}
                    className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setStep('open')}
                    className="flex-1 bg-royal-500 text-white py-2 rounded-lg text-sm hover:bg-royal-600 transition-colors"
                  >
                    New Question
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setStep(step === 'idle' ? 'open' : 'idle')}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1.2, type: 'spring', damping: 18 }}
        className="flex items-center gap-2.5 bg-royal-500 hover:bg-royal-600 text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg transition-colors"
        aria-label="Open enquiry chat"
      >
        {step !== 'idle' ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <>
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border border-royal-500" />
            </div>
            <span className="text-sm font-semibold">Quick Enquiry</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
