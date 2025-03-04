import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import { LANGUAGES } from '../../../utils';
import { getExtraInfoDoctorById } from '../../../services/userService'
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            isShowPriceInfo: false,
            extraDoctorData: ''
        })
    }

    async componentDidMount() {

        let res = await getExtraInfoDoctorById(this.props.currentDoctorId)
        // console.log(res);

        if (res && res.errCode === 0) {
            this.setState({
                extraDoctorData: res.data
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.currentDoctorId !== this.props.currentDoctorId) {
            let res = await getExtraInfoDoctorById(this.props.currentDoctorId)
            // console.log(res);

            if (res && res.errCode === 0) {
                this.setState({
                    extraDoctorData: res.data
                })
            }
        }
    }

    showDetailInfo = (status) => {
        this.setState({
            isShowPriceInfo: status
        })
    }
    render() {
        // console.log(this.props.match.params.id);
        let { language } = this.props
        let { isShowPriceInfo, extraDoctorData } = this.state

        return (
            <React.Fragment>

                <div className="clinic-info">
                    {/* Address Section */}
                    <div className="section">
                        <h2 className='clinic-title'><FormattedMessage id="patient.extra.clinic-address" /></h2>
                        <p className="clinic-name">
                            {extraDoctorData && extraDoctorData.nameClinic ? extraDoctorData.nameClinic : ""}
                        </p>
                        <p className="clinic-address">
                            {extraDoctorData && extraDoctorData.addressClinic ? extraDoctorData.addressClinic : ""}
                        </p>
                    </div>
                    {isShowPriceInfo === false &&
                        <div className="section">
                            <h2><FormattedMessage id="patient.extra.price" />
                                <span className="price-value">
                                    {extraDoctorData && extraDoctorData.priceTypeData && language === LANGUAGES.VI
                                        && <NumericFormat
                                            value={extraDoctorData.priceTypeData.value_vi}
                                            displayType='text'
                                            thousandSeparator=","
                                            suffix=' VND'
                                        />}
                                    {extraDoctorData && extraDoctorData.priceTypeData && language === LANGUAGES.EN
                                        && <NumericFormat
                                            value={extraDoctorData.priceTypeData.value_en}
                                            displayType='text'
                                            thousandSeparator=","
                                            prefix='$ '
                                        />}
                                </span>
                            </h2>
                            <span class="toggle" onClick={(status) => this.showDetailInfo(true)}><FormattedMessage id="patient.extra.more" /></span>
                        </div>
                    }
                    {isShowPriceInfo === true &&
                        <div className="section">
                            <h2><FormattedMessage id="patient.extra.price" /></h2>
                            <div className='section-price'>
                                <span className="price-label"><FormattedMessage id="patient.extra.price" />  </span>
                                <span className="price-value">

                                    {extraDoctorData && extraDoctorData.priceTypeData && language === LANGUAGES.VI
                                        && <NumericFormat
                                            value={extraDoctorData.priceTypeData.value_vi}
                                            displayType='text'
                                            thousandSeparator=","
                                            suffix=' VND'
                                        />}
                                    {extraDoctorData && extraDoctorData.priceTypeData && language === LANGUAGES.EN
                                        && <NumericFormat
                                            value={extraDoctorData.priceTypeData.value_en}
                                            displayType='text'
                                            thousandSeparator=","
                                            prefix='$ '
                                        />}
                                </span>
                                {/* <div className='note'><FormattedMessage id="patient.extra.note" />{extraDoctorData && extraDoctorData.note ? extraDoctorData.note : ""}</div> */}
                                <div className='note'>{extraDoctorData && extraDoctorData.note && (
                                    <div className=''>
                                        <FormattedMessage id="patient.extra.note" />
                                        {extraDoctorData.note}
                                    </div>
                                )}
                                </div>
                                <div className="payment-methods">
                                    <FormattedMessage id="patient.extra.payment" />
                                    {extraDoctorData && extraDoctorData.priceTypeData && language === LANGUAGES.VI
                                        && extraDoctorData.paymentTypeData.value_vi}
                                    {extraDoctorData && extraDoctorData.priceTypeData && language === LANGUAGES.EN
                                        && extraDoctorData.paymentTypeData.value_en}

                                </div>
                            </div>
                            <span class="toggle" onClick={(status) => this.showDetailInfo(false)}><FormattedMessage id="patient.extra.close" /></span>
                        </div>
                    }
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
