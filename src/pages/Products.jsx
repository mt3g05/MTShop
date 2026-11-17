import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import ProductVisual from '../components/ProductVisual';
import { useCart } from '../context/CartContext';
import { categories, products as fallbackProducts } from '../data/products';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/productApi';

const EMPTY_FORM = {
  id: '',
  name: '',
  category: 'Chăm sóc da',
  subtitle: '',
  price: 189000,
  color: '#b1c6a4',
  type: 'pump',
  label: 'DAILY CARE',
  badge: '',
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const { removeItem } = useCart();

  const [productList, setProductList] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // State cho Form Thêm (POST) / Sửa (PUT)
  const [formMode, setFormMode] = useState(null); // 'create' | 'edit' | null
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const category = categories.includes(params.get('category'))
    ? params.get('category')
    : 'Tất cả';

  const search = params.get('q') || '';
  const sort = params.get('sort') || 'default';

  // GET: Lấy danh sách sản phẩm từ Back-end qua Axios
  async function fetchProductsFromApi(showNotice = false) {
    setLoading(true);
    try {
      const data = await getProducts();
      setProductList(data);
      setApiConnected(true);
      if (showNotice) {
        setStatusMessage({
          type: 'success',
          text: 'GET /api/products thành công: Đã tải dữ liệu mới nhất từ MySQL.',
        });
      }
    } catch {
      setApiConnected(false);
      if (showNotice) {
        setStatusMessage({
          type: 'error',
          text: 'Không kết nối được tới API (http://localhost:5000). Đang hiển thị dữ liệu mẫu cục bộ.',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductsFromApi(false);
  }, []);

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

  function handleOpenCreate() {
    setFormMode('create');
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setStatusMessage(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  function handleStartEdit(product) {
    setFormMode('edit');
    setEditingId(product.id);
    setFormData({
      id: product.id,
      name: product.name || '',
      category: product.category || 'Chăm sóc da',
      subtitle: product.subtitle || '',
      price: product.price ?? 0,
      color: product.color || '#b1c6a4',
      type: product.type || 'pump',
      label: product.label || 'DAILY CARE',
      badge: product.badge || '',
    });
    setStatusMessage(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  function handleCancelForm() {
    setFormMode(null);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  }

  // Xử lý POST (Thêm mới) và PUT (Cập nhật) qua Axios
  async function handleSubmitForm(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const payload = {
      id: formData.id.trim(),
      name: formData.name.trim(),
      category: formData.category,
      subtitle: formData.subtitle.trim() || 'Chăm sóc mỗi ngày · 150 ml',
      price: Number(formData.price) || 0,
      color: formData.color || '#b1c6a4',
      type: formData.type || 'pump',
      label: formData.label.trim().toUpperCase() || 'DAILY CARE',
      badge: formData.badge.trim() || null,
    };

    try {
      if (formMode === 'create') {
        const created = await createProduct(payload);
        setProductList((prev) => [...prev, created]);
        setApiConnected(true);
        setStatusMessage({
          type: 'success',
          text: `POST /api/products thành công: Đã thêm "${created.name}".`,
        });
      } else if (formMode === 'edit' && editingId) {
        const updated = await updateProduct(editingId, payload);
        setProductList((prev) =>
          prev.map((item) => (item.id === editingId ? updated : item))
        );
        setApiConnected(true);
        setStatusMessage({
          type: 'success',
          text: `PUT /api/products/${editingId} thành công: Đã cập nhật "${updated.name}".`,
        });
      }
      handleCancelForm();
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.message;
      setStatusMessage({
        type: 'error',
        text: `Lỗi khi gọi API (${formMode === 'create' ? 'POST' : 'PUT'}): ${serverMsg}`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Xử lý DELETE (Xóa sản phẩm) qua Axios
  async function handleDelete(product) {
    if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}"?`)) {
      return;
    }

    setStatusMessage(null);
    try {
      await deleteProduct(product.id);
      setProductList((prev) => prev.filter((item) => item.id !== product.id));
      removeItem(product.id);
      setApiConnected(true);
      setStatusMessage({
        type: 'success',
        text: `DELETE /api/products/${product.id} thành công: Đã xóa "${product.name}".`,
      });
      if (editingId === product.id) {
        handleCancelForm();
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.message;
      setStatusMessage({
        type: 'error',
        text: `Lỗi khi gọi API (DELETE /api/products/${product.id}): ${serverMsg}`,
      });
    }
  }

  const filtered = productList
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

      <div className="products-header-row">
        <div>
          <h1>
            Chọn một chút <em>dịu dàng.</em>
          </h1>

          <p className="page-intro">
            Khám phá những món đồ chăm sóc da, tóc và cơ thể cho mỗi ngày.
          </p>
        </div>

        <div className="api-toolbar">
          <span className={`api-badge ${apiConnected ? 'connected' : 'offline'}`}>
            {loading
              ? 'Đang kết nối API…'
              : apiConnected
                ? '● Đã kết nối API (MySQL)'
                : '○ Chế độ dữ liệu mẫu'}
          </span>

          <div className="api-toolbar-buttons">
            <button
              type="button"
              className="crud-action-btn secondary"
              onClick={() => fetchProductsFromApi(true)}
            >
              ↻ Tải lại (GET)
            </button>

            <button
              type="button"
              className="crud-action-btn primary"
              onClick={handleOpenCreate}
            >
              + Thêm sản phẩm (POST)
            </button>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`api-alert ${statusMessage.type}`}
          role="status"
        >
          <span>{statusMessage.text}</span>
          <button
            type="button"
            aria-label="Đóng thông báo"
            onClick={() => setStatusMessage(null)}
          >
            ✕
          </button>
        </div>
      )}

      {formMode && (
        <section className="crud-form-panel" ref={formRef}>
          <div className="crud-form-header">
            <h2>
              {formMode === 'create'
                ? 'Thêm sản phẩm mới (POST /api/products)'
                : `Cập nhật sản phẩm (PUT /api/products/${editingId})`}
            </h2>
            <button
              type="button"
              className="crud-close-btn"
              onClick={handleCancelForm}
            >
              Đóng ✕
            </button>
          </div>

          <form className="crud-form-grid" onSubmit={handleSubmitForm}>
            <div className="crud-form-fields">
              <label>
                Tên sản phẩm *
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Xịt khoáng dịu da"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </label>

              <label>
                Danh mục *
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories
                    .filter((c) => c !== 'Tất cả')
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </label>

              <label>
                Mô tả ngắn & dung tích *
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cấp ẩm tức thì · 100 ml"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                />
              </label>

              <label>
                Giá bán (VND) *
                <input
                  type="number"
                  min="0"
                  step="1000"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </label>

              <label>
                Kiểu dáng lọ
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="pump">Chai vòi nhấn (Pump)</option>
                  <option value="jar">Hũ kem (Jar)</option>
                  <option value="tube">Tuýp kem (Tube)</option>
                </select>
              </label>

              <label>
                Màu sắc bao bì
                <div className="color-input-row">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                </div>
              </label>

              <label>
                Nhãn in trên lọ (Tiếng Anh)
                <input
                  type="text"
                  placeholder="Ví dụ: FACIAL MIST"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                />
              </label>

              <label>
                Nhãn nổi bật (Tùy chọn)
                <input
                  type="text"
                  placeholder="Ví dụ: Mới ra mắt"
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                />
              </label>

              <div className="crud-form-actions">
                <button
                  type="submit"
                  className="button"
                  disabled={submitting}
                >
                  {submitting
                    ? 'Đang lưu…'
                    : formMode === 'create'
                      ? 'Tạo sản phẩm (POST)'
                      : 'Lưu thay đổi (PUT)'}
                </button>
                <button
                  type="button"
                  className="crud-action-btn secondary"
                  onClick={handleCancelForm}
                >
                  Hủy
                </button>
              </div>
            </div>

            <div className="crud-preview-box">
              <p className="eyebrow">XEM TRƯỚC BAO BÌ</p>
              <div className="product-image">
                {formData.badge && (
                  <span className="badge">{formData.badge}</span>
                )}
                <ProductVisual
                  color={formData.color}
                  type={formData.type}
                  label={formData.label || 'DAILY CARE'}
                />
              </div>
              <p className="preview-title">
                {formData.name || 'Tên sản phẩm mới'}
              </p>
            </div>
          </form>
        </section>
      )}

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
        {filtered.length} sản phẩm ·{' '}
        {apiConnected ? 'Dữ liệu từ API MySQL' : 'Danh mục minh hoạ'}
      </p>

      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />
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
