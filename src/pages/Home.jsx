
import { Link } from 'react-router';

import ProductVisual from '../components/ProductVisual';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              CHĂM SÓC BẢN THÂN MỖI NGÀY
            </p>

            <h1>
              Yêu mình từ
              <br />
              những điều <em>nhỏ.</em>
            </h1>

            <p className="hero-description">
              Từ làn da đến mái tóc, tìm một chút dịu dàng cho thói quen chăm sóc bản thân cùng MTShop.
            </p>

            <Link className="button" to="/products">
              Khám phá sản phẩm
              <span aria-hidden="true">↗</span>
            </Link>

            <div className="hero-note">
              <span aria-hidden="true">✳</span>
              Những lựa chọn nhỏ, dành riêng cho bạn.
            </div>
          </div>

          <div
            className="hero-art"
            role="img"
            aria-label="Bộ sản phẩm chăm sóc cá nhân MTShop với chai sữa rửa mặt và kem dưỡng"
          >
            <span className="art-orbit" />

            <span className="art-caption">
              YOUR EVERYDAY
              <br />
              MOMENT OF CARE
            </span>

            <div className="art-leaf leaf-one" />
            <div className="art-leaf leaf-two" />
            <div className="art-leaf leaf-three" />
            <div className="art-platform" />

            <div className="hero-bottle">
              <ProductVisual {...products[0]} />
            </div>

            <div className="hero-jar">
              <ProductVisual {...products[1]} />
            </div>

            <span className="art-stamp">
              a little care
              <br />
              <b>goes a long way</b>
              <span>✦</span>
            </span>

            <span className="art-number">
              01 / DAILY ESSENTIALS
            </span>
          </div>
        </div>
      </section>

      <div className="values-strip">
        <div className="container">
          <span>
            01 <b>Chăm sóc da</b>
          </span>

          <span>
            02 <b>Chăm sóc tóc</b>
          </span>

          <span>
            03 <b>Chăm sóc cơ thể</b>
          </span>

          <span className="strip-end">
            Bắt đầu từ chính bạn
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              GÓC CHĂM SÓC CỦA BẠN
            </p>

            <h2>Hôm nay, bạn cần gì?</h2>
          </div>

          <p>
            Một thói quen nhỏ.
            <br />
            Nhiều khoảnh khắc dễ chịu hơn.
          </p>
        </div>

        <div className="category-grid">
          {[
            ['Chăm sóc da', 'Dịu dàng với làn da', '01', 'skin'],
            ['Chăm sóc tóc', 'Nâng niu từng sợi tóc', '02', 'hair'],
            ['Chăm sóc cơ thể', 'Thư giãn theo cách của bạn', '03', 'body']
          ].map(([category, text, number, theme]) => (
            <Link
              className={`category-card ${theme}`}
              to={`/products?category=${encodeURIComponent(category)}`}
              key={category}
            >
              <span className="category-number">
                /{number}
              </span>

              <div>
                <h3>{category}</h3>
                <p>{text}</p>
              </div>

              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>

              <span className="category-decoration" aria-hidden="true">
                ✳
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                NHỮNG ĐIỀU NHỎ ĐƯỢC YÊU THÍCH
              </p>

              <h2>Gợi ý cho mỗi ngày</h2>
            </div>

            <Link className="text-link" to="/products">
              Xem tất cả sản phẩm
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="product-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="container story-section">
        <div className="story-symbol" aria-hidden="true">
          ✳
          <span>IT STARTS WITH YOU</span>
        </div>

        <div>
          <p className="eyebrow">
            MỘT CHÚT VỀ MTSHOP
          </p>

          <h2>
            Chăm sóc bản thân
            <br />
            là một cách nói <em>yêu.</em>
          </h2>

          <p>
            Không cần một quy trình cầu kỳ. MTShop mang đến một góc nhỏ để bạn khám phá những sản phẩm chăm sóc cá nhân phù hợp với nhịp sống của mình.
          </p>

          <Link className="text-link" to="/about-us">
            Đọc câu chuyện của chúng mình
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
