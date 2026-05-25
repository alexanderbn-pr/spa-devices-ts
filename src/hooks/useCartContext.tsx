import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { EXPIRATION, CART_KEY } from '../constants';
import type { CartContextValue } from '../types/cart.types';

const CartContext = createContext<CartContextValue | null>(null);

function getInitialCartCount(): number {
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return 0;
  try {
    const { value, timestamp } = JSON.parse(stored);
    if (Date.now() - timestamp > EXPIRATION) {
      localStorage.removeItem(CART_KEY);
      return 0;
    }
    return parseInt(value, 10);
  } catch {
    localStorage.removeItem(CART_KEY);
    return 0;
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItemsCount, setCartItemsCount] = useState(getInitialCartCount);

  useEffect(() => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify({ value: cartItemsCount, timestamp: Date.now() }),
    );
  }, [cartItemsCount]);

  return (
    <CartContext.Provider value={{ cartItemsCount, setCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
