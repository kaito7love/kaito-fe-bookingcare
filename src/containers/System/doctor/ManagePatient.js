import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import * as actions from "../../../store/actions";
import _ from "lodash";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import { cancelBookingService, getAllPatientForDoctor, sendBillService } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";
import RemedyModal from "./RemedyModal";


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            selectedDoctor: {},
            doctorList: '',
            isOpenRemedyModal: false,
            dataRemedy: {},
        };
    }

    async componentDidMount() {
        this.setState({
            selectedDoctor: { value: this.props.user.id }
        })
        let { currentDate, selectedDoctor } = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getPatientData(selectedDoctor.value, formatedDate)
        this.props.fetchAllDoctor();


    }

    getPatientData = async (selectedDoctor, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: selectedDoctor,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
        // console.log(res);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({ doctorList: dataSelect });
        }


    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () => {
            // console.log(`Option selected:`, this.state.selectedDoctor)
        });
        // let res = await getDetailDoctorService(selectedDoctor.value)
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getPatientData(selectedDoctor.value, formatedDate)
    };
    handleChangeDataPicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { currentDate, selectedDoctor } = this.state
            let formatedDate = new Date(currentDate).getTime()
            this.getPatientData(selectedDoctor.value, formatedDate)
        })

    }
    buildDataInputSelect = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                option.value = item.id
                result.push(option)
            })
        }
        return result;
    }

    handleBtnDone = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            patientEmail: item.patientData.email,
        }
        // console.log(data);
        this.setState({
            isOpenRemedyModal: true,
            dataRemedy: data,
        })

    }

    handleBtnCancel = async (item) => {

        let formatedDate = new Date(this.state.currentDate).getTime()
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            patientEmail: item.patientData.email,
            date: formatedDate
        }
        let res = await cancelBookingService({
            data
        })
        if (res.data && res.data.errCode === 0) {
            this.setState({
                dataPatient: res.data.data
            })
        }
        // console.log(res);

    }

    sendRemedy = async (data) => {
        let formData = new FormData();
        formData.append("image", data.selectedFile);

        let formatedDate = new Date(this.state.currentDate).getTime()
        data.date = formatedDate
        let res = await sendBillService({
            data,
            language: this.props.language,
            formData: formData,
        })
        console.log(res.data);
        if (res.data && res.data.errCode === 0) {
            this.setState({
                dataPatient: res.data.data
            })
        }
    }

    toggleRemedyModel = () => {
        this.setState({
            isOpenRemedyModal: !this.state.isOpenRemedyModal,
            dataRemedy: {},
        });
    };
    render() {
        let { dataPatient, isOpenRemedyModal, dataRemedy } = this.state
        let { language, user } = this.props
        // console.log(dataPatient);
        return (
            <>
                <div className="container">
                    <div className="title"><FormattedMessage id="doctor.manage-patient" /></div>
                    <div className="row">
                        {user.roleId === "R1" && (
                            <>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="doctor.choose-doctor" /></label>
                                    <Select
                                        className="input-info-left"
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChange}
                                        options={this.state.doctorList}
                                    />
                                </div>
                            </>
                        )}
                        <div className="col-6">
                            <label>Chọn Ngày Khám: </label>
                            <DatePicker
                                className='form-control  mt-2'
                                onChange={this.handleChangeDataPicker}
                                selected={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12">
                            <div className="users-table mt-4">
                                <table id="customers">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">{language === LANGUAGES.VI ? `Thời gian` : `Time`}</th>
                                            <th scope="col">{language === LANGUAGES.VI ? `Họ và Tên` : `Full Name`}</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">{language === LANGUAGES.VI ? `Số điện thoại` : `Phone Number`}</th>
                                            <th scope="col">{language === LANGUAGES.VI ? `Giới tính` : `Gender`}</th>
                                            <th scope="col">{language === LANGUAGES.VI ? `Trang Thái` : `Status`}</th>
                                            <th scope="col">{language === LANGUAGES.VI ? `Thao tác` : `Action`}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                // console.log("check Map", index, item);
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.value_vi : item.timeTypeDataPatient.value_en
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.value_vi : item.patientData.genderData.value_en
                                                let status = language === LANGUAGES.VI ? item.statusDataPatient.value_vi : item.statusDataPatient.value_en
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td> {time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.email}</td>
                                                        <td>{item.patientData.phone}</td>
                                                        <td> {gender}</td>
                                                        <td> {status}</td>
                                                        <td>
                                                            <div className="btn-size">
                                                                {item.statusId === "S2" && (
                                                                    <>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-success btn-Edit"
                                                                            onClick={() => this.handleBtnDone(item)}
                                                                        >
                                                                            {language === LANGUAGES.VI ? `Xác Nhận` : `Done`}
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-danger btn-Edit"
                                                                            onClick={() => this.handleBtnCancel(item)}
                                                                        >
                                                                            {language === LANGUAGES.VI ? `Hủy` : `Cancel`}
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }) :
                                            <tr>
                                                <td >
                                                    {language === LANGUAGES.VI ? `Không có dữ liệu` : `No data`}
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
                <RemedyModal
                    isOpen={isOpenRemedyModal}
                    dataRemedy={dataRemedy}
                    toggleRemedyModel={this.toggleRemedyModel}
                    sendRemedy={this.sendRemedy}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allSchedules: state.admin.allSchedules,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
