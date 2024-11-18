import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/assets";
import LoginButton from "../../components/button/LoginButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { sendEmail, verifyEmail } from "../../utils/auth/regiser.service";
import { apiRegister } from "../../utils/auth/regiser.service";
import Loading from "../../components/loading/Loading";
import Swal from "sweetalert2";
import OTPVerification from "./OTPVerfication";

export default function Register() {
    const navigate = useNavigate();
    const [sideHeight, setSideHeight] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isSending, setIsSending] = useState(false);

    console.log(sideHeight);

    const [user, setUser] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const validateAll = () => {
        const error = {
            fullName: user.fullName ? "" : "Full name is required",
            phoneNumber: user.phoneNumber ? "" : "Phone number is required",
            email: user.email ? "" : "Email is required",
            password: user.password ? "" : "Password is required",
            confirmPassword: user.confirmPassword
                ? ""
                : "Confirm password is required",
        };

        setError(error);

        return Object.values(error).every((e) => e === "");
    };

    const handleSubmit = async () => {
        validateAll();
        if (
            error.fullName ||
            error.phoneNumber ||
            error.email ||
            error.password ||
            error.confirmPassword
        ) {
            return;
        }
        if (user.password !== user.confirmPassword) {
            setError({ ...error, confirmPassword: "Password does not match" });
            return;
        }
        setIsSending(true);
        const rs = await sendEmail({ email: user.email });

        if (rs.status === 200) {
            setIsRegistered(true);
            setIsSending(false);
        } else if (rs.status === 409) {
            setError({ ...error, email: "Email is already exist" });
            setIsSending(false);
        }
    };

    const handleVerifyOTP = async (otp: any) => {
        try {
            const formData = {
                email: user.email,
                otp: otp,
            };
            try {
                const rs = await verifyEmail(formData);
                if (rs?.status === 200) {
                    await apiRegister({
                        phone: user.phoneNumber,
                        name: user.fullName,
                        email: user.email,
                        password: user.password,
                    });

                    Swal.fire({
                        icon: "success",
                        title: "Đăng ký thành công",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        window.location.href = "/auth";
                    });
                } else if (rs?.status === 400) {
                    toast.error(
                        "OTP không chính xác hoặc đã quá hạn, vui lòng nhập lại!"
                    );
                } else if (rs?.status === 409) {
                    toast.error("Email đã tồn tại");
                } else if (rs?.status === 500) {
                    toast.error("OTP đã hết hạn");
                }
            } catch (error) {
                console.error("API Error:", error);
            }
        } catch (error: any) {
            toast.error("OTP không chính xác", error);
        }
    };

    const handleResend = async () => {
        try {
            await sendEmail({ email: user.email });
        } catch (error) {
            console.log(error);
        }
    };

    const togglePasswordVisibility = () =>
        setPasswordVisible(!isPasswordVisible);

    const toggleConfirmPasswordVisibility = () =>
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError({
            ...error,
            email: emailRegex.test(value) ? "" : "Invalid email format",
        });
    };

    const evaluatePasswordStrength = (value: string) => {
        if (value.length < 6) {
            setPasswordStrength("Weak");
        } else if (value.length < 10) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Strong");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser({ ...user, email: value });
        validateEmail(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser({ ...user, password: value });
        evaluatePasswordStrength(value);
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setUser({ ...user, confirmPassword: value });
        setError({
            ...error,
            confirmPassword:
                value === user.password ? "" : "Password does not match",
        });
    };

    useEffect(() => {
        setSideHeight(document.getElementById("side")?.clientHeight || 0);
    }, []);
    return (
        <>
            {isSending && <Loading />}
            {isRegistered && (
                <div className="w-screen h-screen fixed inset-0 z-50 flex flex-col grow justify-center items-center px-20 py-40 text-black bg-white max-md:px-5 max-md:py-24 max-md:max-w-full max-sm:mr-6">
                    <OTPVerification
                        onVerify={handleVerifyOTP}
                        onResend={handleResend}
                    />
                </div>
            )}
            <div className="flex flex-row items-center lg:items-start justify-center lg:justify-between h-auto bg-white gap-5 max-sm:p-0 sm:p-[50px]">
                {/* Left Section */}
                <div
                    className="hidden animate__animated animate__bounceInDown lg:flex w-full lg:w-1/2 bg-white text-white justify-center items-center relative rounded-[30px] overflow-hidden"
                    style={{
                        height: sideHeight,
                    }}
                >
                    <img
                        src={images.loginBackground}
                        className={`w-full h-full  object-cover `}
                        alt="Login Background"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute text-start p-5 top-5 left-5 ">
                        <h2 className="text-[50px] font-bold mb-4">
                            Join Us Today!
                        </h2>
                        <p className="text-lg text-orange-100">
                            Step into a world of culinary delights and exclusive
                            dining experiences. Your journey to savoring the
                            best flavors begins here!
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div
                    id="side"
                    className="max-sm:w-full animate__animated animate__bounceInDown sm:w-1/2 h-full flex flex-col justify-center items-start max-sm:p-10 rounded-[30px] bg-gray-50"
                >
                    <div className="text-4xl font-extrabold mb-4 flex flex-col items-center justify-center w-full">
                        <div className="w-[100px] h-[100px]">
                            <img
                                src={images.logoClient}
                                className="w-full h-full"
                                alt=""
                            />
                        </div>
                        <span>Welcome to</span>
                        <span className="text-center max-sm:text-lg text-orange-500">
                            Hephaestus Restaurant
                        </span>
                    </div>
                    <div className="w-full space-y-3 max-sm:p-0 sm:px-[50px]">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullName"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Enter your full name"
                                    value={user.fullName}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            fullName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {error.fullName && (
                                <p className="text-sm text-red-500 mt-2">
                                    {error.fullName}
                                </p>
                            )}
                        </div>
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
                                    {error.email}
                                </p>
                            )}
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Phone Number
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Enter your phone number"
                                    value={user.phoneNumber}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {error.phoneNumber && (
                                <p className="text-sm text-red-500 mt-2">
                                    {error.phoneNumber}
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
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    id="password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Enter your password"
                                    value={user.password}
                                    onChange={handlePasswordChange}
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
                            {user.password && (
                                <p
                                    className={`text-sm mt-2 ${
                                        passwordStrength === "Weak"
                                            ? "text-red-500"
                                            : passwordStrength === "Medium"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    Password Strength: {passwordStrength}
                                </p>
                            )}
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        isConfirmPasswordVisible
                                            ? "text"
                                            : "password"
                                    }
                                    id="confirmPassword"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Confirm your password"
                                    value={user.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                                >
                                    {isConfirmPasswordVisible ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>
                            {error.confirmPassword && (
                                <p className="text-sm text-red-500 mt-2">
                                    *{error.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div className="w-full flex justify-center items-center pt-2">
                            <LoginButton
                                text="Register"
                                onclick={() => handleSubmit()}
                            />
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-6 w-full text-center py-5">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/auth/login")}
                            className="text-orange-500 hover:underline cursor-pointer"
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}
