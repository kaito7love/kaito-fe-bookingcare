import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { dateFormat, LANGUAGES, manageActions } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import _ from "lodash";
import { toast } from "react-toastify";
import { saveBulkScheduleDoctor } from '../../../services/userService'


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            doctorList: '',
            scheduleTime: [],
            currentDate: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({ doctorList: dataSelect });
        }
        if (prevProps.allSchedules !== this.props.allSchedules) {
            let data = this.props.allSchedules
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))

                this.setState({ scheduleTime: data });
            }
        }
    }

    handleClickBtnTime = (time) => {
        let { scheduleTime } = this.state
        if (scheduleTime && scheduleTime.length > 0) {
            scheduleTime = scheduleTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                scheduleTime: scheduleTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { scheduleTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!currentDate) {
            toast.error("Invalid Date!")
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid Doctor!")
            return
        }

        console.log(currentDate);

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime()

        if (scheduleTime && scheduleTime.length > 0) {
            let selectedTime = scheduleTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = item.keyMap
                    result.push(object)
                })
            } else {
                toast.error("Invalid Selected Time!")
                return
            }
        }
        console.log("from ract", formatedDate);
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: +formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success("Save info successful!")
        } else{
            toast.error("Save info error!")
        }

        console.log("from ract", res);

    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
        let res = await getDetailDoctorService(selectedDoctor.value)

        console.log(res);

    };
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
    handleChangeDataPicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    render() {
        console.log("log state", this.state);
        // console.log("log props", this.props);
        let { scheduleTime } = this.state
        let { language } = this.props
        let today = new Date(new Date().setDate(new Date().getDate()));// limit create new schedule today
        return (
            <div className="container">
                <div className="title"><FormattedMessage id="doctor.manage-schedule" /></div>
                <div className="row">
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="doctor.choose-doctor" /></label>
                        <Select
                            className="input-info-left"
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.doctorList}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="doctor.choose-date" /></label>
                        <div>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleChangeDataPicker}
                                selected={this.state.currentDate}
                                minDate={today}
                            />
                        </div>

                    </div>
                    <div className="col-12 pick-hour-container">
                        {scheduleTime && scheduleTime.length > 0 &&
                            scheduleTime.map((item, index) => {
                                return (
                                    <button className={item.isSelected === true ? "btn btn-outline-primary btn-schedule active" : "btn btn-outline-primary btn-schedule"}
                                        key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                    </button>
                                )
                            })}
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary"
                            onClick={() => this.handleSaveSchedule()}
                        >
                            <FormattedMessage id="doctor.Save" />
                        </button>
                    </div>

                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allSchedules: state.admin.allSchedules,
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
