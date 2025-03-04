import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import * as actions from "../../../store/actions";

import _ from "lodash";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        };
    }

    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getPatientData(user, formatedDate)

    }

    getPatientData = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
        console.log(res);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({ doctorList: dataSelect });
        }

    }
    handleChangeDataPicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            let formatedDate = new Date(currentDate).getTime()
            this.getPatientData(user, formatedDate)
        })

    }

    render() {
        let { dataPatient } = this.state
        console.log(dataPatient);
        
        return (
            <>
                <div className="container">
                    <div className="title"><FormattedMessage id="doctor.manage-patient" /></div>
                    <div className="row">
                        <div className="col-4">
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
                                            <th scope="col">Thời Gian</th>
                                            <th scope="col">Họ và Tên</th>
                                            <th scope="col">Giới tính</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                // console.log("check Map", index, item);
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.timeTypeDataPatient.value_vi}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.patientData.genderData.value_vi}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-success btn-Edit"
                                                                onClick={() =>
                                                                    this.handleEditUser(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Xác Nhận
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger btn-Delete"
                                                                onClick={() =>
                                                                    this.handleDeleteUser(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Gừi hóa đơn
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            }) :
                                            <tr>
                                                <td >
                                                    No data
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
