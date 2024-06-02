
import axiosInstance from "../axios";
const url = 'verify/'


let loginService = {
    loginUser,
    otpUser,
    logOut,
}

// Login user
function loginUser(config, data) {
    return axiosInstance.post(url + 'mobile_no', data);
};

// OTP user
function otpUser(config, data) {
    return axiosInstance.post(url + 'login_api', data);
};

// Logout user
async function logOut (data) {
    return axiosInstance.post(url + 'logout', data);
};


export default loginService;