import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/Header/HomeHeader';
import HomeFooter from '../../HomePage/Footer/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import { getAllClinic, getAllCodeService, getDetailClinicService, getDetailSpecialtyService } from '../../../services/userService';
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
        await this.fetchDetailClinic()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            // this.dataDetailClinic = await getAllClinic();
        }

    }

    handleChangeProvince = (event) => {
        this.setState({ location: event.target.value }, () => {
            console.log(this.state.location);
            this.fetchDetailClinic();
        });
    };

    fetchDetailClinic = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicService({
                clinicId: id,
                location: this.state.location
            });
            console.log("check data get foirm detail", res.data.doctor);
            let listProvince = await getAllCodeService("PROVINCE");

            // console.log(listProvince);

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctor;
                    if (arr && arr.length > 0) {
                        arrDoctorId = arr.map(item => item.doctorId);
                    }
                }
                let dataProvince = listProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: "all",
                        value_en: "All",
                        value_vi: "Toàn Quốc",
                    })
                }
                this.setState({
                    dataDetailSpecialty: data.detail,
                    arrDoctorId: arrDoctorId,
                    listProvince: listProvince.data,
                });
            }
        }
    };
    render() {
        let { arrDoctorId, dataDetailSpecialty, location, listProvince } = this.state
        let { language } = this.props
        console.log("check clinic detail state", this.state);
        return (
            <React.Fragment >
                <HomeHeader />

                <div className='detail-clinic '>
                    <div className='container'>
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
                    </div>
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
                <div className='description-clinic-background'>
                    <div className='description-clinic container'>
                        <div className="clinic-details">
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                        </div>
                    </div>
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
