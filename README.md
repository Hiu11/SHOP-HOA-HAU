# SHOP-HOA-HAU

Website của **SHOP HOA HẬU**. Tên hiển thị dự án và repository: `SHOP-HOA-HAU`; tên package npm: `shop-hoa-hau`.

Website giới thiệu hoa sỉ, danh mục có bộ lọc, form báo giá và API lưu yêu cầu thực tế. Dùng Node.js 22.12+ (hoặc 20.19+).

Shop hoa HẬU chuyên cung cấp sỉ hoa lay ơn các màu và hoa hướng dương. Mở cửa 24/24. Điện thoại/Zalo: 0798971155. Địa chỉ: đối diện Hoa tươi MƯỜI, nằm giữa số nhà 80/12 và 80/11 Hồ Thị Kỷ, phường Vườn Lài, TP.HCM. Danh mục và các lựa chọn hợp lệ của API dùng chung `shared/catalog.js`.

Hàng về từ 23h đêm đến rạng sáng, khung giờ có nhiều hàng để lựa chọn. Khi tải lại trang, `public/reload.js` bỏ hash cũ và đưa trang về đầu; các liên kết điều hướng trong trang vẫn hoạt động bình thường.

Icon giao diện dùng thư viện Lucide qua package `lucide`, chỉ import các icon cần dùng. Favicon là icon Flower 2 nguyên bản từ kho chính thức Lucide. Không dùng emoji hay tự vẽ đường nét SVG làm icon. Giấy phép thư viện nằm trong `public/lucide-license.txt`.

Banner dùng Dancing Script và Lora italic có đầy đủ ký tự tiếng Việt, lưu tại `public/fonts` kèm giấy phép SIL OFL. Ảnh lay ơn theo màu và hướng dương được lưu tại `public/images`; nguồn ảnh và giấy phép hiển thị tại `public/image-credits.html`.

## Chạy phát triển

```sh
npm install
npm run dev
```

Mở http://localhost:5173. Lệnh dev khởi động cả Vite và API ở cổng 3001. Cần để trống hai cổng này.

## Kiểm tra và chạy bản build

```sh
npm test
npm run build
npm start
```

Bản build chạy tại http://localhost:3001, phục vụ cả trang và API. Có thể đổi cổng bằng biến môi trường PORT. `npm run preview` chỉ xem giao diện tĩnh, không có API; dùng `npm start` để thử gửi báo giá.

## Yêu cầu báo giá

`POST /api/quotes` nhận name, phone, flowerType, quantity (bó), date (YYYY-MM-DD), location, note. API kiểm tra dữ liệu, lưu thành công mới trả HTTP 201 cùng mã yêu cầu. Ngày giao được kiểm tra theo giờ Việt Nam.

Yêu cầu được lưu nối tiếp trong `data/quotes.jsonl`. Chủ dự án có thể đọc tệp này trên máy chủ; không có API công khai đọc dữ liệu khách hàng. Thư mục data được bỏ qua khi quản lý mã nguồn. Giữ và sao lưu thư mục này khi cập nhật bản build. Hiện chưa có trang quản trị, gửi email/Zalo tự động, thanh toán hay xác nhận đơn hàng.

## Triển khai Vercel

`vercel.json` cấu hình Vite build vào `dist`. Route `api/quotes.js` chạy bằng Vercel Function, dùng cùng quy tắc kiểm tra dữ liệu với bản local. Trên Vercel, mỗi yêu cầu được lưu thành một JSON trong Vercel Blob **private**, không dùng ổ đĩa tạm của Function. Chỉ trả mã yêu cầu sau khi lưu thành công; khi kho lưu trữ lỗi, form giữ thông tin và gợi ý liên hệ Zalo.

Kho `shop-hoa-hau-quotes` được nối với project `shop-hoa-hau` cho production và preview. Cần biến môi trường `BLOB_READ_WRITE_TOKEN` do kết nối kho cung cấp. Không đưa token, `.env*`, `.vercel` hoặc dữ liệu khách hàng vào Git. Đọc các yêu cầu từ mục Storage trong dashboard Vercel; chưa có trang quản trị riêng.

Repo GitHub `Hiu11/SHOP-HOA-HAU` được nối với project Vercel. Các lần đẩy lên `main` sẽ tạo bản production mới. Kiểm tra bằng `npm test` và `npm run build` trước khi đẩy.

Hiện chạy cục bộ, chưa triển khai lên Internet. Hotline, tên shop, giờ mở cửa và địa chỉ do chủ dự án cung cấp. Giá và tình trạng màu hoa cần liên hệ shop xác nhận. Ảnh minh họa từ Pexels và Wikimedia Commons được lưu trong dự án, không phải ảnh hàng thực tế. Khi triển khai cần môi trường Node với ổ đĩa lưu trữ bền vững và cấu hình HTTPS/proxy phù hợp.
