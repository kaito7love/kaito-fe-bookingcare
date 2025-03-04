import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi'
import { getScheduleByDate } from '../../../services/userService';
import moment from 'moment';
import { FormattedMessage } from "react-intl";
import BookingModel from './model/BookingModel';


class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      allDays: [],
      allAvailableTime: [],
      isOpenModel: false,
      dataTime: '',
    })
  }

  async componentDidMount() {
    let { language } = this.props
    let allDays = this.getArrDays(language)
    if (allDays && allDays.length > 0) {
      let doctorId = this.props.currentDoctorId;
      let date = allDays[0].value;
      let res = await getScheduleByDate(doctorId, date)

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : []
        })
      }
      this.sortDateTime()
    }
    this.setState({
      allDays: allDays
    })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language)
      this.setState({
        allDays: allDays
      })
    }
    if (prevProps.currentDoctorId !== this.props.currentDoctorId) {
      let allDays = this.getArrDays(this.props.language)
      let res = await getScheduleByDate(this.props.currentDoctorId, allDays[0].value)
      console.log(res);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : []
        })
      }
      this.sortDateTime()
    }

  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  getArrDays = (language) => {
    let allDays = []
    for (let i = 0; i < 7; i++) {
      let object = {}
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, 'days').format('DD/MM/YYYY')
          let today = `Hôm nay - ${ddMM}`
          object.label = today;
        } else {
          let vi = moment(new Date()).add(i, 'days').format('dddd - DD/MM/YYYY')
          object.label = this.capitalizeFirstLetter(vi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, 'days').format('DD/MM/YYYY')
          let today = `Today - ${ddMM}`
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM/YYYY')
        }
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
      allDays.push(object)
    }
    return allDays
  }

  handleOnchangeSelect = async (event) => {
    if (this.props.currentDoctorId && this.props.currentDoctorId !== -1) {
      let doctorId = this.props.currentDoctorId;
      let date = event.target.value;
      let res = await getScheduleByDate(doctorId, date)

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : []
        })
      }
      console.log("check get allAvailableTime", res);
      this.sortDateTime()
    }
  }
  sortDateTime = () => {
    let sortedData = this.state.allAvailableTime.sort((a, b) => {
      // Trích xuất số từ timeType, ví dụ: "T1" -> 1, "T2" -> 2
      let timeA = parseInt(a.timeType.slice(1));
      let timeB = parseInt(b.timeType.slice(1));
      return timeA - timeB;  // Sắp xếp tăng dần
    });

    // console.log(sortedData);
    this.setState({
      allAvailableTime: sortedData
    })
  }
  handleBookingModel = (time) => {

    this.setState({
      isOpenModel: true,
      dataTime: time
    });
  };

  toggleBookingModel = () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };
  render() {
    let { allDays, allAvailableTime } = this.state
    let { language } = this.props
    console.log("check state from scheule", this.state);

    return (
      <React.Fragment>
        <div >
          <div className='day-schedule'>
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {allDays && allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option
                      value={item.value}
                      key={index}
                    >
                      {item.label}
                    </option>
                  )
                })}
            </select>
          </div>

          <div className='schedule'>

            <div className='schedule-time'>
              <div className='calendar'>
                <i class="fas fa-calendar-alt"></i>
                <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
              </div>
              <div className='time-content'>
                {allAvailableTime && allAvailableTime.length > 0 ?
                  <>
                    <div className='time-cycle'>
                      {allAvailableTime.map((item, index) => {
                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.value_vi : item.timeTypeData.value_en
                        return (
                          <button className='btn btn-outline-primary btn-size' key={index}
                            onClick={() => this.handleBookingModel(item)}
                          >{timeDisplay}</button>
                        )
                      })}
                    </div>
                    <div className='book-free'>
                      <FormattedMessage id="patient.detail-doctor.text-first" />
                      <i class="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-doctor.text-last" />
                    </div>
                  </>

                  : <div><FormattedMessage id="patient.detail-doctor.schedule-none" /></div>
                }
              </div>
            </div>
          </div>

          <BookingModel
            isOpen={this.state.isOpenModel}
            toggleBookingModel={this.toggleBookingModel}
            dataTime={this.state.dataTime}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
