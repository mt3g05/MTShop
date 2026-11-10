export const categories = ['Tất cả', 'Chăm sóc da', 'Chăm sóc tóc', 'Chăm sóc cơ thể'];

// Dữ liệu và nhãn sản phẩm minh hoạ phục vụ bài tập, không phải danh mục bán hàng thật.
export const products = [
  { id: 'sua-rua-mat', name: 'Sữa rửa mặt dịu nhẹ', category: 'Chăm sóc da', subtitle: 'Làm sạch mỗi ngày · 150 ml', price: 189000, color: '#b1c6a4', type: 'pump', label: 'GENTLE CLEANSER', badge: 'Được yêu thích' },
  { id: 'kem-duong-am', name: 'Kem dưỡng ẩm hằng ngày', category: 'Chăm sóc da', subtitle: 'Bước dưỡng da cơ bản · 50 g', price: 249000, color: '#e1c3a3', type: 'jar', label: 'DAILY MOISTURE', badge: 'Gợi ý cho bạn' },
  { id: 'dau-goi', name: 'Dầu gội hương thảo', category: 'Chăm sóc tóc', subtitle: 'Hương thơm thảo mộc · 300 ml', price: 219000, color: '#577d69', type: 'pump', label: 'ROSEMARY SHAMPOO' },
  { id: 'sua-tam', name: 'Sữa tắm hương trà xanh', category: 'Chăm sóc cơ thể', subtitle: 'Cho phút giây thư giãn · 300 ml', price: 179000, color: '#c5d3b0', type: 'pump', label: 'GREEN TEA BODY WASH' },
  { id: 'kem-tay', name: 'Kem dưỡng da tay', category: 'Chăm sóc cơ thể', subtitle: 'Nhỏ gọn mang theo · 60 ml', price: 99000, color: '#d7aa91', type: 'tube', label: 'HAND CREAM' },
  { id: 'dau-xa', name: 'Dầu xả chăm sóc tóc', category: 'Chăm sóc tóc', subtitle: 'Hoàn thiện bước gội đầu · 250 ml', price: 199000, color: '#d1cda9', type: 'tube', label: 'DAILY CONDITIONER' },
];

export const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
