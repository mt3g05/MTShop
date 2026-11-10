
import { Link } from 'react-router';

export default function About() {
  return (
    <div className="container section page-content">
      <p className="eyebrow">
        MTSHOP / VỀ CHÚNG MÌNH
      </p>

      <div className="about-heading">
        <h1>
          Một chút chăm sóc.
          <br />
          Một ngày <em>thật khác.</em>
        </h1>

        <span className="about-flower" aria-hidden="true">
          ✳
        </span>
      </div>

      <div className="prose">
        <h2>Câu chuyện MTShop</h2>

        <p>
          Chào mọi người ạ
        </p>

        <p>
          MTShop là một shop bán sản phẩm chăm sóc cá nhân uy tín,
          không bán câu chuyện nên ở đây không có câu chuyện ạ.
        </p>
      </div>

      <div className="about-values">
        {[
          [
            '01',
            'Dễ khám phá',
            'Sản phẩm được chia theo nhu cầu chăm sóc da, tóc và cơ thể.'
          ],
          [
            '02',
            'Rõ ràng, đơn giản',
            'Tên sản phẩm, dung tích và giá được trình bày trực quan.'
          ],
          [
            '03',
            'Dành cho mỗi ngày',
            'Gợi ý những món đồ cơ bản cho thói quen chăm sóc cá nhân.'
          ]
        ].map(([n, title, description]) => (
          <article key={n}>
            <span>{n}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div className="demo-note">
        <strong>Thông tin dự án</strong>

        <p>
          Chiều ngày 10/11/2026
        </p>
      </div>

      <Link className="button" to="/products">
        Khám phá sản phẩm
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
