import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Initialize axios client
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.defaults.timeout = 600000;

axiosClient.interceptors.response.use(
    function (response) {
        if (response.data?.statusCode === 401) {
            cookies.remove("token", { path: "/login" });
            localStorage.removeItem("token");

            window.location.href = '/login';
        }
        return response;
    },

    function (error) {
        let res = error.response;
        if (res?.status === 401) {
            localStorage.removeItem("authDetails");
            localStorage.removeItem("token");

            window.location.reload();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    // Set Authorization header
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config;
});


export default axiosClient;