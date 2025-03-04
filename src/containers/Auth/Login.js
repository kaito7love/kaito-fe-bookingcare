import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginAPI } from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
        // console.log(event.target.value);
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
        // console.log(event.target.value);
    };

    handleLogin = async () => {
        this.setState({
            loginError: "",
        });
        // console.log(this.state);
        try {
            let data = await handleLoginAPI(
                this.state.username,
                this.state.password
            );
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    loginError: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log("login success");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        loginError: error.response.data.message,
                    });
                }
            }
            console.log(error);
        }
    };
    render() {
        // const { username, password, loginError } = this.state;
        // const { lang } = this.props;

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 login-content row">
                            <div className="col-12 form-group login-input">
                                <label>Username</label>
                                <input
                                    placeholder="Enter your Username"
                                    type="text"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={(event) => {
                                        this.handleOnChangeUsername(event);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            this.handleLogin();
                                        }
                                    }}
                                ></input>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Password</label>
                                <input
                                    placeholder="Enter your Password"
                                    type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.handleOnChangePassword(event);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            this.handleLogin();
                                        }
                                    }}
                                ></input>
                            </div>
                            <div className="col-12" style={{ color: "red" }}>
                                {this.state.loginError}
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        this.handleLogin();
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            this.handleLogin();
                                        }
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="col-12 forgot-signup">
                                <span className="forgot">
                                    Forgot your password?
                                </span>
                                {/* <span className="signup">Sign Up</span> */}
                            </div>
                            <div className="col-12 text-center">
                                <span>Or Login With:</span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
