import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { type CartItem, type Product, cartTotal } from '@/lib/pricing';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product; nights?: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_NIGHTS'; productId: string; nights: number }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'LOAD'; items: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, nights?: number) => void;
  removeItem: (productId: string) => void;
  updateNights: (productId: string, nights: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const STORAGE_KEY = 'grand_alton_cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1, nights: action.nights ?? 1 }],
      };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.product.id !== action.productId) };
    case 'UPDATE_NIGHTS':
      return {
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, nights: Math.max(1, action.nights) } : i
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: Math.max(1, action.quantity) } : i
        ),
      };
    case 'CLEAR':
      return { items: [] };
    case 'LOAD':
      return { items: action.items };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) dispatch({ type: 'LOAD', items: parsed });
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback((product: Product, nights = 1) => {
    dispatch({ type: 'ADD', product, nights });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE', productId });
  }, []);

  const updateNights = useCallback((productId: string, nights: number) => {
    dispatch({ type: 'UPDATE_NIGHTS', productId, nights });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const isInCart = useCallback(
    (productId: string) => state.items.some(i => i.product.id === productId),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        count: state.items.reduce((s, i) => s + i.quantity, 0),
        total: cartTotal(state.items),
        addItem,
        removeItem,
        updateNights,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
