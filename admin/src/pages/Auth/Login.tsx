import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { loginAPI } from "./auth.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../utils/path";

//redux
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/user.slice";

import swal from "sweetalert2";
import { escape } from "querystring";

export default function Login() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const rs: AxiosResponse<any> = await loginAPI(
            username.trim(),
            password.trim()
        );
    
        const { status } = rs;

        if (rs?.status === 200) {
            dispatch(
                login({
                    token: rs?.data?.data.token,
                    id: rs?.data?.data.user.user_id,
                    role: rs?.data?.data.role,
                    permissions: rs?.data?.data.user.permissions,
                    fullName: rs?.data?.data.user.fullName,
                })
            );

            swal.fire({
                icon: "success",
                title: "Login success",
            }).then(() => {
                navigate(path.home);
            });
        } else if (status === 400) {
            swal.fire({
                icon: "error",
                title: "Login failed",
                text: "Email is not exist",
            });
        } else if (status === 401) {
            swal.fire({
                icon: "error",
                title: "Login failed",
                text: "Password is incorrect",
            });
        } else if (status === 402) {
            swal.fire({
                icon: "error",
                title: "Login failed",
                text: "You are not allowed to login",
            });
        }
    };

    useEffect(() => {
        if (isLogin) {
            navigate(path.home);
        }
    }, [isLogin, navigate]);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-main-bg px-3 lg:px-0">
            <div className="rounded-[30px] px-5 py-5 sm:px-[50px] w-full sm:w-1/2 lg:w-1/3 h-auto sm:h-1/2 bg-white flex flex-col justify-center items-center gap-5">
                <span className="text-[24px] sm:text-[30px] font-bold">
                    Login
                </span>

                <div className="w-full flex flex-col justify-start">
                    <span>Email</span>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        type="text"
                        placeholder="Enter your Username"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="w-full flex flex-col justify-start">
                    <span>Password</span>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="Password"
                        type="password"
                        placeholder="Enter your Password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                    />
                </div>
                <div
                    onClick={handleSubmit}
                    className="text-white hover:bg-blue-200 w-full sm:w-1/2 h-[50px] bg-blue-500 flex justify-center items-center rounded-md cursor-pointer"
                >
                    Login
                </div>
                <span className="text-center">
                    Doesn't have an account,{" "}
                    <a onClick={()=>navigate(path.register)} className="font-bold">
                        Register
                    </a>{" "}
                </span>
            </div>
        </div>
    );
}
