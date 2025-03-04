import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom';



class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            dataProfile: ''
        })
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let data = await this.getInfoDoctor(this.props.doctorId)
            this.setState({
                dataProfile: data
            })
        }
    }

    getInfoDoctor = async (id) => {
        let result = ''

        // console.log("check prop from file");
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
            // console.log('from file', res);
        }
        return result
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    renderBookingTime = (dataTime) => {
        // console.log("chacke ", dataTime);
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            date = this.capitalizeFirstLetter(date);
            return (
                <>
                    <div>{language === LANGUAGES.VI ? dataTime.timeTypeData.value_vi : dataTime.timeTypeData.value_en} - {date}</div>
                    <div>Đặt lịch miễn phí</div>
                </>
            )
        }
    }

    render() {
        let { language, isShowDescription, dataTime, isShowDetail, doctorId } = this.props
        let detailDoctor = this.state.dataProfile;
        let nameVi, nameEn;
        // console.log(dataTime);
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.value_vi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.value_en}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        // console.log('from state file', this.state);
        return (
            <React.Fragment>
                <div className="doctor-info">
                    <img
                        src={detailDoctor.image}
                        alt="Doctor"
                        className="doctor-image"
                    />
                    <div className="doctor-description">
                        <h2>{language === LANGUAGES.VI ? nameVi : nameEn}</h2>
                        {isShowDescription === true ?
                            <>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    detailDoctor.Markdown.description.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                }
                            </> :
                            <div>
                                {this.renderBookingTime(dataTime)}
                            </div>
                        }
                    </div>
                </div>
                <div className='more-doctor-detail'>
                    {isShowDetail === true && <div>

                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
