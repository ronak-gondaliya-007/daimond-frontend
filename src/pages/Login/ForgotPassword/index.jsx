import React, { useState } from "react";
import { logo, backArrow } from "../../../assets/utils/images.js";
import { useForm } from "react-hook-form";
import axiosClient from "api/AxiosClient.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosClient.post("/user/request-reset-password", {
                email: data.email
            });
            if (response.status === 200) {
                toast.success(response?.data?.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className="login-container p-[24px]">
            <div className="w-full h-[57px] flex items-start justify-start">
                <img className="h-[32px] w-max" src={logo} alt="Nature Diam Inc Logo" />
            </div>
            <div className="flex-1 w-full flex items-center justify-center">
                <div className="max-w-[33.75rem] w-full bg-[#fff] rounded-[20px] p-[22px] lg:px-[72px] lg:py-[48px]">
                    <h1 className="text-[#101828] text-[20px] sm:text-[28px] text-center font-semibold">Forgot Password</h1>
                    <form className="py-[24px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-[16px]">
                            <label className="label">Email</label>
                            <input
                                className={`input ${errors.email || message ? "error" : ""} ${watch('email') ? '' : ''}`}
                                type="text"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "*Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "*Please enter a valid email address",
                                    },
                                })}
                                onChange={() => { setMessage("") }}
                            />
                            {!!errors?.email && <span className="error-text">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <button className="primary-btn" type="submit">Send Reset Link</button>
                        </div>
                    </form>
                    {message && (
                        <p className={`mt-0 text text-center text-red-600 blinking-message error-message ${message ? "show" : ""}`}>{message}</p>
                    )}
                    <div className="mt-4 text-center">
                        <a
                            href="/login"
                            className="text-mb text-blue-500 focus:outline-none flex items-center justify-center"
                        >
                            <img src={backArrow} alt="Back Arrow" className="h-4 w-4 mr-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
