import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/Header/HomeHeader';
import HomeFooter from '../../HomePage/Footer/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import { getAllCodeService, getDetailSpecialtyService } from '../../../services/userService';
import _ from 'lodash';
import Select from 'react-select';
import { LANGUAGES, LanguageUtils } from '../../../utils';

class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            arrDoctorId: [2, 4],
            dataDetailClinic: {},
            location: 'all',
            listProvince: [],
        })
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }



    render() {
        let { arrDoctorId, dataDetailSpecialty, location, listProvince } = this.state
        let { language } = this.props
        // console.log("check specialty state", this.state);
        return (
            <React.Fragment >
                <HomeHeader />
                <div className='detail-specialty '>
                    {/* <div className='container'>
                        <div className='search-bar'>
                            <select
                                className='form-select'
                                value={location}
                                onChange={this.handleChangeProvince}
                            >
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div> */}
                    {arrDoctorId && arrDoctorId.length > 0 &&

                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='detail-doctor container' key={index}>
                                    <div className='content-left'>
                                        {/* <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link> */}
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescription={true}
                                            isShowDetail={true}
                                        />

                                    </div>
                                    <div className='content-right'>
                                        {/* <DoctorSchedule
                                                                    currentDoctorId={item}
                                                                /> */}
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                currentDoctorId={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-info'>
                                            <DoctorExtraInfo
                                                currentDoctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <HomeFooter />
            </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
