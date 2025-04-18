import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import './ManageClinic.scss'
import { Remarkable } from "remarkable";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { postClinicDescription } from '../../../services/userService';



const md = new Remarkable();


class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            descriptionMarkdown: "", // Nội dung Markdown
            descriptionHTML: "",
            previewImage: '',
            isOpen: false,

            description: '',
            address: '',
            clinicName: '',
            allClinic: '',

        })
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = (e) => {
        const markdownText = e.target.value;
        const renderedHTML = md.render(markdownText); // Render Markdown sang HTML
        // console.log("Rendered HTML:", renderedHTML); // Log HTML vào console
        this.setState({
            descriptionMarkdown: markdownText,
            descriptionHTML: renderedHTML
        });

    };
    handleOnChangeImage = (event) => {
        let file = event.target.files;
        let data = file[0];
        if (file) {
            let objectUrl = URL.createObjectURL(data)
            this.setState({
                previewImage: objectUrl
            })
        }
    }

    previewImage = () => {
        if (this.state.previewImage !== "") {
            this.setState({
                isOpen: true
            })
        }
        console.log(this.state);

    }
    handleOnchangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        // console.log(copyState);
    }
    handleChange = async (selectedOption) => {
        this.setState({ clinic: selectedOption }, () =>
            console.log(`Option selected:`, this.state.clinic)
        );

        console.log(this.state);
    };
    handleSaveContentMarkdown = async () => {

        let res = await postClinicDescription(this.state)

        if (res && res.errCode === 0) {
            toast.success('Update Clinic Successful!')
            this.setState({
                descriptionMarkdown: "", // Nội dung Markdown
                descriptionHTML: "",
                previewImage: '',
                isOpen: false,

                description: '',
                clinicName: '',
                address: '',

            })
        } else {
            toast.error('Update Clinic Error!')
        }
        console.log("check state", this.state);
    }
    render() {
        console.log(this.props.match.params.id);
        console.log(this.state);

        let { language } = this.props
        return (
            <div className="container">
                <div className="title"><FormattedMessage id="admin.manage-clinic.title" /></div>
                <div className="markdown">
                    {/* <div className="markdown-title">Thêm thông tin bác sĩ:</div> */}
                    <div className="markdown-doctor-detail">
                        <div className="markdown-info-left">
                            <div><FormattedMessage id="admin.manage-clinic.choose-clinic" />:</div>
                            {/* <Select
                                placeholder={<FormattedMessage id="admin.manage-clinic.choose-clinic" />}
                                className="input-info-left"
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.doctorList}
                            /> */}
                            <div>
                                <Input rows={4} className="input-info-right"
                                    value={this.state.clinicName}
                                    onChange={(event) => { this.handleOnchangeText(event, 'clinicName') }}
                                />
                            </div>
                            <div><FormattedMessage id="admin.manage-clinic.clinic-address" />:</div>
                            <div>
                                <Input rows={4} className="input-info-right"
                                    value={this.state.address}
                                    onChange={(event) => { this.handleOnchangeText(event, 'address') }}
                                />
                            </div>

                            <div className="col-md-6">
                                <div className='preview'>
                                    <label className="form-label"><FormattedMessage id='form.image' /></label>
                                    <div><input id='images' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}></input>
                                        <label className='imagePreview' htmlFor='images'>
                                            <FormattedMessage id='form.imageLoad' />
                                            <i class="fas fa-upload"></i>
                                        </label>
                                    </div>
                                    <div className='previewImage'
                                        style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                        onClick={() => { this.previewImage() }}
                                    ></div>
                                    {this.state.isOpen === true &&
                                        <Lightbox
                                            mainSrc={this.state.previewImage}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div className="markdown-info-right">
                            <div><FormattedMessage id="admin.manage-clinic.clinic-description" /></div>
                            <textarea rows={4} className="input-info-right"
                                value={this.state.description}
                                onChange={(event) => { this.handleOnchangeText(event, 'description') }}
                            />

                        </div> */}

                    </div>

                    <div><FormattedMessage id="admin.manage-clinic.more-articles" />:</div>
                    <div className="markdown-content">
                        <textarea
                            className="input-markdown"
                            value={this.state.descriptionMarkdown}
                            onChange={this.handleEditorChange}
                        />
                        {/* Hiển thị Markdown HTML */}
                        <div className="output-markdown">
                            <div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }} />
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

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
