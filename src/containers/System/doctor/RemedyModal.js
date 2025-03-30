import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './RemedyModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from 'lodash';

import { toast } from 'react-toastify';
import moment from 'moment';

class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            doctorId: '',
            patientId: '',
            email: '',
            img: '',
            selectedFile: '',
        })
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.dataRemedy !== this.props.dataRemedy) {
            this.setState({
                email: this.props.dataRemedy.patientEmail,
                doctorId: this.props.dataRemedy.doctorId,
                patientId: this.props.dataRemedy.patientId,
            })
        }
    }

    toggle = () => {
        this.props.toggleRemedyModel();
    };


    handleOnChangeInput = (event, id) => {
        // good setState
        let state = { ...this.state };
        state[id] = event.target.value;

        this.setState({
            ...state,
        });
    };

    handleSend = () => {
        this.props.sendRemedy(this.state)
        this.toggle()
    }
    handleOnChangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                img: objectUrl,
                selectedFile: file,
            })
        }
    }

    render() {
        let { language } = this.props
        let { email } = this.state
        // console.log(this.state);

        return (
            <React.Fragment>
                <div className='container'>
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={this.toggle}
                        size="md"
                        centered={true}
                    >
                        <ModalHeader toggle={this.toggle}>
                            <div className='title'><FormattedMessage id='form.remedy' /></div>
                        </ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <form action="/post-crud" method="post">
                                    <div className="row ">
                                        <div className="col-12">
                                            <label className="form-label">
                                                <FormattedMessage id='form.email' />:
                                            </label>
                                            <input type="email" name="email" className="form-control" value={email}
                                                onChange={(event) => { this.handleOnChangeInput(event, "email"); }}
                                            />
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className="col-12">
                                            <label className="form-label">
                                            <FormattedMessage id='form.file' />:
                                            </label>
                                            <input type="file" name="file" className="form-control"
                                                onChange={(event) => this.handleOnChangeImage(event)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="btn btn-primary"
                                onClick={() => this.handleSend()}
                            >
                                Send
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
