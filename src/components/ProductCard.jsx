import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import ProductVisual from './ProductVisual';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function add() {
    addItem(product.id);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }
  return <article className="product-card">
    <div className="product-image">
      {product.badge && <span className="badge">{product.badge}</span>}
      <ProductVisual {...product} />
    </div>
    <p className="product-category">{product.category}</p>
    <h3>{product.name}</h3>
    <p className="product-subtitle">{product.subtitle}</p>
    <div className="product-bottom"><strong>{formatPrice(product.price)}</strong><button className="add-button" onClick={add} aria-label={`Thêm ${product.name} vào giỏ`}><span aria-hidden="true">{added ? '✓' : '+'}</span></button></div>
    <span className="add-status" role="status">{added ? 'Đã thêm vào giỏ hàng' : ''}</span>
  </article>;
}
