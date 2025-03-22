import React, { Component } from "react";
import { connect } from "react-redux";
import "./OrderDetails.scss";
import axios from "axios";
import { momoPaymentService } from "../../../services/userService";

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "momo",
      message: "",
    };
  }

  handlePaymentChange = (event) => {
    this.setState({ paymentMethod: event.target.value });
  };

  processPayment = async () => {
    const { paymentMethod } = this.state;
    const amount = 100000; // Giả lập số tiền thanh toán

    if (paymentMethod === "momo") {
      try {
        let response = await momoPaymentService({ amount });
        console.log("check momo fe", response);

        if (response) {
          window.location.href = response; // Chuyển hướng đến cổng thanh toán MoMo
        } else {
          this.setState({ message: "Lỗi khi tạo thanh toán!" });
        }
      } catch (error) {
        console.error("Lỗi thanh toán:", error);
        this.setState({ message: "Lỗi kết nối đến máy chủ!" });
      }
    } else {
      this.setState({ message: "Phương thức thanh toán này chưa hỗ trợ!" });
    }
  };

  render() {
    let { language } = this.props;
    let { paymentMethod, message } = this.state;

    return (
      <div className="payment-container">
        <h3>Thanh Toán Đơn Hàng</h3>

        <div className="order-info">
          <p>
            <strong>Mã đơn hàng:</strong> <span id="orderId">R67C086418F62C</span>
          </p>
          <p>
            <strong>Tổng tiền:</strong> <span id="totalAmount">100,000 VND</span>
          </p>
          <p>
            <strong>Trạng thái:</strong> <span className="pending">Chưa thanh toán</span>
          </p>
        </div>

        <h2>Chọn phương thức thanh toán</h2>
        <div className="payment-methods">
          <label>
            <input type="radio" name="payment" value="momo" checked={paymentMethod === "momo"} onChange={this.handlePaymentChange} /> MoMo
          </label>
          <label>
            <input type="radio" name="payment" value="bank" checked={paymentMethod === "bank"} onChange={this.handlePaymentChange} /> Chuyển khoản ngân hàng
          </label>
          <label>
            <input type="radio" name="payment" value="credit" checked={paymentMethod === "credit"} onChange={this.handlePaymentChange} /> Thẻ tín dụng
          </label>
        </div>

        <button onClick={this.processPayment}>Thanh Toán</button>
        {message && <p className="error-message">{message}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(OrderDetails);
