import { Route, Routes } from 'react-router';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export default function App() {
  return <CartProvider><Routes><Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="products" element={<Products />} />
    <Route path="about-us" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="cart" element={<Cart />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></CartProvider>;
}
