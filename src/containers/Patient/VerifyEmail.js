import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './VerifyEmail.scss'
import HomeHeader from '../HomePage/Header/HomeHeader';
import { postVerifyBookingAppointment } from '../../services/userService';
import OrderDetails from '../System/payment/OrderDetails';




class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            statusVerify: false,
            errCode: 0
        })
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { statusVerify, errCode } = this.state
        let { language } = this.props
        return (
            <React.Fragment>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='info-booking'>Appointment successfully confirmed!</div> :
                                <div className='info-booking'>The appointment does not exist or has already been confirmed!</div>
                            }
                        </div>

                        
                    }
                </div>
                <OrderDetails/>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
