import React, { Component, isValidElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, manageActions } from '../../../utils';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss'
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImage: '',
            isOpen: false,

            email: "",
            password: '',
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            position: "",
            gender: "",
            role: "",
            image: '',

            action: '',
            userEditId: '',
        }
    }


    async componentDidMount() {
        this.props.getGender()
        this.props.getPosition()
        this.props.getRole()
    }

    componentDidUpdate(prevProps, prevStates, snapShot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genders: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : 'null',
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positions: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : 'null',
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roles: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : 'null',
            })
        }
        if (prevProps.users !== this.props.users) {
            let arrGender = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;

            this.setState({
                email: "",
                password: '',
                firstName: "",
                lastName: "",
                phone: "",
                address: "",
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : 'null',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : 'null',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : 'null',
                image: '',
                action: manageActions.CREATE
            })
        }
    }

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
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value
        this.setState({
            ...copyState
        },)

    }

    validateInput = () => {
        let isValid = true;
        let check = ['email', 'password', 'firstName', 'lastName', 'phone', 'address']
        for (let i = 0; i < check.length; i++) {
            if (!this.state[check[i]]) {
                isValid = false;
                alert("Missing " + check[i]);
                break
            }
        }
        return isValid;
    }

    handleSave = async () => {
        let isValid = this.validateInput();
        console.log(isValid);
        let { action } = this.state
        console.log(action);

        if (action === manageActions.CREATE) {
            if (isValid) {
                await this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender,
                    address: this.state.address,
                    phone: this.state.phone,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    image: this.state.image,
                })
            }
        }
        if (action === manageActions.EDIT) {
            await this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                address: this.state.address,
                phone: this.state.phone,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.image,
            })
        }

    }
    handleEditUsers = (user) => {
        console.log("user form main", user);
        this.setState({
            email: user.email,
            password: "xxxxxxxx",
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            address: user.address,
            phone: user.phone,
            role: user.roleId,
            position: user.positionId,
            image: user.image,
            action: manageActions.EDIT,
            userEditId: user.id,
        })
        console.log("user form main1", user);
    }

    render() {
        let { email, password, firstName, lastName, phone, address, gender, role, image } = this.state
        let genders = this.state.genders;
        let positions = this.state.positions;
        let roles = this.state.roles;
        let language = this.props.language;
        return (
            <>
                <div className="user-redux-container" >
                    <div className='title'>Admin Manage</div>

                    <div className='user-redux-body'>
                        <div className='container'>
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='form.email' /></label>
                                    <input type="text" className="form-control"
                                        disabled={this.state.action === manageActions.EDIT ? true : false}
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='form.password' /></label>
                                    <input type="password" className="form-control"
                                        disabled={this.state.action === manageActions.EDIT ? true : false}
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='form.firstName' /></label>
                                    <input type="text" className="form-control"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='form.lastName' /></label>
                                    <input type="text" className="form-control"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='form.phone' /></label>
                                    <input type="text" className="form-control"
                                        value={phone}
                                        onChange={(event) => { this.onChangeInput(event, 'phone') }} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='form.address' /></label>
                                    <input type="text" className="form-control"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='form.gender' /></label>
                                    <select className="form-select" value={this.state.gender}
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                // console.log(item);
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                                    </option>
                                                )
                                            })};
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='form.role' /></label>
                                    <select className="form-select" value={this.state.role}
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                // console.log(item);
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                                    </option>
                                                )
                                            })};
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='form.position' /></label>
                                    <select className="form-select" value={this.state.position}
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {    
                                                // console.log(item);
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                                    </option>
                                                )
                                            })};
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='form.image' /></label>
                                    <div className='preview'>
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
                                    </div>

                                </div>
                                <div className="col-12">
                                    <button type="button"
                                        className={this.state.action === manageActions.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => { this.handleSave() }}>
                                        {this.state.action === manageActions.EDIT ? <FormattedMessage id='form.edit' /> : <FormattedMessage id='form.create' />}

                                    </button>
                                </div>
                            </form>
                            <div className="col-12">
                                <TableManageUser
                                    handleEditUsers={this.handleEditUsers}
                                    action={this.state.action}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
        getPosition: () => dispatch(actions.fetchPositionStart()),
        getRole: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
        editUser: (data) => dispatch(actions.editUser(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
