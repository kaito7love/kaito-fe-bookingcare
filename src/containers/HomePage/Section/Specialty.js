import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Section.scss'
import { getAllSpecialty } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from "react-intl";
import { withRouter } from 'react-router-dom';



class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            dataSpecialty: '',
        })
    }

    async componentDidMount() {
        this.getDataAllSpecialty()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }

    getDataAllSpecialty = async () => {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
        console.log(this.state.dataSpecialty);
    }

    //access detail
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        let { dataSpecialty } = this.state
        let { language } = this.props
        console.log("check dataSpecialty ", dataSpecialty);

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2
        }
        return (
            <div className='section-background-specialty'>
                <div className='container' >
                    <div className='section-specialty'>
                        <div className='section-content'>
                            <p className='section-text'><FormattedMessage id="home-page.specialty" /></p>
                            <button className='section-btn'>
                            <FormattedMessage id="home-page.more" />
                            </button>
                        </div>
                        <div className='section-body'>
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {dataSpecialty && dataSpecialty.length > 0 &&
                                        dataSpecialty.map((item, index) => {
                                            console.log(item);
                                            const nameVi = `${item.name}`;
                                            const nameEn = `${item.description}`;
                                            return (
                                                <div key={index} className='slider-items' onClick={() => this.handleViewDetailSpecialty(item)}>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
