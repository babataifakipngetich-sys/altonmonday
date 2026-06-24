import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  meal_plan: z.string(),
  price: z.number().positive(),
  description: z.string().nullable().optional(),
  created_at: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive(),
  nights: z.number().int().positive().default(1),
});

export type CartItem = z.infer<typeof CartItemSchema>;

export const MEAL_PLAN_LABELS: Record<string, string> = {
  'Bed & Breakfast': 'BB',
  'Half Board': 'HB',
  'Full Board': 'FB',
};

export const MEAL_PLAN_DESCRIPTIONS: Record<string, string> = {
  'Bed & Breakfast': 'Accommodation + breakfast daily',
  'Half Board': 'Accommodation + breakfast & dinner daily',
  'Full Board': 'Accommodation + all meals daily',
};

export const CHILD_POLICY = [
  'Children under 5 sharing a bed with an adult stay free; own bed costs KES 1,500.',
  'Children aged 5–12 pay half the adult rate.',
  'Children above 12 years pay the full adult rate.',
];

export const EXTRA_ADULT_RATES: Record<string, number> = {
  'Bed & Breakfast': 1500,
  'Half Board': 3000,
  'Full Board': 4500,
};

export const STATIC_PRODUCTS: Product[] = [
  { id: 'static-0', name: 'Standard Room Single', category: 'Standard Room', meal_plan: 'Bed & Breakfast', price: 4500, description: 'Comfortable single room with breakfast included.' },
  { id: 'static-1', name: 'Standard Room Single', category: 'Standard Room', meal_plan: 'Half Board', price: 6000, description: 'Comfortable single room with breakfast and dinner included.' },
  { id: 'static-2', name: 'Standard Room Single', category: 'Standard Room', meal_plan: 'Full Board', price: 7000, description: 'Comfortable single room with all meals included.' },
  { id: 'static-3', name: 'Standard Room Double', category: 'Standard Room', meal_plan: 'Bed & Breakfast', price: 5500, description: 'Comfortable double room with breakfast included.' },
  { id: 'static-4', name: 'Standard Room Double', category: 'Standard Room', meal_plan: 'Half Board', price: 7500, description: 'Comfortable double room with breakfast and dinner included.' },
  { id: 'static-5', name: 'Standard Room Double', category: 'Standard Room', meal_plan: 'Full Board', price: 9000, description: 'Comfortable double room with all meals included.' },
  { id: 'static-6', name: 'Deluxe Room Single', category: 'Deluxe Room', meal_plan: 'Bed & Breakfast', price: 5000, description: 'Premium single room with breakfast included.' },
  { id: 'static-7', name: 'Deluxe Room Single', category: 'Deluxe Room', meal_plan: 'Half Board', price: 6500, description: 'Premium single room with breakfast and dinner included.' },
  { id: 'static-8', name: 'Deluxe Room Single', category: 'Deluxe Room', meal_plan: 'Full Board', price: 7500, description: 'Premium single room with all meals included.' },
  { id: 'static-9', name: 'Deluxe Room Double', category: 'Deluxe Room', meal_plan: 'Bed & Breakfast', price: 6000, description: 'Premium double room with breakfast included.' },
  { id: 'static-10', name: 'Deluxe Room Double', category: 'Deluxe Room', meal_plan: 'Half Board', price: 8000, description: 'Premium double room with breakfast and dinner included.' },
  { id: 'static-11', name: 'Deluxe Room Double', category: 'Deluxe Room', meal_plan: 'Full Board', price: 10000, description: 'Premium double room with all meals included.' },
];

export function formatKES(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function groupProductsByCategory(products: Product[]): Record<string, Product[]> {
  return products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity * item.nights, 0);
}
