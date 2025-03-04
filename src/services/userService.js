import axios from "../axios";

let handleLoginAPI = (email, password) => {
    return axios.post(`/api/login`, { email, password });
};

const getAllUsers = (id) => {
    return axios.get(`/api/get-users?id=${id}`);
};

const createUserService = (data) => {
    return axios.post(`/api/create-user`, data);
};

const deleteUserService = (id) => {
    return axios.delete("/api/delete-user", { data: { id: id } });
};

const editUserService = (data) => {
    return axios.put("/api/edit-user", data);
};

const getAllCodeService = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorService = (limit) => {
    return axios.get(`/api/doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
    return axios.get("/api/get-all-doctors");
};

const saveInfoDoctorService = (data) => {
    return axios.post(`/api/post-info-doctor`, data);
};

const getDetailDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctors?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`);
};

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-doctor-extra-info?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctors?doctorId=${doctorId}`);
};

const postBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};

const postSpecialtyDescription = (data) => {
    return axios.post(`/api/post-specialty-description`, data);
};

const postClinicDescription = (data) => {
    return axios.post(`/api/post-clinic-description`, data);
};

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`);
};

const getDetailSpecialtyService = (data) => {
    return axios.get(`/api/get-detail-specialty?specialtyId=${data.specialtyId}&location=${data.location}`);
};

const getDetailClinicService = (data) => {
    return axios.get(`/api/get-detail-clinic?clinicId=${data.clinicId}&location=${data.location}`);
};

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctors?doctorId=${data.doctorId}&date=${data.date}`);
};

export {
    handleLoginAPI,
    getAllUsers,
    createUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorService,
    saveInfoDoctorService,
    getDetailDoctorService,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postBookingAppointment,
    postVerifyBookingAppointment,
    getAllPatientForDoctor,
    postSpecialtyDescription,
    getAllSpecialty,
    getDetailSpecialtyService,
    postClinicDescription,
};
