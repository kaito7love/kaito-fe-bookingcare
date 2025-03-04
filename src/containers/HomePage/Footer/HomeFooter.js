import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";

class HomeFooter extends Component {
    render() {
        return (
            <>
                <div className="container background-footer">
                    <div className="">
                        <div className="contact-section">
                            {" "}
                            <h2>Công ty Cổ phần Công nghệ BookingCare</h2>{" "}
                            <p>
                                {" "}
                                <strong>Địa chỉ:</strong> Lô B4/D21, Khu đô thị mới Cầu
                                Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà
                                Nội, Việt Nam{" "}
                            </p>{" "}
                            <p>
                                {" "}
                                <strong>ĐKKD số:</strong> 0106790291. Sở KHĐT Hà Nội cấp
                                ngày 16/03/2015{" "}
                            </p>{" "}
                            <p>
                                {" "}
                                <strong>Điện thoại:</strong> 024-7301-2468 (7h - 18h){" "}
                            </p>{" "}
                            <p>
                                {" "}
                                <strong>Email:</strong> support@bookingcare.vn (7h -
                                18h){" "}
                            </p>{" "}
                            <h3>Văn phòng tại TP Hồ Chí Minh</h3>{" "}
                            <p>
                                {" "}
                                <strong>Địa chỉ:</strong> Tòa nhà H3, 384 Hoàng Diệu,
                                Phường 6, Quận 4, TP.HCM{" "}
                            </p>{" "}
                        </div>
                    </div>

                </div>
                <div className="home-footer">
                    <p>Copyright © 2025 Trường Đại Học Quốc Tế Miền Đông</p>
                    <p>
                        Design by{" "}
                        <a
                            target="_blank"
                            href="https://www.facebook.com/kaito7love"
                        >
                            Kaito Kazuki
                        </a>
                    </p>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
