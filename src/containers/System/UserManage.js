import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
import {
    getAllUsers,
    createUserService,
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalCreateUser from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalCreateUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUser();
    }

    getAllUser = async () => {
        let response = await getAllUsers("All");

        if (response && response.errCode === 0) {
            this.setState(
                {
                    arrUsers: response.users,
                },
                //start callback
                () => {
                    // console.log("data2 :", response);
                }
                //end callback
            );
        }
        // console.log("data1 :", response);
    };
    handleAddNewUser = () => {
        this.setState({
            isOpenModalCreateUser: true,
        });
    };
    toggleUserModel = () => {
        this.setState({
            isOpenModalCreateUser: !this.state.isOpenModalCreateUser,
        });
    };
    toggleUserEditModel = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    createUsers = async (data) => {
        try {
            let res = await createUserService(data);
            if (res && res.message.errCode !== 0) {
                alert(res.message.message);
            } else {
                await this.getAllUser();
                this.setState({
                    isOpenModalCreateUser: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUser();
            } else {
                console.log(res.message.message);
            }
        } catch (error) {
            console.log(error);
        }
        // console.log("delete", user);
    };

    handleEditUser = (user) => {
        console.log("edit by id:", user.id);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };

    updateUser = async (user) => {
        try {
            console.log("save user from edit", user);
            let res = await editUserService(user);
            if (res && res.message.errCode !== 0) {

                await this.getAllUser();
                this.setState({
                    isOpenModalEditUser: false,
                })
            } else {
                console.log("res user from edit", res);
            }

        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="title text-center">User Manage</div>
                <div className="mx-5 ">
                    <button
                        className="btn btn-primary btn-addNewUser"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i><span>Add New User</span>
                    </button>
                </div>
                <div>
                    <ModalCreateUser
                        isOpen={this.state.isOpenModalCreateUser}
                        toggleUserModel={this.toggleUserModel}
                        createUsers={this.createUsers}
                    />
                </div>
                <div>
                    {this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            toggleUserModel={this.toggleUserEditModel}
                            currentUser={this.state.userEdit}
                            updateUser={this.updateUser}
                        />
                    )}
                </div>
                <div className="users-table mt-4 mx-5">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    // console.log("check Map", index, item);
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
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
                                                    <i className="fas fa-user-edit"></i>
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
                                                    <i className="fas fa-user-slash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
