import React, { useState } from "react";
import { openEye, closeEye } from "../../assets/utils/images.js";
import { useForm } from "react-hook-form";
import logo from "assets/images/logo.svg";
import axiosClient from "../../api/AxiosClient.js";
import { useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const Login = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Utility to fetch IP address
    const getIPAddress = async () => {
        try {
            const response = await axiosClient.get("https://api.ipify.org?format=json");
            return response.data.ip;
        } catch (error) {
            console.error("Error fetching IP address:", error);
            return null;
        }
    };

    // Utility to fetch system key
    const getSystemKey = async () => {
        try {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            return result.visitorId;
        } catch (error) {
            console.error("Error fetching system key:", error);
            return null;
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosClient.post("/user/login", {
                email: data.email,
                password: data.password,
                loginIp: await getIPAddress(),
                loginSystemKey: await getSystemKey()
            });

            if (response.status === 200) {
                localStorage.setItem("token", response?.data?.data?.accessToken);
                localStorage.setItem("authDetails", JSON.stringify(response?.data?.data?.user));
                window.location.href = "/";
            }
        } catch (error) {
            setMessage(error.response?.data?.message);
        }
    };

    return (
        <div className="login-container p-[24px]">
            <div className="w-full h-[57px] flex items-start justify-start">
                <img className="h-[32px] w-max" src={logo} alt="Nature Diam Inc Logo" />
            </div>
            <div className="flex-1 w-full flex items-center justify-center">
                <div className="max-w-[33.75rem] w-full bg-[#fff] rounded-[20px] p-[22px] lg:px-[72px] lg:py-[48px]">
                    <h1 className="text-[#101828] text-[20px] sm:text-[28px] text-center font-semibold">Login to your account</h1>
                    <form className="py-[24px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-[16px]">
                            <label className="label">Email</label>
                            <input
                                className={`input ${errors.email || message ? "error" : ""}`}
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "*Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "*Please enter a valid email address",
                                    },
                                })}
                                onChange={() => { setMessage("") }}
                            />
                            {!!errors?.email && <span className="error-text">{errors.email.message}</span>}
                        </div>
                        <div className="form-group mb-[16px]">
                            <div className="flex justify-between">
                                <label className="label">Password</label>
                                <span className="text-[#1570EF] text-[14px] sm:text-[16px] cursor-pointer" onClick={() => navigate("/forgot-password")}>Forgot password?</span>
                            </div>
                            <div className="relative">
                                <input
                                    className={`input ${errors.password || message ? "error" : ""}`}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "*Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "*Password must be at least 6 characters",
                                        },
                                    })}
                                    onChange={() => { setMessage("") }}
                                />
                                <span className="password-eye" onClick={togglePasswordVisibility}>
                                    <img src={showPassword ? closeEye : openEye} alt="toggle visibility" />
                                </span>
                            </div>
                            {!!errors?.password && <span className="error-text">{errors.password.message}</span>}
                        </div>
                        <div className="form-group">
                            <button className="primary-btn" type="submit">Login now</button>
                        </div>
                    </form>
                    {message && (
                        <p className={`mt-0 text text-center text-red-600 blinking-message error-message ${message ? "show" : ""}`}>{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;