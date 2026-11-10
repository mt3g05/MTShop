import { useSearchParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function Products() {
  const [params, setParams] = useSearchParams();

  const category = categories.includes(params.get('category'))
    ? params.get('category')
    : 'Tất cả';

  const search = params.get('q') || '';
  const sort = params.get('sort') || 'default';

  function update(key, value) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);

        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        return next;
      },
      { replace: true }
    );
  }

  const filtered = products
    .filter(
      (p) =>
        (category === 'Tất cả' || p.category === category) &&
        p.name
          .toLocaleLowerCase('vi')
          .includes(search.trim().toLocaleLowerCase('vi'))
    )
    .sort((a, b) =>
      sort === 'price-asc'
        ? a.price - b.price
        : sort === 'price-desc'
          ? b.price - a.price
          : 0
    );

  return (
    <div className="container section page-content">
      <p className="eyebrow">MTSHOP / SẢN PHẨM</p>

      <h1>
        Chọn một chút <em>dịu dàng.</em>
      </h1>

      <p className="page-intro">
        Khám phá những món đồ chăm sóc da, tóc và cơ thể cho mỗi ngày.
      </p>

      <div className="shop-controls">
        <div className="filter-tabs" aria-label="Danh mục">
          {categories.map((item) => (
            <button
              key={item}
              className={item === category ? 'selected' : ''}
              aria-pressed={item === category}
              onClick={() =>
                update('category', item === 'Tất cả' ? '' : item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div className="search-sort">
          <label>
            Tìm sản phẩm
            <input
              type="search"
              placeholder="Nhập tên sản phẩm…"
              value={search}
              onChange={(e) => update('q', e.target.value)}
            />
          </label>

          <label>
            Sắp xếp
            <select
              value={sort}
              onChange={(e) => update('sort', e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </label>
        </div>
      </div>

      <p className="result-count">
        {filtered.length} sản phẩm · Danh mục minh hoạ
      </p>

      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>Chưa tìm thấy sản phẩm</h2>
          <p>Thử một từ khoá hoặc danh mục khác nhé.</p>
          <button className="button" onClick={() => setParams({})}>
            Xoá bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}