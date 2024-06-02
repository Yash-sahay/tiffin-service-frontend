import axios from "axios";
import { baseURL } from "../../common";

const axiosInstance = axios.create({
    baseURL: baseURL(),
});


// To get stored Access tokens 
const getStoredToken = async () => {
    try {
        const storing = await localStorage.getItem('Tokens');
        // We have data!!
        return JSON.parse(storing);
    } catch (error) {
        console.error(error);
    }
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const authObj = await getStoredToken();
        if (authObj?.access) {
            config.headers.common['Authorization'] = `Bearer ${authObj?.access}` || "";
        }
        // console.warn(config)
        return config;
    },
    (error) => {
        alert(error);
        return Promise.reject(error);
    });

axiosInstance.interceptors.response.use(
    (response) => { // Any status code from range of 2xx
        return response;
    },
    (error) => { // Any status codes outside range of 2xx
        console.error("Error", error?.response);
        return Promise.reject(error);
    });

export default axiosInstance;