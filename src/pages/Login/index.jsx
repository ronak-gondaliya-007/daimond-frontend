import React, { useState } from "react";
import "../../assets/css/login.css";

import logo from "../../assets/images/logo.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", { email, password });
        }
    };

    return (
        <div className="login-container">
            <img className="logo" src={logo} alt="Nature Diam Inc Logo" />
            <div className="login-box">
                <h2 className="title">Login to your account</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="label">Email</label>
                    <input
                        className={`input ${errors.email ? "error" : ""}`}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                    <label className="label">Password</label>
                    <div className="password-container">
                        <input
                            className={`input ${errors.password ? "error" : ""}`}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        <a className="forgot-password" href="#">Forgot password?</a>
                    </div>
                    {errors.password && <p className="error-text">{errors.password}</p>}
                    <button className="login-button" type="submit">Login now</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
