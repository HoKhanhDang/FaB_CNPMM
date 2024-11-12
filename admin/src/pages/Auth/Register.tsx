import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { registerAPI } from "./auth.service";
import axios, { AxiosResponse } from "axios";
//icons
import { IoArrowBack } from "react-icons/io5";

//MUI
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";

import { useNavigate } from "react-router-dom";
import { permissionRole } from "../../helper/SelectPermission";

export default function Register() {
    const navigate = useNavigate();
    const [role, setRole] = React.useState("cashier");

    const handleChange = (event: any) => {
        setRole(event.target.value);
    };

    const RegisterSchema = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            phone: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            username: Yup.string().required("Username is required"),
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    "Password must contain one uppercase, one lowercase and one number"
                ),
            confirmPassword: Yup.string().required(
                "Confirm Password is required"
            ),

            phone: Yup.string()
                .matches(
                    /^[0-9]{10}$/,
                    "Phone number must be exactly 10 digits"
                )
                .required("Phone is required"),
        }),
        onSubmit: async (values: {
            name: string;
            username: string;
            email: string;
            password: string;
            phone: string;
            confirmPassword: string;
        }) => {
            const data = {
                ...values,
                phone: values.phone,
                role,
                permissions: permissionRole(role),
            };
            if ((values.password !== values.confirmPassword) == true) {
                Swal.fire({
                    icon: "error",
                    title: "Almost!",
                    text: "Password and Confirm Password must be the same",
                }).then(() => {
                    navigate("/register");
                    return;
                });
            } else {
             
                const rs: AxiosResponse<any> = await registerAPI(data);

                if (rs.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Register successfully",
                    }).then(() => {
                        navigate("/login");
                    });
                } else if (rs.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Register failed",
                        text: "Email is already exist",
                    }).then(() => {
                        navigate("/register");
                    });
                } else if (rs.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Register failed",
                        text: "Phone number is already exist",
                    }).then(() => {
                        navigate("/register");
                    });
                }
            }
        },
    });
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
            <div className="p-5 w-1/3 h-auto bg-white rounded-[30px]  flex flex-col justify-center items-center">
                <div className="text-[30px] font-bold relative w-full flex justify-center">
                    <IoArrowBack
                        onClick={() => {
                            navigate("/login");
                        }}
                        className=" absolute left-0 top-2"
                    />
                    Register
                </div>
                <form
                    onSubmit={RegisterSchema.handleSubmit}
                    className="flex flex-col gap-1 w-full"
                >
                    <span>Full Name</span>
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border border-gray-300 rounded-md w-full h-[35px]"
                        {...RegisterSchema.getFieldProps("name")}
                    />

                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup
                            defaultValue="cashier"
                            name="radio-buttons-group"
                            value={role}
                            onChange={handleChange}
                            orientation="horizontal"
                        >
                            <Radio
                                value="cashier"
                                label="Cashier"
                                variant="outlined"
                            />
                            <Radio value="chef" label="Chef" variant="soft" />
                            <Radio value="admin" label="Admin" variant="soft" />
                        </RadioGroup>
                    </FormControl>

                    <span>Phone Number</span>
                    <input
                        type="text"
                        placeholder="Phone"
                        className="p-2 border border-gray-300 rounded-md w-full h-[35px]"
                        {...RegisterSchema.getFieldProps("phone")}
                    />

                    <span>User Name</span>
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-2 border border-gray-300 rounded-md w-full h-[35px]"
                        {...RegisterSchema.getFieldProps("username")}
                    />
                    <span>Email</span>
                    <input
                        type="text"
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded-md w-full h-[35px]"
                        {...RegisterSchema.getFieldProps("email")}
                    />
                    <span>Password</span>
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 border border-gray-300 rounded-md w-full h-[35px]"
                        {...RegisterSchema.getFieldProps("password")}
                    />
                    <span>Confirm Password</span>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="p-2 border border-gray-300 rounded-md w-full h-[35px]"
                        {...RegisterSchema.getFieldProps("confirmPassword")}
                    />

                    {RegisterSchema.touched.name &&
                    RegisterSchema.errors.name ? (
                        <div className="text-[12px] text-red-600">
                            *{RegisterSchema.errors.name}
                        </div>
                    ) : null}

                    {RegisterSchema.touched.username &&
                    RegisterSchema.errors.username ? (
                        <div className="text-[12px] text-red-600">
                            *{RegisterSchema.errors.username}
                        </div>
                    ) : null}

                    {RegisterSchema.touched.phone &&
                    RegisterSchema.errors.phone ? (
                        <div className="text-[12px] text-red-600">
                            *{RegisterSchema.errors.phone}
                        </div>
                    ) : null}

                    {RegisterSchema.touched.email &&
                    RegisterSchema.errors.email ? (
                        <div className="text-[12px] text-red-600">
                            *{RegisterSchema.errors.email}
                        </div>
                    ) : null}

                    {RegisterSchema.touched.password &&
                    RegisterSchema.errors.password ? (
                        <div className="text-[12px] text-red-600">
                            *{RegisterSchema.errors.password}
                        </div>
                    ) : null}
                    {RegisterSchema.touched.confirmPassword &&
                    RegisterSchema.errors.confirmPassword ? (
                        <div className="text-[12px] text-red-600">
                            *{RegisterSchema.errors.confirmPassword}
                        </div>
                    ) : null}

                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-md mt-3"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
