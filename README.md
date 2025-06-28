# Smart Store - Hệ thống Quản lý Bán hàng

Đây là một dự án full-stack xây dựng một hệ thống quản lý bán hàng (POS) và quản lý kho toàn diện, sử dụng MERN Stack (MongoDB, Express, React, Node.js) cùng với các công nghệ hiện đại khác.

## I. Các Tính năng Chính

### 1. Quản lý Bán hàng (POS)
- Giao diện bán hàng trực quan, hỗ trợ tạo nhiều hóa đơn cùng lúc.
- Thêm sản phẩm bằng cách tìm kiếm hoặc quét mã vạch (sử dụng camera).
- Quản lý thông tin khách hàng thân thiết.
- Hỗ trợ thanh toán bằng tiền mặt và chuyển khoản (tự động tạo mã VietQR).

### 2. Quản lý Sản phẩm & Tồn kho
- CRUD (Thêm, Xem, Sửa, Xóa) sản phẩm và nhà cung cấp.
- Upload hình ảnh sản phẩm lên Cloudinary.
- Quản lý nhập hàng, tự động cập nhật số lượng tồn kho.
- Gửi email đặt hàng tự động đến nhà cung cấp.
- Thông báo khi hàng tồn kho sắp hết.

### 3. Báo cáo & Phân tích
- Dashboard tổng quan về doanh thu, lợi nhuận, khách hàng mới.
- Biểu đồ trực quan hóa dữ liệu bán hàng và khách hàng theo thời gian.
- Xem danh sách sản phẩm bán chạy nhất.

### 4. Quản lý Nhân viên & Phân quyền (RBAC)
- Admin có thể tạo, quản lý tài khoản nhân viên.
- Hệ thống vai trò (Role) và quyền (Permission) chi tiết.
- Giao diện cho phép Admin tùy chỉnh quyền cho từng vai trò.

### 5. Tiện ích & Tương tác
- Chat nội bộ thời gian thực giữa các nhân viên (sử dụng Socket.IO).
- Lịch làm việc để quản lý ca làm, công việc (sử dụng React Big Calendar).
- Hệ thống xác thực an toàn với email OTP (sử dụng Nodemailer).

## II. Công nghệ sử dụng

- **Backend:**
  - Node.js & Express.js
  - MongoDB & Mongoose
  - JSON Web Token (JWT) để xác thực
  - Socket.IO cho real-time
  - Nodemailer để gửi email
  - Cloudinary cho lưu trữ ảnh

- **Frontend:**
  - React.js (Create React App)
  - React Router để điều hướng
  - React Context API để quản lý state
  - Socket.IO Client
  - Recharts để vẽ biểu đồ
  - QuaggaJS để quét mã vạch
  - React Big Calendar

## III. Hướng dẫn Cài đặt & Chạy dự án

### 1. Yêu cầu
- Node.js (phiên bản 20.x trở lên)
- npm hoặc yarn
- MongoDB (có thể cài đặt trên máy hoặc sử dụng MongoDB Atlas)

### 2. Cài đặt Backend
1.  Di chuyển vào thư mục `backend`:
    ```bash
    cd backend
    ```
2.  Cài đặt các dependencies:
    ```bash
    npm install
    ```
3.  Tạo file `.env` ở thư mục gốc của `backend` và điền các thông tin sau:
    ```dotenv
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    FRONTEND_URL=http://localhost:3000

    # Cấu hình Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # Cấu hình Nodemailer (sử dụng Gmail App Password)
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASSWORD=your-gmail-app-password
    ```
4.  Chạy server backend:
    ```bash
    npm start
    ```
    Server sẽ chạy tại `http://localhost:5000`.

### 3. Cài đặt Frontend
1.  Mở một terminal mới, di chuyển vào thư mục `frontend`:
    ```bash
    cd frontend
    ```
2.  Cài đặt các dependencies:
    ```bash
    npm install
    ```
3.  Chạy ứng dụng React:
    ```bash
    npm start
    ```
    Ứng dụng sẽ tự động mở tại `http://localhost:3000`.

## IV. Tác giả

Dự án được phát triển bởi **Tạ Đăng Dương**.