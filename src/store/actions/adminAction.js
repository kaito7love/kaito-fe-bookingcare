import actionTypes from "./actionTypes";
import * as userService from "../../services/userService";

import { toast } from 'react-toastify';


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await userService.getAllCodeService('gender');
            if (res && res.errCode === 0) {

                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
        }
    }
}
export const fetchGenderSuccess = (dataGender) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: dataGender,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await userService.getAllCodeService('position');
            if (res && res.errCode === 0) {

                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
        }
    }
}
export const fetchPositionSuccess = (dataPosition) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: dataPosition,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await userService.getAllCodeService('role');
            if (res && res.errCode === 0) {

                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
        }
    }
}
export const fetchRoleSuccess = (dataRole) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: dataRole,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers('All');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createUserService(data);
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success("Create User Successful !!!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (error) {
            dispatch(saveUserFailed())
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED,
})


export const deleteUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(data.id);
            if (res && res.errCode === 0) {
                toast.success("Delete User Successful !!!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getTopDoctorService('')
            // console.log(res);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log("FETCH_TOP_DOCTORS_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log("data from admin action", data);

            let res = await userService.editUserService(data);
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success("Update User Successful !!!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(dispatch(editUserFailed()))
            }
        } catch (error) {
            console.log("EDIT_USER_FAILED", error);
            dispatch(dispatch(editUserFailed()))
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllDoctorService()
            // console.log(res);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log("FETCH_ALL_DOCTORS_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}


export const saveInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.saveInfoDoctorService(data)
            // console.log("from action",res);

            if (res && res.errCode === 0) {
                // console.log("Update Detail Doctor as", res);
                toast.success("Update Detail Doctor Successful !!!")
                dispatch({
                    type: actionTypes.CREATE_INFO_DOCTORS_SUCCESS,
                })
            } else {
                console.log("Update Detail Doctor Error", res);
                toast.error("Update Detail Doctor Error !!!")
                dispatch({
                    type: actionTypes.CREATE_INFO_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log("Update Detail Doctor Error", error);
            toast.error("Update Detail Doctor Error !!!")
            dispatch({
                type: actionTypes.CREATE_INFO_DOCTORS_FAILED,
            })
        }
    }
}


export const fetchAllScheduleTime = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService('time')
            // console.log("from action time" ,res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                console.log("FETCH_ALL_SCHEDULE_TIME_FAILED", res);
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (error) {
            console.log("FETCH_ALL_SCHEDULE_TIME_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_DOCTOR_INFO_START })

            let resPrice = await userService.getAllCodeService('PRICE');
            let resPayment = await userService.getAllCodeService('PAYMENT');
            let resProvince = await userService.getAllCodeService('PROVINCE');
            let resSpecialty = await userService.getAllSpecialty()


            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                }
                dispatch(fetchDoctorInfoSuccess(data))
            } else {
                dispatch(fetchDoctorInfoFailed())
            }
        } catch (error) {
            dispatch(fetchDoctorInfoFailed())
        }
    }
}
export const fetchDoctorInfoSuccess = (dataDoctorInfo) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_SUCCESS,
    dataDoctorInfo: dataDoctorInfo,
})

export const fetchDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FAILED,
})