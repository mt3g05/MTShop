
import { Link } from 'react-router';

const faqs = [
  [
    'Làm thế nào để tìm sản phẩm?',
    'Hãy tìm kiếm tại Shopee'
  ],
  [
    'Giỏ hàng có được lưu lại không?',
    'không'
  ],
  [
    'Tôi có thể đặt hàng hoặc thanh toán chưa?',
    'stk: 1036185803 vietcombank'
  ],
  [
    'Tại sao truy cập /about-us vẫn mở được trang giới thiệu?',
    'Website dùng React Router để hiển thị trang tương ứng với đường dẫn. Máy chủ Vite hỗ trợ trả về ứng dụng cho các đường dẫn này.'
  ],
];

export default function Contact() {
  return (
    <div className="container section page-content">
      <p className="eyebrow">
        MTSHOP / LIÊN HỆ
      </p>

      <h1>
        Chúng mình ở đây
        <br />
        để <em>lắng nghe.</em>
      </h1>

      <p className="page-intro">
        Một vài thông tin giúp bạn khám phá MTShop dễ dàng hơn.
      </p>

      <div className="contact-grid">
        <aside className="contact-panel">
          <span aria-hidden="true">
            ✳
          </span>

          <h2>Góc hỗ trợ MTShop</h2>

          <p>
            Website đang ở phiên bản bài tập. Các kênh liên hệ thực tế
            sẽ được cập nhật khi cửa hàng đi vào hoạt động.
          </p>

          <Link className="text-link" to="/about-us">
            Tìm hiểu về dự án ↗
          </Link>
        </aside>

        <section className="faq">
          <h2>Câu hỏi thường gặp</h2>

          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  );
}
