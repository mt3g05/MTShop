import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET: Lấy danh sách sản phẩm (hỗ trợ lọc category, tìm kiếm q, sắp xếp sort)
export async function getProducts(params = {}) {
  const response = await apiClient.get('/products', { params });
  return response.data;
}

// GET: Lấy chi tiết 1 sản phẩm theo ID
export async function getProductById(id) {
  const response = await apiClient.get(`/products/${encodeURIComponent(id)}`);
  return response.data;
}

// POST: Tạo mới sản phẩm
export async function createProduct(productData) {
  const response = await apiClient.post('/products', productData);
  return response.data;
}

// PUT: Cập nhật thông tin sản phẩm theo ID
export async function updateProduct(id, productData) {
  const response = await apiClient.put(`/products/${encodeURIComponent(id)}`, productData);
  return response.data;
}

// DELETE: Xóa sản phẩm theo ID
export async function deleteProduct(id) {
  await apiClient.delete(`/products/${encodeURIComponent(id)}`);
}

export default apiClient;
