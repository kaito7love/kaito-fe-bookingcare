import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeHeader from './Header/HomeHeader';
import SearchHeader from './Search/SearchHeader';
import Specialty from './Section/Specialty';
import Doctor from './Section/Doctor';
import MedicalFacility from './Section/MedicalFacility';
import HomeFooter from './Footer/HomeFooter';
import SocialMedia from './Section/SocialMedia';

class HomePage extends Component {


    render() {
        return (
            <div>
                <HomeHeader />
                <SearchHeader />
                <Specialty />
                <Doctor />
                <MedicalFacility />

                <SocialMedia />

                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
