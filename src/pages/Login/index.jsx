import React, { useState } from "react";
import { openEye, closeEye } from "../../assets/utils/images.js";
import { useForm } from "react-hook-form";
import logo from "assets/images/logo.svg";
import axiosClient from "../../api/AxiosClient.js";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosClient.post("/user/login", {
                email: data.email,
                password: data.password,
            });
            debugger
            if (response.status === 200) {
                localStorage.setItem("token", response.data.data.accessToken);
                console.log("Login successful");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
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
                                className={`input ${errors.email ? "error" : ""}`}
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "*Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "*Please enter a valid email address",
                                    },
                                })}
                            />
                            {!!errors?.email && <span className="error-text">{errors.email.message}</span>}
                        </div>
                        <div className="form-group mb-[16px]">
                            <div className="flex justify-between">
                                <label className="label">Password</label>
                                <span className="text-[#1570EF] text-[14px] sm:text-[16px] cursor-pointer">Forgot password?</span>
                            </div>
                            <div className="relative">
                                <input
                                    className={`input ${errors.password ? "error" : ""}`}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "*Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "*Password must be at least 6 characters",
                                        },
                                    })}
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
                </div>
            </div>
        </div>
    );
}

export default Login;