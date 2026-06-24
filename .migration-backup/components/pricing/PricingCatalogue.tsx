'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingCart, Bed, UtensilsCrossed, Star, BedDouble } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  type Product,
  formatKES,
  groupProductsByCategory,
  MEAL_PLAN_LABELS,
  MEAL_PLAN_DESCRIPTIONS,
  CHILD_POLICY,
  EXTRA_ADULT_RATES,
} from '@/lib/pricing';
import { cn } from '@/lib/utils';

const MEAL_PLAN_ORDER = ['Bed & Breakfast', 'Half Board', 'Full Board'];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Standard Room': Bed,
  'Deluxe Room': BedDouble,
};

interface PricingCatalogueProps {
  products: Product[];
}

export default function PricingCatalogue({ products }: PricingCatalogueProps) {
  const { addItem, isInCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const grouped = groupProductsByCategory(products);

  const handleAdd = (product: Product) => {
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([category, categoryProducts], catIdx) => {
        const Icon = CATEGORY_ICONS[category] ?? Bed;
        // Group by room type (Single/Double) within the category
        const byType: Record<string, Product[]> = {};
        for (const p of categoryProducts) {
          const type = p.name.includes('Single') ? 'Single' : 'Double';
          if (!byType[type]) byType[type] = [];
          byType[type].push(p);
        }

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-royal-500 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-royal-500">{category}</h3>
                <p className="text-xs text-gray-400">Per room per night</p>
              </div>
            </div>

            {/* Room type tabs */}
            {Object.entries(byType).map(([roomType, typeProducts]) => (
              <div key={roomType} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-royal-50 text-royal-500 px-3 py-1 rounded-full text-sm font-medium">
                    {roomType} Room
                  </span>
                </div>

                {/* Meal plan cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {MEAL_PLAN_ORDER.map((plan, planIdx) => {
                    const product = typeProducts.find((p) => p.meal_plan === plan);
                    if (!product) return null;

                    const isHighlighted = plan === 'Half Board';
                    const inCart = isInCart(product.id);
                    const justAdded = addedId === product.id;

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: planIdx * 0.07 }}
                        className={cn(
                          'relative flex flex-col rounded-2xl border-2 p-5 transition-all duration-300',
                          isHighlighted
                            ? 'border-gold-400 bg-gradient-to-b from-royal-500 to-royal-600 text-white shadow-xl shadow-royal-500/20'
                            : 'border-gray-100 bg-white hover:border-royal-200 hover:shadow-md'
                        )}
                      >
                        {isHighlighted && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="bg-gold-400 text-royal-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-royal-900" />
                              Popular
                            </span>
                          </div>
                        )}

                        {/* Meal plan label */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={cn(
                              'text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest',
                              isHighlighted
                                ? 'bg-white/20 text-white'
                                : 'bg-royal-50 text-royal-500'
                            )}
                          >
                            {MEAL_PLAN_LABELS[plan] ?? plan}
                          </span>
                          <UtensilsCrossed
                            className={cn('w-4 h-4', isHighlighted ? 'text-gold-300' : 'text-gray-300')}
                          />
                        </div>

                        <p
                          className={cn(
                            'text-sm font-medium mb-1',
                            isHighlighted ? 'text-white' : 'text-gray-700'
                          )}
                        >
                          {plan}
                        </p>
                        <p
                          className={cn(
                            'text-xs mb-4 leading-relaxed',
                            isHighlighted ? 'text-white/70' : 'text-gray-400'
                          )}
                        >
                          {MEAL_PLAN_DESCRIPTIONS[plan]}
                        </p>

                        {/* Price */}
                        <div className="mt-auto">
                          <div className="flex items-baseline gap-1 mb-4">
                            <span
                              className={cn(
                                'font-playfair text-2xl font-bold',
                                isHighlighted ? 'text-gold-300' : 'text-royal-500'
                              )}
                            >
                              {formatKES(product.price)}
                            </span>
                            <span
                              className={cn(
                                'text-xs',
                                isHighlighted ? 'text-white/60' : 'text-gray-400'
                              )}
                            >
                              /night
                            </span>
                          </div>

                          <button
                            onClick={() => handleAdd(product)}
                            className={cn(
                              'w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200',
                              justAdded || inCart
                                ? 'bg-green-500 text-white'
                                : isHighlighted
                                  ? 'bg-gold-400 text-royal-900 hover:bg-gold-300'
                                  : 'bg-royal-500 text-white hover:bg-royal-600'
                            )}
                          >
                            {justAdded ? (
                              <>
                                <Check className="w-4 h-4" />
                                Added!
                              </>
                            ) : inCart ? (
                              <>
                                <Check className="w-4 h-4" />
                                In Cart
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        );
      })}

      {/* Policies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="font-semibold text-royal-500 mb-3 text-sm uppercase tracking-wide">Child Policy</h4>
          <ul className="space-y-2">
            {CHILD_POLICY.map((policy) => (
              <li key={policy} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-gold-400 mt-0.5 flex-shrink-0">•</span>
                {policy}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="font-semibold text-royal-500 mb-3 text-sm uppercase tracking-wide">Extra Adult Rates</h4>
          <div className="space-y-2">
            {Object.entries(EXTRA_ADULT_RATES).map(([plan, rate]) => (
              <div key={plan} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{plan}</span>
                <span className="font-semibold text-royal-500">{formatKES(rate)}/night</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* Day room check-out by 6:00 PM</p>
        </div>
      </motion.div>
    </div>
  );
}
