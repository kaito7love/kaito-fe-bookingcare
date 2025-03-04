import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allSchedules: [],
    
    allDoctorInfo: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = []
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data
            // console.log("from reducer",state.allDoctors);            
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
            state.allSchedules = action.dataTime
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
            state.allSchedules = []
            return {
                ...state,
            }

        case actionTypes.FETCH_DOCTOR_INFO_SUCCESS:
            state.allDoctorInfo = action.dataDoctorInfo
            // console.log("check action from admin ruducer",action,state);
            
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_INFO_FAILED:
            state.allDoctorInfo = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;