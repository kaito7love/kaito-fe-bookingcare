
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import { Remarkable } from "remarkable"; // Import Remarkable
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { LANGUAGES, manageActions } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";
const md = new Remarkable(); // Khởi tạo Remarkable

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // markdown data
            contentMarkdown: "", // Nội dung Markdown
            contentHTML: "", // HTML đã được render từ Markdown
            selectedDoctor: '',
            description: '',
            doctorList: '',
            hasData: '',


            // doctor-info data
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',

        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getDoctorInfo();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'users')
            this.setState({ doctorList: dataSelect });
        }
        if (prevProps.allDoctorInfo !== this.props.allDoctorInfo) {
            let listPrice = this.buildDataInputSelect(this.props.allDoctorInfo.resPrice, 'price')
            let listPayment = this.buildDataInputSelect(this.props.allDoctorInfo.resPayment, 'payment')
            let listProvince = this.buildDataInputSelect(this.props.allDoctorInfo.resProvince, 'province')
            let listSpecialty = this.buildDataInputSelect(this.props.allDoctorInfo.resSpecialty, 'specialty')
            // console.log("data lang", this.props.allDoctorInfo.resSpecialty);
            this.setState({
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                listSpecialty: listSpecialty,
            });
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "users")
            let listPrice = this.buildDataInputSelect(this.props.allDoctorInfo.resPrice, 'price')
            let listPayment = this.buildDataInputSelect(this.props.allDoctorInfo.resPayment, 'payment')
            let listProvince = this.buildDataInputSelect(this.props.allDoctorInfo.resProvince, 'province')
            let listSpecialty = this.buildDataInputSelect(this.props.allDoctorInfo.resSpecialty, 'specialty')
            // console.log("data lang", this.props.allDoctorInfo.resSpecialty);
            this.setState({
                doctorList: dataSelect,
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                listSpecialty: listSpecialty,
            });
        }
    }
    handleOnchangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        // console.log(copyState);
    }
    handleEditorChange = (e) => {
        const markdownText = e.target.value;
        const renderedHTML = md.render(markdownText); // Render Markdown sang HTML
        // console.log("Rendered HTML:", renderedHTML); // Log HTML vào console
        this.setState({
            contentMarkdown: markdownText,
            contentHTML: renderedHTML
        });

    };
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
        let { listPrice, listPayment, listProvince,listSpecialty } = this.state
        let res = await getDetailDoctorService(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {

            let priceId = '',
                paymentId = '',
                provinceId = '',
                specialtyId = '',
                nameClinic = '',
                addressClinic = '',
                note = '',
                selectedPrice = '',
                selectedPayment = '',
                selectedProvince = '',
                selectedSpecialty = ''

            if (res.data.Doctor_info) {

                nameClinic = res.data.Doctor_info.nameClinic;
                addressClinic = res.data.Doctor_info.addressClinic;
                note = res.data.Doctor_info.note;

                priceId = res.data.Doctor_info.priceId;
                paymentId = res.data.Doctor_info.paymentId;
                provinceId = res.data.Doctor_info.provinceId;
                specialtyId = res.data.Doctor_info.specialtyId;

                selectedPrice = listPrice.find(item => item?.value === priceId)
                selectedPayment = listPayment.find(item => item?.value === paymentId)
                selectedProvince = listProvince.find(item => item?.value === provinceId)
                selectedSpecialty = listSpecialty.find(item => item?.value === specialtyId)

            }
            this.setState({
                contentMarkdown: res.data.Markdown.contentMarkdown,
                contentHTML: res.data.Markdown.contentHTML,
                description: res.data.Markdown.description,
                hasData: true,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasData: false,
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                nameClinic: '',
                addressClinic: '',
                note: ''
            });
        }
        console.log(this.state);
    };

    handleChangeDoctorInfo = async (selectedOption, name) => {
        let nameState = name.name;
        let copyState = { ...this.state }
        copyState[nameState] = selectedOption
        this.setState({
            ...copyState
        })
        // console.log(copyState);
    }

    handleSaveContentMarkdown = () => {
        this.props.saveInfoDoctor({
            doctorId: this.state.selectedDoctor.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '1',
            specialtyId: this.state.selectedSpecialty.value,
        })
        // console.log("check state", this.state);
    }

    buildDataInputSelect = (data, type) => {
        let result = []
        // console.log("check data build",data ,type);
        let { language } = this.props
        if (data && data.length > 0) {
            if (type === 'users') {
                data.map((item, index) => {
                    let option = {};
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    option.value = item.id
                    result.push(option)
                })
            }
            if (type === 'price') {
                data.map((item, index) => {
                    let option = {};
                    let labelVi = `${item.value_vi} VND`
                    let labelEn = `${item.value_en} USD`
                    option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    option.value = item.keyMap
                    result.push(option)
                })
            }
            if (type === 'payment' || type === 'province') {
                data.map((item, index) => {
                    let option = {};
                    let labelVi = item.value_vi
                    let labelEn = item.value_en
                    option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    option.value = item.keyMap
                    result.push(option)
                })
            }

            if (type === 'specialty') {
                data.map((item, index) => {
                    let option = {};
                    let labelVi = item.name
                    let labelEn = item.description
                    option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    option.value = item.id
                    result.push(option)
                })
            }
        }
        return result;
    }
    render() {
        let { hasData } = this.setState
        // console.log(this.state);
        // console.log(this.props);
        return (
            <div className="container">
                <div className="title"><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className="markdown">
                    {/* <div className="markdown-title">Thêm thông tin bác sĩ:</div> */}
                    <div className="markdown-doctor-detail">
                        <div className="markdown-info-left">
                            <div><FormattedMessage id="admin.manage-doctor.choose-doctor" />:</div>
                            <Select
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                                className="input-info-left"
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.doctorList}
                            />
                        </div>
                        <div className="markdown-info-right">
                            <div><FormattedMessage id="admin.manage-doctor.doctor-info" /></div>
                            <textarea rows={4} className="input-info-right"
                                value={this.state.description}
                                onChange={(event) => { this.handleOnchangeText(event, 'description') }}
                            />
                        </div>
                    </div>
                    <div className="doctor-info row">
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.price" />:</label>
                            <Select
                                className="input-info-left"
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                name='selectedPrice'
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.payment" />:</label>
                            <Select
                                className="input-info-left"
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                name='selectedPayment'

                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.province" />:</label>
                            <Select
                                className="input-info-left"
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                name='selectedProvince'
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.nameClinic" />:</label>
                            <input className="form-control"
                                value={this.state.nameClinic}
                                onChange={(event) => { this.handleOnchangeText(event, 'nameClinic') }}
                            ></input>
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.addressClinic" />:</label>
                            <input className="form-control"
                                value={this.state.addressClinic}
                                onChange={(event) => { this.handleOnchangeText(event, 'addressClinic') }}
                            ></input>
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.note" />:</label>
                            <input className="form-control"
                                value={this.state.note}
                                onChange={(event) => { this.handleOnchangeText(event, 'note') }}
                            ></input>
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.specialty" />:</label>
                            {/* <label>Chọn Chuyên Khoa:</label> */}
                            <Select
                                className="input-info-left"
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeDoctorInfo}
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.select-clinic" />:</label>
                            {/* <label>Cơ sở Y Tế:</label> */}
                            <Select
                                className="input-info-left"
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeDoctorInfo}
                                options={this.state.listClinic}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                                name='selectedClinic'
                            />
                        </div>

                    </div>

                    <div><FormattedMessage id="admin.manage-doctor.more-articles" />:</div>
                    <div className="markdown-content">
                        <textarea
                            className="input-markdown"
                            value={this.state.contentMarkdown}
                            onChange={this.handleEditorChange}
                        />
                        {/* Hiển thị Markdown HTML */}
                        <div className="output-markdown">
                            <div dangerouslySetInnerHTML={{ __html: this.state.contentHTML }} />
                        </div>
                    </div>

                    <div className="col-12">
                        <button
                            type="button"
                            className={this.state.hasData === true ? "btn btn-warning" : 'btn btn-primary'}
                            onClick={() => this.handleSaveContentMarkdown()}
                        >
                            {this.state.hasData === true ? <FormattedMessage id="admin.manage-doctor.save" /> : <FormattedMessage id="admin.manage-doctor.add" />}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allDoctors: state.admin.allDoctors,
    allDoctorInfo: state.admin.allDoctorInfo,
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
    getDoctorInfo: () => dispatch(actions.getDoctorInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
