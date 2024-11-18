import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { icons, images } from "../../assets/assets";
import LoginButton from "../../components/button/LoginButton";
import { login as reduxLogin } from "../../redux/slice/user.slice";
import { useDispatch } from "react-redux";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../utils/auth/login.service";
const AuthForm: React.FC = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        permission: "",
        fullFilled: "",
    });
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkFullField = () => {
        if (!user.email || !user.password) {
            return false;
        }
        return true;
    };
    const handleSubmit = async () => {
        if (!checkFullField()) {
            setError({
                ...error,
                fullFilled: "Email and password are required",
            });
            return;
        }
        const rs = await apiLogin(user);
        const { status } = rs;

        if (rs?.status === 200) {
            swal.fire({
                icon: "success",
                title: "Login success",
            }).then(() => {
                dispatch(reduxLogin(rs.data));
                navigate("/");
            });
        } else if (status === 400) {
            setError({ ...error, email: "Email is not exist" });
        } else if (status === 401) {
            setError({ ...error, password: "Password is incorrect" });
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
        <div className="flex flex-row items-center lg:items-start justify-center lg:justify-between h-screen bg-white gap-5 max-sm:p-0 sm:p-[50px]">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 animate__animated animate__fadeInLeft  h-full flex flex-col justify-center items-center py-8 lg:py-16 px-8 lg:px-24 rounded-[30px] max-sm:bg-orange-50 bg-gray-50">
                <div
                    onClick={() => (window.location.href = "/")}
                    className=" absolute top-10 left-10"
                >
                    <img
                        src={icons.arrow_back}
                        className="w-[50px] h-[50px] transform_z cursor-pointer hover:fill-white"
                        alt=""
                    />
                </div>
                <div className="w-[100px] h-[100px]">
                    <img
                        src={images.logoClient}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </div>

                <div className="text-4xl font-extrabold mb-4 flex flex-col">
                    <span className="text-center">Welcome to</span>
                    <span className="text-center max-sm:text-lg text-orange-500">
                        Hephaestus Restaurant
                    </span>
                </div>

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
                                className="w-full px-4 py-3 border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 "
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

                    {error.fullFilled && (
                        <p className="text-sm text-red-500 mt-2">
                            *{error.fullFilled}
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
                        onClick={() => navigate("/auth/register")}
                        className="text-orange-500 hover:underline cursor-pointer"
                    >
                        Register here
                    </span>
                </p>
            </div>

            {/* Right Section */}
            <div className="hidden   animate__animated animate__fadeInRight lg:flex w-full lg:w-1/2 h-full bg-white text-white justify-center items-center relative rounded-[30px] overflow-hidden">
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
                    <p className="text-lg text-orange-100">
                        Welcome back! We're delighted to have you here. Indulge
                        in our delicious dishes and discover a dining experience
                        crafted just for you. Let's make your next meal
                        unforgettable!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
