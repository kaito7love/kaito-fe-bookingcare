import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Section.scss'
import { FormattedMessage } from "react-intl";
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import { getAllClinic } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            dataClinic: '',
        })
    }

    async componentDidMount() {
        this.getDataAllClinic()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }

    getDataAllClinic = async () => {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
        console.log(this.state.dataClinic);
    }
    render() {
        let { dataClinic } = this.state

        let { language } = this.props
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
                                 <FormattedMessage id="home-page.more" />
                            </button>
                        </div>
                        <div className='section-body'>

                            <div className="slider-container">
                                <Slider {...settings}>
                                    {dataClinic && dataClinic.length > 0 &&
                                        dataClinic.map((item, index) => {
                                            console.log(item);
                                            const nameVi = `${item.name}`;
                                            const nameEn = `${item.description}`;
                                            return (
                                                <div key={index} className='slider-items' onClick={() => this.handleViewDetailClinic(item)}>
                                                    <div className='slider-content'>
                                                        <img src={item.image} alt={item.text} className='slider-img' />
                                                    </div>
                                                    <div className='slider-text'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
