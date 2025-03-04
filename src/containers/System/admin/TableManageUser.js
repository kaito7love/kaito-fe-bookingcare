import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            searchQuery: '',
        };
    }

    async componentDidMount() {
        this.props.fetchAllUser();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.users !== this.props.users) {
            this.setState({ arrUsers: this.props.users });
        }
    }

    handleDeleteUser = async (user) => {
        await this.props.deleteUser(user);
    };

    handleEditUser = (user) => {
        this.props.handleEditUsers(user);
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
        console.log(event)
    };

    filterUsers = () => {
        let { arrUsers, searchQuery } = this.state;
        if (!searchQuery) return arrUsers;
        
        return arrUsers.filter(
            (user) =>
                (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                (user.firstName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                (user.lastName?.toLowerCase() || "").includes(searchQuery.toLowerCase())
        );
    };

    render() {
        let filteredUsers = this.filterUsers();
        console.log(filteredUsers);

        return (
            <React.Fragment>
                <div className="users-container">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by name, email"
                            value={this.state.searchQuery}
                            onChange={this.handleSearchChange}
                            className="search-input"
                            style={{ marginBottom: "10px" }}
                        />
                    </div>
                    <div className="users-table mt-4 mb-4">
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            {item.roleId === "R1" ? "Admin" :
                                             item.roleId === "R2" ? "Doctor" :
                                             item.roleId === "R3" ? "Patient" : "N/A"}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-success btn-Edit"
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <i className="fas fa-user-edit"></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-Delete"
                                                onClick={() => this.handleDeleteUser(item)}
                                            >
                                                <i className="fas fa-user-slash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.admin.users,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (data) => dispatch(actions.deleteUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
