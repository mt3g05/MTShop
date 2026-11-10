import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="container section empty-state">
      <p className="eyebrow">404 / KHÔNG TÌM THẤY TRANG</p>

      <h1>
        Mình đi lạc
        <br />
        <em>một chút rồi.</em>
      </h1>

      <p>Đường dẫn bạn truy cập không tồn tại trên MTShop.</p>

      <Link className="button" to="/">
        Về trang chủ ↗
      </Link>
    </div>
  );
}