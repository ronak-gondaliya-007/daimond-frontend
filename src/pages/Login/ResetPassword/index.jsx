import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For extracting query params and redirecting
import { openEye, closeEye, backArrow } from "../../../assets/utils/images.js";
import axiosClient from 'api/AxiosClient';
import { useForm } from 'react-hook-form';
import { logo } from 'assets/utils/images';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setToken(queryParams.get('token'));
        setId(queryParams.get('id'));
    }, [location]);

    const togglePasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);

            const response = await axiosClient.post("/user/reset-password", {
                userId: id,
                token: token,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            });

            if (response.status === 200) {
                window.location.href = "/login";
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
                    <h1 className="text-[#101828] text-[20px] sm:text-[25px] text-center font-semibold">Reset Password Your Account</h1>
                    <form className="py-[24px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-[16px]">
                            <label className="label">New Password</label>
                            <div className="relative">
                                <input
                                    className={`input ${errors.password || message ? "error" : ""}`}
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    {...register("newPassword", {
                                        required: "*New Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "*New Password must be at least 6 characters",
                                        },
                                    })}
                                    onChange={() => { setMessage("") }}
                                />
                                <span className="password-eye" onClick={togglePasswordVisibility}>
                                    <img src={showNewPassword ? openEye : closeEye} alt="toggle visibility" />
                                </span>
                            </div>
                            {!!errors?.password && <span className="error-text">{errors.password.message}</span>}
                        </div>
                        <div className="form-group mb-[16px]">
                            <label className="label">Confirm Password</label>
                            <div className="relative">
                                <input
                                    className={`input ${errors.password || message ? "error" : ""}`}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter your confirm password"
                                    {...register("confirmPassword", {
                                        required: "*Confirm Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "*Confirm Password must be at least 6 characters",
                                        },
                                    })}
                                    onChange={() => { setMessage("") }}
                                />
                                <span className="password-eye" onClick={toggleConfirmPasswordVisibility}>
                                    <img src={showConfirmPassword ? openEye : closeEye} alt="toggle visibility" />
                                </span>
                            </div>
                            {!!errors?.password && <span className="error-text">{errors.password.message}</span>}
                        </div>
                        <div className="form-group">
                            <button className="primary-btn" type="submit">Reset Password</button>
                        </div>
                    </form>
                    {message && (
                        <p className={`mt-0 text text-center text-red-600 blinking-message error-message ${message ? "show" : ""}`}>{message}</p>
                    )}
                    <div className="mt-4 text-center">
                        <a
                            href="/forgot-password"
                            className="text-mb text-blue-500 focus:outline-none flex items-center justify-center"
                        >
                            <img src={backArrow} alt="Back Arrow" className="h-4 w-4 mr-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                            Back to Forgot Password
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
