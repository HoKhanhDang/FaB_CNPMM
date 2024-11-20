//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
//apis
import {
    getStaffByIdAPI,
    changePassword,
    editUserAPI,
    uploadImageAPI,
} from "./profile.service";
import LoadingScreen from "../../components/commons/LoadingScreen";

export default function Profile() {
    const { id } = useSelector((state: any) => state.userSlice);
    const [isLoading, setIsLoading] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //error
    const [isErrorOldPassword, setIsErrorOldPassword] = useState(false);
    const [isErrorNewPassword, setIsErrorNewPassword] = useState(false);
    const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [isPhoneNumberExist, setIsPhoneNumberExist] = useState(false);
    const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");

    //image////////////////////////
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/") && file.size < 5000000) {
            setSelectedImage(file);
        } else {
            alert("File không hợp lệ. Chỉ chấp nhận ảnh nhỏ hơn 5MB.");
        }
    };

    const triggerFileInput = () => {
        document.getElementById("imageFile")?.click();
    };

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [selectedImage]);
    //////////////////////////////////////////////

    const resetForm = () => {
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        setIsErrorConfirmPassword(false);
        setIsErrorNewPassword(false);
        setIsErrorOldPassword(false);
        setIsSamePassword(false);
    };
    const handleUndo = () => {
        resetForm();
        setIsChangePassword(false);
    };
    const handleChangePassword = async () => {
        if (isChangePassword) {
            ///////////////validate password//////////////////////
            if (isErrorOldPassword) {
                setIsErrorOldPassword(false);
            }

            if (newPassword !== confirmPassword) {
                setIsErrorConfirmPassword(true);
                setConfirmPassword("");
                return;
            } else {
                setIsErrorConfirmPassword(false);
            }

            if (
                newPassword.length < 8 &&
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword) ===
                    false
            ) {
                setConfirmPassword("");
                setIsErrorNewPassword(true);
                return;
            } else {
                setIsErrorNewPassword(false);
            }

            if (oldPassword === newPassword) {
                setConfirmPassword("");
                setIsSamePassword(true);
                return;
            } else {
                setIsSamePassword(false);
            }

            /////////////////////validate password/////////////////////

            const rs = await changePassword({
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            });
            if (rs.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Change password success",
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    resetForm();
                    setIsChangePassword(false);
                });
            } else if (rs.status === 401) {
                setIsErrorOldPassword(true);
            }
        } else {
            setIsChangePassword(true);
        }
    };

    const handleEdit = async () => {
        if (!isEditProfile) {
            setIsEditProfile(true);
            return;
        } else {
            if (isPhoneNumberExist) {
                setIsPhoneNumberExist(false);
            }
            if (phone.length !== 10 || !/^\d{10,}$/.test(phone)) {
                setIsInvalidPhoneNumber(true);
                return;
            } else {
                setIsInvalidPhoneNumber(false);
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append("image", selectedImage || image);
            const rsImage = await uploadImageAPI(formData);

            const data = {
                user_id: id,
                image: rsImage?.data?.data?.path || image,
                name: name,
                email: email,
                phone: phone,
            };
            const rs = await editUserAPI(data);
            setIsLoading(false);
            if (rs.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Edit successfully",
                }).then(() => {
                    setIsEditProfile(false);
                    setIsPhoneNumberExist(false);
                });
            } else if (rs?.status === 401) {
                setIsPhoneNumberExist(true);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Edit failed",
                }).then(() => {});
            }
        }
    };

    const fetchUser = async () => {
        const rs = await getStaffByIdAPI(id);
        setName(rs?.data?.data?.fullName);
        setEmail(rs?.data?.data?.email);
        setPhone(rs?.data?.data?.phone);
        setImage(rs?.data?.data?.image);
    };
    useEffect(() => {
        // if (!isLogin) {
        //     navigate("/login");
        // }
        fetchUser();
        sessionStorage.setItem("active", "1");
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}

            <div className="w-full h-full bg-main-bg col-span-5 row-span-11 p-2 flex justify-center items-center">
                <div className="w-1/3 h-auto bg-white rounded-md">
                    <div className="w-full h-[10%] flex justify-center items-center">
                        <span className="text-[30px] font-bold px-5 pt-5">
                            Your Account
                        </span>
                    </div>
                    <div className="w-full h-[90%] flex justify-center items-center p-5">
                        <div className="w-full h-full flex flex-col justify-start items-start gap-1 ">
                            <div className="w-full h-[150px] flex flex-col justify-center items-center gap-3">
                                {selectedImage && (
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Avatar Preview"
                                        className="rounded-full w-[150px] h-[150px]"
                                    />
                                )}
                                {selectedImage === null && (
                                    <img
                                        src={image}
                                        alt="Avatar"
                                        className="rounded-full w-[150px] h-[150px]"
                                    />
                                )}
                                {isEditProfile && (
                                    <button
                                        onClick={triggerFileInput}
                                        className="text-[12px] text-blue-300 self-center cursor-pointer"
                                        disabled={!isEditProfile}
                                    >
                                        Change your avatar
                                    </button>
                                )}
                            </div>
                            <input
                                id="imageFile"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />

                            <div className="w-full h-[40px] flex justify-start items-center gap-3 mt-2">
                                <span className="text-[15px] font-bold">
                                    Name:
                                </span>
                                <input
                                    type="text"
                                    value={name}
                                    className="border rounded-md w-full "
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={!isEditProfile}
                                />
                            </div>
                            <div className="w-full h-[40px] flex justify-start items-center gap-3">
                                <span className="text-[15px] font-bold">
                                    Email:
                                </span>
                                <input
                                    type="text"
                                    value={email}
                                    className="border rounded-md w-full "
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="w-full h-[40px] flex justify-start items-center gap-3">
                                <span className="text-[15px] font-bold">
                                    Phone:
                                </span>
                                <input
                                    type="text"
                                    value={phone}
                                    className="border rounded-md w-full"
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!isEditProfile}
                                />
                            </div>
                            {isPhoneNumberExist && (
                                <span className="text-red-500 text-[12px]">
                                    *Phone number already exists
                                </span>
                            )}
                            {isInvalidPhoneNumber && (
                                <span className="text-red-500 text-[10px]">
                                    *Phone number must be exactly 10 digits
                                </span>
                            )}

                            {isChangePassword && (
                                <div className="w-full h-[40px] flex flex-row justify-start items-center gap-2">
                                    <span className="text-[15px] font-bold w-2/6">
                                        Old Password:
                                    </span>
                                    <input
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                        type="password"
                                        className="border rounded-md w-4/6"
                                    />
                                </div>
                            )}
                            {isErrorOldPassword && (
                                <span className="text-red-500 text-[12px]">
                                    *Old password is incorrect
                                </span>
                            )}
                            {isChangePassword && (
                                <div className="w-full h-[40px] flex flex-row justify-start items-center gap-2">
                                    <span className="text-[15px] font-bold w-2/6">
                                        New Password:
                                    </span>
                                    <input
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        type="password"
                                        className="border rounded-md w-4/6"
                                    />
                                </div>
                            )}
                            {isErrorNewPassword && (
                                <span className="text-red-500 text-[10px]">
                                    *Password must contain at least 8
                                    characters, including uppercase, lowercase
                                    letters and numbers
                                </span>
                            )}
                            {isSamePassword && (
                                <span className="text-red-500 text-[10px]">
                                    *New password must be different from old
                                    password
                                </span>
                            )}
                            {isChangePassword && (
                                <div className="w-full h-[40px] flex flex-row justify-start items-center gap-2">
                                    <span className="w-2/6 text-[15px] font-bold">
                                        Confirm Password:
                                    </span>
                                    <input
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleChangePassword();
                                            }
                                        }}
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        type="password"
                                        className="border rounded-md w-4/6"
                                    />
                                </div>
                            )}
                            {isErrorConfirmPassword && (
                                <span className="text-red-500 text-[12px]">
                                    *Confirm password is not match
                                </span>
                            )}
                            {!isChangePassword && (
                                <button
                                    onClick={handleEdit}
                                    className="w-full h-[40px] mt-2 bg-blue-500 flex justify-center items-center rounded-xl text-white hover:bg-blue-300"
                                >
                                    <span className="text-[15px] font-bold">
                                        {isEditProfile
                                            ? "Save"
                                            : "Edit Profile"}
                                    </span>
                                </button>
                            )}
                            {!isEditProfile && (
                                <>
                                    <button
                                        onClick={handleChangePassword}
                                        className="w-full h-[40px] bg-blue-500 flex justify-center items-center rounded-xl text-white hover:bg-blue-300"
                                    >
                                        <span className="text-[15px] font-bold">
                                            {isChangePassword
                                                ? "Save"
                                                : "Change Password"}
                                        </span>
                                    </button>
                                    {isChangePassword && (
                                        <button
                                            onClick={handleUndo}
                                            className="w-full h-[40px] bg-gray-500 flex justify-center items-center rounded-xl text-white hover:bg-blue-300"
                                        >
                                            <span className="text-[15px] font-bold">
                                                Undo
                                            </span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
