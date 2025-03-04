import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/Header/HomeHeader';
import HomeFooter from '../../HomePage/Footer/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import { getAllCodeService, getDetailSpecialtyService } from '../../../services/userService';
import _ from 'lodash';
import Select from 'react-select';
import { LANGUAGES, LanguageUtils } from '../../../utils';

class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            arrDoctorId: [],
            dataDetailClinic: {},
            location: 'all',
            listProvince: [],
        })
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }


    
    render() {
        let { arrDoctorId, dataDetailSpecialty, location, listProvince } = this.state
        let { language } = this.props
        // console.log("check specialty state", this.state);
        return (
            <React.Fragment >
                <HomeHeader />
                
                <HomeFooter />
            </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
