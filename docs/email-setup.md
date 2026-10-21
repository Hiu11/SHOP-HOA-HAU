# Nhận yêu cầu báo giá qua email

Email nhận dự kiến: `tronghieudo2k4@gmail.com`.

Chủ shop đã chấp thuận dùng FormSubmit và xác nhận đã bấm kích hoạt email trong cuộc trò chuyện. Biến `QUOTE_EMAIL_PROVIDER=formsubmit` được bật cho production. Kiểm tra phản hồi dịch vụ và email kiểm thử sau mỗi lần cấu hình lại; không coi phản hồi chấp nhận là bằng chứng thư đã tới hộp thư.

Các bước triển khai:

1. Gửi một yêu cầu kích hoạt chỉ chứa dữ liệu kiểm thử, không phải đơn hàng.
2. Chủ email mở thư FormSubmit và xác nhận kích hoạt.
3. Đặt `QUOTE_EMAIL_PROVIDER=formsubmit` trong môi trường Vercel và triển khai lại.
4. Gửi một yêu cầu kiểm thử, kiểm tra mã đã lưu và xác nhận người dùng nhận được thư trong Gmail. API chỉ xác nhận dịch vụ đã nhận thông báo, không xác minh thư đã vào hộp thư.

FormSubmit đã chấp nhận các tin thử sau kích hoạt. Dịch vụ trả HTTP 403 cho yêu cầu từ IP máy chủ Vercel; website dùng AJAX trực tiếp từ trình duyệt theo tài liệu FormSubmit. API lưu yêu cầu trước, sau đó chỉ trả dữ liệu chuyển tiếp cho chính người vừa gửi; trình duyệt chuyển đến FormSubmit và kiểm tra kết quả trước khi hiển thị đã chuyển thông báo. Nếu gửi không thành công, vẫn giữ mã đã lưu và đưa ra tùy chọn Zalo thủ công. Đường gửi từ máy chủ local vẫn có `Referer: https://shop-hoa-hau.vercel.app/`.

Khi chưa bật, form tiếp tục soạn yêu cầu qua Zalo. Khi bật, form gửi API để lưu riêng trong Blob rồi chuyển thông báo sang dịch vụ email. Nếu thông báo lỗi, khách được báo rõ yêu cầu đã lưu nhưng email chưa chuyển được, có bản nội dung để gửi Zalo và thông tin nhập được giữ lại.

Tài liệu: https://formsubmit.co/documentation

## Địa chỉ

Danh mục tỉnh/thành và phường/xã được lưu trong `public/address-data/vietnam-addresses.json` từ https://provinces.open-api.vn/api/v2/?depth=2. Quận/huyện từ API v1 được ghi rõ là địa chỉ cũ và không bắt buộc. Cập nhật bằng `node scripts/update-addresses.mjs`. Gợi ý đường là ví dụ, không phải bản đồ đầy đủ. Người dùng có thể nhập thủ công, kể cả khi tải danh mục thất bại. Dữ liệu nhập không gửi đến dịch vụ gợi ý bên ngoài.
