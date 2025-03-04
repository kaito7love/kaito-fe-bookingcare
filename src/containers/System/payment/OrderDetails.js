import React from "react";
import "./OrderDetails.scss"; // Import SCSS

const OrderDetails = () => {
  return (
    <div className="order-container">
      <h2>THÔNG TIN ĐƠN HÀNG</h2>
      <div className="order-info">
        <p><strong>Đơn hàng #:</strong> R67C086418F62C</p>
        <p><strong>Tổng số tiền:</strong> 100,000đ</p>
        <p><strong>TT hóa đơn:</strong> <span className="pending-status">Chưa thanh toán</span></p>
        <p><strong>Ngày tạo:</strong> 27/02/2025 22:35:29</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên dịch vụ</th>
            <th>Tài khoản</th>
            <th>Số tiền</th>
            <th>Chiết khấu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Vàng 5.4 từ 100k (100k 540tv)</td>
            <td>kaito7laze</td>
            <td>100,000 Thỏi vàng</td>
            <td>0%</td>
          </tr>
        </tbody>
      </table>

      <h2>THÔNG TIN THANH TOÁN</h2>
      <table>
        <tbody>
          <tr><td>Ngân hàng</td><td><strong>NGÂN HÀNG TMCP Á CHÂU (ACB)</strong></td></tr>
          <tr><td>Số tài khoản</td><td>6085901</td></tr>
          <tr><td>Chủ tài khoản</td><td>BUI CONG THUONG</td></tr>
          <tr><td>Số tiền</td><td>100,000 VND</td></tr>
          <tr><td>Nội dung chuyển tiền</td><td>Muathe inv296055</td></tr>
        </tbody>
      </table>

      <p className="important-note">
        Thời gian hiệu lực hóa đơn là 15p, sau 15p hóa đơn sẽ bị hủy.
      </p>
    </div>
  );
};

export default OrderDetails;
