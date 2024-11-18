import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { images } from "../../assets/assets";
import LoginButton from "../../components/buttons/LoginButton";
import { AxiosResponse } from "axios";
import { loginAPI } from "./auth.service";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/user.slice";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
const AuthForm: React.FC = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        permission: "",
    });
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const rs: AxiosResponse<any> = await loginAPI(
            user.email.trim(),
            user.password.trim()
        );

        const { status } = rs;
        console.log(rs);

        if (rs?.status === 200) {
            swal.fire({
                icon: "success",
                title: "Login success",
            }).then(() => {
                dispatch(
                    login({
                        token: rs?.data?.data.token,
                        id: rs?.data?.data.user.user_id,
                        role: rs?.data?.data.role,
                        permissions: rs?.data?.data.user.permissions,
                        fullName: rs?.data?.data.user.fullName,
                    })
                );
                navigate(path.home);
            });
        } else if (status === 400) {
            setError({ ...error, email: "Email is not exist" });
        } else if (status === 401) {
            setError({ ...error, password: "Password is incorrect" });
        } else if (status === 402) {
            setError({ ...error, permission: "Permission denied" });
        }
    };

    const togglePasswordVisibility = () =>
        setPasswordVisible(!isPasswordVisible);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError({
            ...error,
            email: emailRegex.test(value) ? "" : "Email is invalid",
        });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser({ ...user, email: value });
        validateEmail(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser({ ...user, password: value });
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between h-screen bg-white gap-5 p-5">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-start py-8 lg:py-16 px-8 lg:px-24 rounded-[30px] bg-gray-50">
                <div className="text-4xl font-extrabold mb-4 flex flex-col">
                    <span>Welcome to</span>
                    <span>Hephaestus Restaurant</span>
                </div>
                <p className="text-gray-600 text-lg mb-10">
                    {" "}
                    Manage and optimize your restaurant operations with our
                    advanced tools and insights.
                </p>
                <div className="w-full max-w-md space-y-6">
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {error.email && (
                            <p className="text-sm text-red-500 mt-2">
                                *{error.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handlePasswordChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                            >
                                {isPasswordVisible ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                    {error.password && (
                        <p className="text-sm text-red-500 mt-2">
                            *{error.password}
                        </p>
                    )}
                    {error.permission && (
                        <p className="text-sm text-red-500 mt-2">
                            *{error.permission}
                        </p>
                    )}

                    {/* Login Button */}
                    <div className="w-full flex justify-center items-center">
                        <LoginButton text="Login" onclick={handleSubmit} />
                    </div>
                </div>
                <p className="text-gray-600 text-sm mt-6">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate(path.register)}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Register here
                    </span>
                </p>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex w-full lg:w-1/2 h-full bg-white text-white justify-center items-center relative rounded-[30px] overflow-hidden">
                <img
                    src={images.loginBackground}
                    className="w-full h-full object-cover "
                    alt="Login Background"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute text-start p-5 top-5 left-5 ">
                    <h2 className="text-[50px] font-bold mb-4">
                        Welcome Back!
                    </h2>
                    <p className="text-lg">
                        Your data, your decisions, your success – all at your
                        fingertips. Dive into your management dashboard and take
                        control of your sales like never before. Let’s achieve
                        greatness together!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
