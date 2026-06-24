import { ShoppingCart, Trash2, Plus, Minus, Hotel } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatKES } from '@/lib/pricing';
import { useState } from 'react';
import CheckoutSummary from './CheckoutSummary';

export default function CartSheet() {
  const { items, count, total, removeItem, updateNights, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative inline-flex items-center gap-2 bg-gold-400 text-royal-900 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gold-500 transition-colors">
          <ShoppingCart className="w-4 h-4" />
          <span>Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-royal-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 font-playfair text-royal-500">
            <ShoppingCart className="w-5 h-5" />
            Your Booking Cart
            {count > 0 && (
              <span className="text-sm font-normal text-gray-500">({count} item{count !== 1 ? 's' : ''})</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {showCheckout ? (
          <CheckoutSummary onBack={() => setShowCheckout(false)} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <Hotel className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="font-playfair text-lg text-gray-400 mb-1">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Browse our room rates and add rooms to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-royal-500 text-sm leading-tight">{item.product.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.product.meal_plan}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors ml-3 flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Nights</p>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateNights(item.product.id, item.nights - 1)}
                              disabled={item.nights <= 1}
                              className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{item.nights}</span>
                            <button
                              onClick={() => updateNights(item.product.id, item.nights + 1)}
                              className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Rooms</p>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-xs text-gray-400">
                          {formatKES(item.product.price)} × {item.quantity} room{item.quantity > 1 ? 's' : ''} × {item.nights} night{item.nights > 1 ? 's' : ''}
                        </p>
                        <p className="font-bold text-royal-500 text-sm">
                          {formatKES(item.product.price * item.quantity * item.nights)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 border-t bg-white">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-500 text-sm">Estimated Total</p>
                  <p className="font-playfair text-xl font-bold text-royal-500">{formatKES(total)}</p>
                </div>
                <Button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-royal-500 hover:bg-royal-600 text-white font-semibold"
                >
                  Review Booking
                </Button>
                <p className="text-center text-xs text-gray-400 mt-2">Prices in Kenyan Shillings (KES) per night</p>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
