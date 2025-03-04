import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            email: "",
            phone: "",
            firstName: "",
            lastName: "",
            address: "",
            gender: "1",
            roleId: "2",
        };
        this.toggle = this.toggle.bind(this);
    }

    handleOnChangeInput = (event, id) => {
        // good setState
        // console.log(event.target.value, id);
        let state = { ...this.state };
        state[id] = event.target.value;

        this.setState(
            {
                ...state,
            },
            () => {
                // console.log(state);
            }
        );
    };

    toggle() {
        this.props.toggleUserModel();
    }
    
    componentDidMount() {
        let user = this.props.currentUser;

        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                gender: user.gender,
                roleId: user.roleId,
            });
        }
        console.log("modal from edit", this.props.currentUser);
    }

    validateInput = () => {
        let isValid = true;
        let arrInput = [
            "email",
            "firstName",
            "lastName",
            "address",
            "gender",
            "roleId",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing Information: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleUpdateUser(event) {
        let isValid = this.validateInput();
        if (isValid) {
            //  call api edit new model
            this.props.updateUser(this.state);
            // console.log("data save", this.state);
        }
    }

    render() {
        // console.log(
        //     this.props,
        //     "edit from edit user",
        //     this.props.currentUser,
        // );

        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.toggle}
                    className={this.props.className}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <form action="/post-crud" method="post">
                                <div className="row ">
                                    <div className="col-6">
                                        <label
                                            for="exampleInputEmail1"
                                            className="form-label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={(event) => {
                                                this.handleOnChangeInput(
                                                    event,
                                                    "email"
                                                );
                                            }}
                                            disabled="true"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label
                                            for="exampleInputPassword1"
                                            className="form-label"
                                        >
                                            Phone
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
                                            Firstname
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={(event) => {
                                                this.handleOnChangeInput(
                                                    event,
                                                    "firstName"
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">
                                            Lastname
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={(event) => {
                                                this.handleOnChangeInput(
                                                    event,
                                                    "lastName"
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Address
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
                                    <div className="col-3">
                                        <label
                                            for="Gender"
                                            className="form-label"
                                        >
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            className="form-select"
                                            value={this.state.gender}
                                            onChange={(event) => {
                                                this.handleOnChangeInput(
                                                    event,
                                                    "gender"
                                                );
                                            }}
                                        >
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <label
                                            for="Role"
                                            className="form-label"
                                        >
                                            Role
                                        </label>
                                        <select
                                            name="roleId"
                                            className="form-select"
                                            value={this.state.roleId}
                                            onChange={(event) => {
                                                this.handleOnChangeInput(
                                                    event,
                                                    "roleId"
                                                );
                                            }}
                                            disabled
                                        >
                                            <option value="1">Admin</option>
                                            <option value="2">Doctor</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <button type="submit" className="btn btn-primary">
                                Submit
                            </button> */}
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="btn btn-primary"
                            onClick={(event) => this.handleUpdateUser(event)}
                        >
                            Save Change
                        </Button>{" "}
                        <Button color="btn btn-secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
