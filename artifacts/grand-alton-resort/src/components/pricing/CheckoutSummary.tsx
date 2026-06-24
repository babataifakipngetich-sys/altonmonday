import { ArrowLeft, MessageCircle, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatKES, MEAL_PLAN_DESCRIPTIONS } from '@/lib/pricing';
import { Button } from '@/components/ui/button';

interface CheckoutSummaryProps {
  onBack: () => void;
}

export default function CheckoutSummary({ onBack }: CheckoutSummaryProps) {
  const { items, total, clearCart } = useCart();

  const whatsappMessage = () => {
    const lines = [
      'Hello, I would like to make a booking at The Grand Alton Resort.',
      '',
      '*Booking Summary:*',
      ...items.map(
        (item) =>
          `• ${item.product.name} (${item.product.meal_plan}) — ${item.quantity} room${item.quantity > 1 ? 's' : ''} × ${item.nights} night${item.nights > 1 ? 's' : ''} = ${formatKES(item.product.price * item.quantity * item.nights)}`
      ),
      '',
      `*Total: ${formatKES(total)}*`,
      '',
      'Please confirm availability and check-in/out dates.',
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/254794000020?text=${whatsappMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-royal-500 transition-colors"
          aria-label="Back to cart"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="font-playfair text-lg font-bold text-royal-500">Booking Summary</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="border border-gray-100 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-royal-500 text-sm">{item.product.name}</p>
                  <p className="text-xs text-gold-600 font-medium">{item.product.meal_plan}</p>
                </div>
                <p className="font-bold text-royal-500 text-sm">{formatKES(item.product.price * item.quantity * item.nights)}</p>
              </div>
              {item.product.description && (
                <p className="text-xs text-gray-400 mb-2">{item.product.description}</p>
              )}
              <div className="text-xs text-gray-500 space-y-0.5">
                <p>{MEAL_PLAN_DESCRIPTIONS[item.product.meal_plan] ?? item.product.meal_plan}</p>
                <div className="flex gap-4 pt-1 border-t border-gray-50">
                  <span>{item.quantity} room{item.quantity > 1 ? 's' : ''}</span>
                  <span>×</span>
                  <span>{item.nights} night{item.nights > 1 ? 's' : ''}</span>
                  <span>×</span>
                  <span>{formatKES(item.product.price)}/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-royal-50 rounded-xl">
          <p className="text-xs font-semibold text-royal-500 mb-2 uppercase tracking-wide">Policies</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Day room check-out by 6:00 PM</li>
            <li>• Children under 5 sharing a bed: free; own bed: KES 1,500</li>
            <li>• Children 5–12 years: half the adult rate</li>
            <li>• Extra adult: KES 1,500 (BB) / KES 3,000 (HB) / KES 4,500 (FB)</li>
          </ul>
        </div>
      </div>

      <div className="px-6 py-4 border-t bg-white space-y-3">
        <div className="flex justify-between items-center py-2 border-t border-gray-100">
          <p className="font-semibold text-gray-700">Total Estimate</p>
          <p className="font-playfair text-2xl font-bold text-royal-500">{formatKES(total)}</p>
        </div>
        <Button
          onClick={handleWhatsApp}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Confirm via WhatsApp
        </Button>
        <button
          onClick={clearCart}
          className="w-full text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center justify-center gap-1 py-1"
        >
          <Trash2 className="w-3 h-3" />
          Clear all items
        </button>
        <p className="text-center text-xs text-gray-400">
          Prices are in KES and subject to availability. Final confirmation via WhatsApp or phone.
        </p>
      </div>
    </div>
  );
}
