import React, { createContext, useContext, useState, useEffect } from 'react';
import { EXPIRATION, CART_KEY } from '../constants';
const CartContext = createContext();

function getInitialCartCount() {
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

export const CartProvider = ({ children }) => {
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

export const useCartContext = () => useContext(CartContext);
