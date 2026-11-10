import { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'mtshop-cart-v1';

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    const seen = new Set();
    return saved.filter((item) => {
      if (!item || !products.some((p) => p.id === item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  } catch { return []; }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* Giỏ vẫn hoạt động khi trình duyệt chặn lưu trữ. */ }
  }, [cart]);
  const addItem = (id) => setCart((current) => {
    const found = current.find((item) => item.id === id);
    return found ? current.map((item) => item.id === id ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item) : [...current, { id, quantity: 1 }];
  });
  const updateQuantity = (id, quantity) => setCart((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity: Math.min(99, quantity) } : item));
  return <CartContext.Provider value={{ cart, addItem, updateQuantity, count: cart.reduce((sum, item) => sum + item.quantity, 0) }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
