<div id="Top"></div>

# 🛒 Stylash - Ứng dụng Kinh doanh thời trang Online

Ứng dụng này sẽ giúp quản lý các sản phẩm, đơn hàng, khách hàng và các hoạt động kinh doanh khác một cách dễ dàng, đồng thời tạo ra các công cụ hữu ích và trải nghiệm tốt cho người dùng.


## 📖 Mục lục

 [I. Mở đầu](#Modau)

 [II. Mô tả](#Mota)

> [1. Ý tưởng](#Ytuong)
>
> [2. Công nghệ](#Congnghe)
>
> [3. Người dùng](#Doituongsudung)
>
> [4. Tính năng](#Tinhnang)

[III. Tác giả](#Tacgia)


[IV. Tổng kết](#Tongket)


<!-- MỞ ĐẦU -->
<div id="Modau"></div>

## ✍️ I. Mở đầu

Trong thời đại số hóa, ngành công nghiệp thời trang đang phát triển mạnh mẽ và cạnh tranh cao. Để giúp các doanh nghiệp thời trang tối ưu hóa quá trình quản lý và kinh doanh, chúng ta cần xây dựng một ứng dụng web hiệu quả và tiện lợi. Chính vì thế, Stylash được khai sinh ra nhằm giải quyết các vấn đề này.

<!-- MÔ TẢ -->
<div id="Mota"></div>

## 📝 II. Mô tả

<!-- Ý TƯỞNG -->
<div id="Ytuong"></div>

### 💁 1. Ý tưởng

Xây dựng một ứng dụng web quản lý và kinh doanh thời trang sử dụng các công nghệ chủ chốt như Spring, React, Tailwind CSS và JWT (JSON Web Tokens). Ứng dụng sẽ hướng tới các mục tiêu sau:
  * Quản lý Sản phẩm: Cung cấp giao diện quản lý để thêm, sửa đổi và xóa thông tin về các sản phẩm thời trang. Mỗi sản phẩm sẽ bao gồm thông tin như tên, mô tả, hình ảnh, giá cả.
  * Quản lý Đơn hàng: Cung cấp chức năng để xem, xác nhận và xử lý các đơn hàng từ khách hàng. Đơn hàng sẽ chứa thông tin về sản phẩm đã mua, số lượng, giá cả và thông tin liên hệ của khách hàng.
  * Quản lý Khách hàng: Cho phép quản lý thông tin khách hàng, bao gồm tên, địa chỉ, số điện thoại và lịch sử mua hàng.
  * Chức năng Tìm kiếm và Lọc sản phẩm: Cung cấp khả năng tìm kiếm nhanh chóng và lọc các sản phẩm dựa trên tiêu chí như loại sản phẩm, màu sắc, giá cả, và thương hiệu.


<div id="Congnghe"></div>

### 📜  2. Công nghệ

  * Spring Framework: Sử dụng Spring để xây dựng phía back-end của ứng dụng, bao gồm xử lý logic, tạo API, quản lý dữ liệu và xác thực người dùng.
  * React: Sử dụng React để xây dựng phía front-end của ứng dụng, tạo các giao diện tương tác và hiển thị dữ liệu động.
  * Tailwind CSS: Sử dụng Tailwind CSS để thiết kế giao diện người dùng, tận dụng các lớp CSS tiền xử lý để đạt được trải nghiệm tốt và phản hồi nhanh chóng.
  * JSON Web Tokens (JWT): Sử dụng JWT để xác thực người dùng và quản lý phiên đăng nhập, đảm bảo tính bảo mật của ứng dụng.
  * Cơ sở dữ liệu: Sử dụng MySQL để lưu trữ thông tin về sản phẩm, đơn hàng, lượt thích, thể loại và khách hàng.
  * Công cụ Phát triển: Sử dụng công cụ Visual Studio Code, IntelliJ, Maven, MySQL, Postman, Trình duyệt để phát triển và kiểm thử ứng dụng một cách hiệu quả.


<div id="Doituongsudung"></div>

### 📌 3. Đối tượng sử dụng

  * Quản lý (Admin)
  * Người dùng (User)




<div id="Tinhnang"></div>

### 📃 4. Tính năng

- Khách hàng
  * Đăng ký tài khoản
  * Đăng nhập tài khoản
  * Lấy lại mật khẩu bằng Email
  * Trang chủ hiển thị thông tin của cửa hàng, sản phẩm, xếp hạng sản phẩm
  * Khách hàng có thể chọn sản phẩm theo sở thích cá nhân để thêm sản phẩm của cửa hàng vào giỏ hàng.
  * Khách hàng có thể chọn sản phẩm nhiều loại, tùy vào: màu sắc, kích cỡ, số lượng.
  * Giỏ hàng hiển thị các thông tin sản phẩm đã đặt, màu sắc của sản phẩm, size của sản phẩm, số lượng mỗi mặt hàng, có thể xác nhận đặt hoặc hủy giỏ hàng hiện tại.
  * Lịch sử đặt hàng hiển thị tất cả các đơn hàng đã từng đặt, theo dõi hiện trạng của đơn hàng và hiển thị tổng tiền đã chi tiêu.
  * Ngoài ra lịch sử đặt hàng có thể theo dõi các đơn hàng đã đặt theo ý muốn bằng chức năng filter, search.
  * Lọc sản phẩm, tìm kiếm sản phẩm theo tên, sắp xếp sản phẩm
  * Voucher giảm giá
  * Gửi feedback về cho chủ của hàng
  * Hiển thị thông tin cá nhân
  * Chỉnh sửa thông tin cá nhân
  * Hiển thị thông tin hóa đơn, tình trạng giao hàng, tình trạng nhận tiền
  * Hiển thị chi tiết thông tin hóa đơn
  * Tương tác với các sản phẩm thông qua nút thích
  * Lập wishlist các sản phẩm mong ước

- Về chủ cửa hàng
  * Quản lý cửa hàng online 
  * Quản lý đơn hàng của khách hàng (hóa đơn chưa giao, hóa đơn chưa thanh toán), có thể filter, search khách hàng
  * Quản lý sản phẩm của cửa hàng, có thể thêm hoặc xóa sản phẩm, chỉnh sửa thông tin sản phẩm, có thể xem chi tiết, filter, search 
  * Quản lý thông tin khách hàng đã mua hàng, có thể xem chi tiết, filter, search tên khách hàng
  * Quản lý các đơn hàng đã giao, có thể xem chi tiết, filter, search các đơn hàng
  * Chỉnh sửa thông tin cá nhân của cửa hàng
  * Thay đổi mật khẩu cửa hàng
  * Đăng xuất khỏi cửa hàng


<!-- TÁC GIẢ -->
<div id="Tacgia"></div>

## 👊 III. Tác giả

* [Vũ Đức Minh](https://github.com/dvcminh)
  * Vai trò: Leader, Frontend developer, Backend developer, Database designer


<!-- TỔNG KẾT -->
<div id="Tongket"></div>

## 🚩 IV. Tổng kết

* Ưu điểm của ứng dụng:
  * Cung cấp các công cụ hữu ích để ghi lại thông tin đơn hàng, theo dõi đơn hàng, đặt hàng dễ dàng, thông tin sản phẩm được yêu thích nhất và quản lý thông tin
  * Kết nối với cộng đồng người dùng
  * Giao diện đẹp, thân thiện người dùng 



* Hướng phát triển của ứng dụng:
  * Phát triển tính năng giao tiếp giữa người dùng. 
  * Phát triển tính năng tích hợp AI sử dụng mô hình recommender system. 

---

<p align="right"><a href="#Top">Quay lại đầu trang</a></p>
