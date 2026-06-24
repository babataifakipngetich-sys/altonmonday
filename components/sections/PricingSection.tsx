'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { type Product, ProductSchema, STATIC_PRODUCTS } from '@/lib/pricing';
import PricingCatalogue from '@/components/pricing/PricingCatalogue';
import CartSheet from '@/components/pricing/CartSheet';
import { useCart } from '@/context/CartContext';
import { formatKES } from '@/lib/pricing';
import { Loader as Loader2, ShoppingCart } from 'lucide-react';

async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category')
    .order('name')
    .order('price');

  if (error || !data) return [];

  const validated = data
    .map((row) => {
      const result = ProductSchema.safeParse({ ...row, price: Number(row.price) });
      return result.success ? result.data : null;
    })
    .filter((p): p is Product => p !== null);

  return validated;
}

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { count, total } = useCart();

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (data.length > 0) {
          setProducts(data);
        } else {
          // Fallback: use static data with generated IDs
          const fallback = STATIC_PRODUCTS.map((p, i) => ({
            ...p,
            id: `static-${i}`,
            created_at: new Date().toISOString(),
          }));
          setProducts(fallback);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Transparent Pricing</p>
          <h2 className="heading-lg">Room Rates</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Choose from our range of comfortable rooms with flexible meal plans. All rates are per room per night in Kenyan Shillings.
          </p>
        </motion.div>

        {/* Sticky cart bar */}
        {count > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-16 z-30 mb-8 bg-white border border-royal-100 rounded-xl shadow-lg px-5 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-royal-500" />
              <div>
                <p className="text-sm font-semibold text-royal-500">
                  {count} item{count !== 1 ? 's' : ''} in cart
                </p>
                <p className="text-xs text-gray-500">Estimated total: {formatKES(total)}</p>
              </div>
            </div>
            <CartSheet />
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-royal-500 animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PricingCatalogue products={products} />
          </motion.div>
        )}

        {/* Bottom CTA */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3">
              <CartSheet />
              <a
                href="tel:+254794000020"
                className="px-6 py-2.5 border-2 border-royal-500 text-royal-500 rounded-md font-semibold text-sm hover:bg-royal-500 hover:text-white transition-colors"
              >
                Call to Book
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Tel: +254 794 000 020 &nbsp;|&nbsp; Email: thegrandaltonresort@gmail.com
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
