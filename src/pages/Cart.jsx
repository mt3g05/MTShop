
import { Link } from 'react-router';

import { useCart } from '../context/CartContext';
import { products, formatPrice } from '../data/products';

import ProductVisual from '../components/ProductVisual';

export default function Cart() {
  const { cart, updateQuantity, count } = useCart();

  const items = cart.map((item) => ({
    ...products.find((p) => p.id === item.id),
    quantity: item.quantity,
  }));

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container section page-content">
      <p className="eyebrow">
        MTSHOP / GIỎ HÀNG
      </p>

      <h1>
        Một chút yêu thương
        <br />
        dành cho <em>chính bạn.</em>
      </h1>

      {!items.length ? (
        <div className="empty-state">
          <h2>Giỏ hàng đang trống</h2>

          <p>
            Khám phá những sản phẩm chăm sóc cá nhân bạn yêu thích.
          </p>

          <Link className="button" to="/products">
            Khám phá sản phẩm ↗
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div>
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <div className="cart-visual">
                  <ProductVisual {...item} />
                </div>

                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  <p>
                    {formatPrice(item.price)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      aria-label={`Giảm số lượng ${item.name}`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span aria-label={`Số lượng ${item.name}`}>
                      {item.quantity}
                    </span>

                    <button
                      disabled={item.quantity >= 99}
                      aria-label={`Tăng số lượng ${item.name}`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove-button"
                      onClick={() => updateQuantity(item.id, 0)}
                      aria-label={`Xoá ${item.name}`}
                    >
                      Xoá
                    </button>
                  </div>
                </div>

                <strong>
                  {formatPrice(item.price * item.quantity)}
                </strong>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Giỏ hàng của bạn</h2>

            <p>
              {count} sản phẩm
            </p>

            <div className="total">
              <span>Tạm tính</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <p className="demo-note">
              Đây là giỏ hàng mô phỏng cho bài tập. Website chưa hỗ trợ
              đặt hàng, vận chuyển hoặc thanh toán.
            </p>

            <Link className="button" to="/products">
              Tiếp tục khám phá ↗
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
