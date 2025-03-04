import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Section.scss'
import { FormattedMessage } from "react-intl";
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
class MedicalFacility extends Component {




    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        }
        return (
            <div className='section-background-medicalFacility'>
                <div className='container' >
                    <div className='section-medicalFacility'>
                        <div className='section-content'>
                            <p className='section-text'><FormattedMessage id="home-page.facility" /></p>
                            <button className='section-btn'>
                                Xem Thêm
                            </button>
                        </div>
                        <div className='section-body'>
                            <div className="slider-container">
                                <Slider {...settings}>
                                    <div className='slider-items' onClick={() => this.handleViewDetailClinic(2)}>
                                        <div className='slider-content'>
                                            <img src="./images/083122lo-go-viet-duc.jpg" alt="React Image" className='slider-img' />

                                        </div>
                                        <div className='slider-text'>Bệnh viện Hữu nghị Việt Đức</div>
                                    </div>
                                    <div className='slider-items'>
                                        <div className='slider-content'>
                                            <img src="./images/152704logo-bvcr-moi.jpg" alt="React Image" className='slider-img' />

                                        </div>
                                        <div className='slider-text'>Bệnh viện Chợ Rẫy</div>
                                    </div>

                                    <div className='slider-items'>
                                        <div className='slider-content'>
                                            <img src="./images/092249-doctor-check.jpg" alt="React Image" className='slider-img' />

                                        </div>
                                        <div className='slider-text'>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</div>
                                    </div>
                                    <div className='slider-items'>
                                        <div className='slider-content'>
                                            <img src="./images/152704logo-bvcr-moi.jpg" alt="React Image" className='slider-img' />

                                        </div>
                                        <div className='slider-text'>Bệnh viện Hữu nghị Việt Đức</div>
                                    </div>
                                    <div className='slider-items'>
                                        <div className='slider-content'>
                                            <img src="./images/092249-doctor-check.jpg" alt="React Image" className='slider-img' />

                                        </div>
                                        <div className='slider-text'>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</div>
                                    </div>

                                </Slider>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
