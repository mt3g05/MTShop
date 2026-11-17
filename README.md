# MTShop — Website bán sản phẩm chăm sóc cá nhân

Bài tập thực hành môn Lập trình Web:
# Thực hành 1: Chiều ngày 10/11/2026 tại phòng thực hành

- Tạo project bằng ReactJs với framework Vite/Next.js
- Tùy theo đề tài cuối môn mà các bạn đã chọn, hãy viết HTML để tạo giao diện của trang chủ
- Tạo file .css để định dạng trang chủ mà các bạn đã làm tại bước 2
- Đăng ký tài khoản trên https://github.com/, khởi tạo repository và push source code project của các bạn lên repository đó.
- Tạo thêm các pages/components khác.
- Tìm hiểu react-router (https://reactrouter.com) và tích hợp vào project hiện có.
- Cấu hình để website có thể chuyển trang được khi click vào menu hoặc truy cập bằng URl
Ví dụ:
- Click vào menu để chuyển từ trang chủ sang trang giới thiệu:
http://localhost:3000 (trang chủ) => http://localhost:3000/about-us

- Hoặc khi truy cập link `http://localhost:3000/about-us`, browser sẽ tự hiển thị đúng trang giới thiệu như mong muốn 


# Thực hành 2: Chiều ngày 17/11/2026 online

Cập nhật ở bài thực hành 2: 
- Tạo project API backend bằng ASP.NET core.
- Tạo controllers và các endpoint với các method POST, GET, PUT, DELETE.
- Tạo các request từ Front-end đến Back-end bằng thư viện Axios với các phương thức POST, GET, PUT, DELETE.
- Tìm hiểu cách thêm cấu hình để kết nối với database ở Back-end.
- Tìm hiểu cách cài đặt và cấu hình EF core, tạo migration


## 1. Cấu hình & Chạy Back-end API (`MTShop.Api`)

1. Mở file `MTShop.Api/appsettings.json` (hoặc tạo `MTShop.Api/appsettings.Development.json`) và điền mật khẩu MySQL của bạn vào chuỗi kết nối `DefaultConnection`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Port=3306;Database=mtshop_db;User=root;Password=YOUR_MYSQL_PASSWORD;"
   }
   ```
2. Mở Terminal tại thư mục `MTShop.Api` để cập nhật Migration vào MySQL và chạy server (chạy tại `http://localhost:5000`):
   ```sh
   cd MTShop.Api
   dotnet ef database update
   dotnet run
   ```
   *(Lưu ý: Khi chạy `dotnet run`, ứng dụng cũng tự động thực thi `db.Database.Migrate()` để tạo bảng `Products` và thêm sẵn 6 sản phẩm mẫu).*

## 2. Chạy Front-end (`mtshop`)

Mở một Terminal khác tại thư mục gốc `mtshop` rồi chạy (chạy tại `http://127.0.0.1:3000`):

```sh
npm install
npm run dev
```

Tại trang **Sản phẩm (`/products`)** và thử nghiệm đầy đủ 4 phương thức gọi qua **Axios**:
- **GET** (`/api/products`): Tự động tải danh sách sản phẩm từ MySQL hoặc bấm nút **↻ Tải lại (GET)**.
- **POST** (`/api/products`): Bấm nút **+ Thêm sản phẩm (POST)** và điền form tạo mới.
- **PUT** (`/api/products/{id}`): Bấm nút **Sửa (PUT)** trên thẻ sản phẩm bất kỳ.
- **DELETE** (`/api/products/{id}`): Bấm nút **Xóa (DELETE)** trên thẻ sản phẩm bất kỳ.
