import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './BookingModel.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../../utils/emitter";
import ProfileDoctor from '../ProfileDoctor';
import { getProfileDoctorById, postBookingAppointment } from '../../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';
import { NumericFormat } from 'react-number-format';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModel extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            dataProfile: '',
            arrGender: '',

            fullName: '',
            phone: '',
            email: '',
            address: '',
            reason: '',
            gender: '',
            birthday: '',
            doctorId: '',
            timeType: '',

        })
    }

    async componentDidMount() {
        this.props.getGender()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let arrGender = this.props.genders;
            this.setState({
                arrGender: this.buildDataGender(arrGender),
            })
        }
        if (prevProps.dataTime.doctorId !== this.props.dataTime.doctorId) {
            let data = await this.getInfoDoctor(this.props.dataTime.doctorId)
            this.setState({
                dataProfile: data,
                doctorId: this.props.dataTime.doctorId,
            })
        }
        if (prevProps.genders !== this.props.genders) {
            let arrGender = this.props.genders;
            this.setState({
                arrGender: this.buildDataGender(arrGender),
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                console.log("check datatime", this.props.dataTime);

                this.setState({
                    doctorId: this.props.dataTime.doctorId,
                    timeType: this.props.dataTime.timeType,
                })
            }


        }
    }

    getInfoDoctor = async (id) => {
        let result = ''

        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }

        }
        return result
    }

    toggle = () => {
        this.props.toggleBookingModel();
    };

    buildDataGender = (data) => {
        let result = []
        let language = this.props.language

        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.value_vi : item.value_en
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }
    handleOnChangeInput = (event, id) => {
        // good setState
        let state = { ...this.state };
        state[id] = event.target.value;

        this.setState({
            ...state,
        });
    };
    handleChangeDataPicker = (date) => {
        this.setState({
            birthday: date[0]
        })

    }
    handleSelectOnChange = (gender) => {
        this.setState({ gender: gender }, () =>
            console.log(`Option selected:`, this.state.gender)
        );
    };
    handleConfirmBooking = async () => {
        // !data.email || !data.doctorId || !data.time_type || !data.date
        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postBookingAppointment({
            fullName: this.state.fullName,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            gender: this.state.gender.value,
            date: this.props.dataTime.date,
            birthday: date,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            // doctorId: this.props.dataTime.doctorId,
            // time_type: this.props.dataTime.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })
        if (res && res.errCode === 0) {
            this.setState({
                fullName: '',
                phone: '',
                email: '',
                address: '',
                reason: '',
                gender: '',
                birthday: '',
                timeType: '',

            })
            toast.success("Booking a new appointment successful!")
            this.props.toggleBookingModel()
        } else {
            toast.error("Booking error!")
        }
        console.log("check confirm button", this.state);

    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.value_vi : dataTime.timeTypeData.value_en

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            date = this.capitalizeFirstLetter(date);
            return `${time} - ${date}`

        }
        return ``
    }
    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let doctorName = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return doctorName
        }
        return ``
    }

    render() {
        let { language, toggleBookingModel, dataTime } = this.props
        // console.log("check state: ", this.state);
        let priceVi = this.state.dataProfile ? this.state.dataProfile.Doctor_info.priceTypeData.value_vi : ""
        let priceEn = this.state.dataProfile ? this.state.dataProfile.Doctor_info.priceTypeData.value_en : ""

        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '-1'
        return (
            <React.Fragment>
                <div className='container'>
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={this.toggle}
                        size="lg"
                    >
                        <ModalHeader toggle={this.toggle}>
                            <div className='title'>Thông tin đặt lịch khám bệnh</div>
                        </ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                />
                                <div>
                                    <FormattedMessage id="patient.extra.price" />
                                    {language === LANGUAGES.VI ?
                                        < NumericFormat
                                            value={priceVi}
                                            displayType='text'
                                            thousandSeparator=","
                                            suffix=' VND'
                                        /> : <NumericFormat
                                            value={priceEn}
                                            displayType='text'
                                            thousandSeparator=","
                                            prefix='$ '
                                        />}
                                </div>


                                <form action="/post-crud" method="post">
                                    <div className="row ">
                                        <div className="col-6">
                                            <label
                                                for="exampleInputEmail1"
                                                className="form-label"
                                            >
                                                Họ và Tên:
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="fullname"
                                                value={this.state.fullName}
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(
                                                        event,
                                                        "fullName"
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label
                                                for="exampleInputPassword1"
                                                className="form-label"
                                            >
                                                Số điện thoại:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(
                                                        event,
                                                        "phone"
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label className="form-label">
                                                Địa chỉ Email:
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(
                                                        event,
                                                        "email"
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label">
                                                Địa chỉ liên hệ:
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                value={this.state.address}
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(
                                                        event,
                                                        "address"
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-12">
                                            <label className="form-label">
                                                Lý do:
                                            </label>
                                            <input
                                                type="text"
                                                name="reason"
                                                className="form-control"
                                                value={this.state.reason}
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(
                                                        event,
                                                        "reason"
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label
                                                for="Gender"
                                                className="form-label"
                                            >
                                                Giới tính:
                                            </label>
                                            <Select
                                                className="input-info-left"
                                                value={this.state.gender}
                                                onChange={this.handleSelectOnChange}
                                                options={this.state.arrGender}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label
                                                for="birthday"
                                                className="form-label"
                                            >
                                                Ngày sinh:
                                            </label>
                                            <DatePicker
                                                className='form-control'
                                                onChange={this.handleChangeDataPicker}
                                                selected={this.state.birthday}
                                            />
                                        </div>


                                    </div>
                                </form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="btn btn-primary"
                                onClick={(event) => this.handleConfirmBooking(event)}
                            >
                                Create Appointment
                            </Button>{" "}
                            <Button color="btn btn-secondary" onClick={this.toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
