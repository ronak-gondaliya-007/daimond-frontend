import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.defaults.timeout = 600000;

axiosClient.interceptors.response.use(
    function (response) {
        console.log(response);
        if (response.data?.statusCode === 401) {
            cookies.remove("token", { path: "/" });
            window.location.reload();
        }
        return response;
    },
    function (error) {
        console.log(error);
        let res = error.response;
        if (res?.status === 501) {
            cookies.remove("token", { path: "/login" });
            toast.error(error?.response?.data?.message);
        } else if (res?.status === 200) {
            localStorage.setItem("authDetails", JSON.stringify(res?.data?.data));
        }
        console.error("Looks like there was a problem. Status Code:" + res?.status);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(function (config) {
    const token = cookies.get("token");
    config.headers["Authorization"] = token || "";
    return config;
});


export default axiosClient;