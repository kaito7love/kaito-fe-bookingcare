import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Section.scss'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';


class Doctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }
    //access detail
    handleViewDetailDoctor = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${item.id}`)
        }
    }
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        let arrDoctors = this.state.arrDoctors
        let { language } = this.props
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        console.log(arrDoctors);

        return (
            <div className='section-background-doctor'>
                <div className='container' >
                    <div className='section-doctor'>
                        <div className='section-content'>
                            <p className='section-text'><FormattedMessage id="home-page.doctor" /></p>
                            <button className='section-btn'>
                                Xem Thêm
                            </button>
                        </div>
                        <div className='section-body'>
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {arrDoctors && arrDoctors.length > 0 &&
                                        arrDoctors.map((item, index) => {
                                            console.log(item);

                                            const nameVi = `${item.positionData.value_vi}, ${item.lastName}, ${item.firstName}`;
                                            const nameEn = `${item.positionData.value_en}, ${item.firstName}, ${item.lastName}`;
                                            return (
                                                <div key={index} className='slider-items' onClick={() => this.handleViewDetailDoctor(item)}>
                                                    <div className='slider-content'>
                                                        <img src={item.image} alt={item.text} className='slider-img' />
                                                        <div className='slider-text'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                        {/* <div className='slider-text'>Chuyen khoa</div> */}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctors: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));