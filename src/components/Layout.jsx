import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';

const links = [
  ['/', 'Trang chủ'],
  ['/products', 'Sản phẩm'],
  ['/about-us', 'Về MTShop'],
  ['/contact', 'Liên hệ'],
];

const titles = {
  '/': 'Chăm sóc bản thân mỗi ngày',
  '/products': 'Sản phẩm',
  '/about-us': 'Về MTShop',
  '/contact': 'Liên hệ',
  '/cart': 'Giỏ hàng',
};

export default function Layout() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${titles[pathname] || 'Không tìm thấy trang'} | MTShop`;
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Đến nội dung chính
      </a>

      <div className="announcement">
        Một chút chăm sóc, một ngày thật dịu dàng
        <span aria-hidden="true">✦</span>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            MTShop
            <span>DAILY CARE & MORE</span>
          </Link>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Đóng ✕' : 'Menu ☰'}
          </button>

          <nav
            id="main-navigation"
            className={menuOpen ? 'navigation is-open' : 'navigation'}
            aria-label="Menu chính"
          >
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            className="cart-link"
            to="/cart"
            onClick={() => setMenuOpen(false)}
            aria-label={`Giỏ hàng, ${count} sản phẩm`}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 7h14l1 14H4L5 7Z" />
              <path d="M8 8V6a4 4 0 0 1 8 0v2" />
            </svg>

            <span className="cart-count">{count}</span>
          </Link>
        </div>
      </header>

      <main id="main" tabIndex="-1">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              MTShop
              <span>DAILY CARE & MORE</span>
            </Link>

            <p>
              Chăm sóc bản thân, bắt đầu từ
              <br />
              những điều nhỏ nhất.
            </p>
          </div>

          <div>
            <h2>Khám phá</h2>
            <Link to="/products">Tất cả sản phẩm</Link>
            <Link to="/about-us">Câu chuyện MTShop</Link>
            <Link to="/contact">Liên hệ & câu hỏi</Link>
          </div>

          <div>
            <h2>Mỗi ngày, một chút dịu dàng</h2>

            <p>
              Dành thời gian cho làn da, mái tóc
              <br />
              và chính bạn.
            </p>

            <span className="footer-mark" aria-hidden="true">
              ✳
            </span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} MTShop</span>
          <span>
            Website bài tập · Sản phẩm và giá minh hoạ · Chưa bán hàng thực tế
          </span>
        </div>
      </footer>
    </>
  );
}