import React from "react";
import { openEye } from "../../assets/utils/images.js";
import { useForm } from "react-hook-form";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="login-container p-[24px]">
            {/* <div>
                <img className="logo" src={logo} alt="Nature Diam Inc Logo" />
            </div> */}
            <div className="max-w-[33.75rem] w-full bg-[#fff] rounded-[20px] p-[22px] md:px-[72px] md:py-[48px]">
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
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "*Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "*Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <span className="password-eye">
                                <img src={openEye} alt="open eye" />
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
    );
}

export default Login;