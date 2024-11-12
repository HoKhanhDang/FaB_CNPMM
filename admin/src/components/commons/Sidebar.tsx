import { link } from "fs";
import path from "../../utils/path";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/user.slice";

import { sideBarItems } from "../../constant/common.constant";
import logo from "../../assets/images/logo.png";

import Swal from "sweetalert2";
export default function SideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState<number>(() => {
        const saved = sessionStorage.getItem("active");
        return saved ? parseInt(saved, 10) : 1;
    });
    const { permissions } = useSelector((state: any) => state.userSlice);
    const filteredSideBarItems = sideBarItems?.filter((item) =>
        permissions.includes(item?.permission)
    );

    useEffect(() => {
        sessionStorage.setItem("active", active.toString());
        const id = parseInt(sessionStorage.getItem("active") || "1", 10);
        navigate(sideBarItems[id - 1]?.link);
    }, [active]);

    const handleSetActive = (id: number) => {
        setActive(id);
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear();
                dispatch(logout());
                navigate(path.login);
            } else {
                return;
            }
        });
    };
    return (
        <div className="w-full h-full bg-sidebar shadow-2xl border-gray-100 col-span-1 row-span-12 flex flex-col justify-start items-start ">
            <div className="w-full h-[20%] p-2 flex justify-center items-center">
                <img
                    className="w-[125px] h-[125px] object-cover rounded-full"
                    src={logo}
                    alt=""
                />
            </div>

            <div className="w-full h-[70%] flex justify-start items-start gap-1 flex-col px-[30px]">
                {filteredSideBarItems?.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleSetActive(item.id)}
                        className={` cursor-pointer w-full px-5 py-2 rounded-[10px] flex justify-start items-center gap-2  hover:bg-gray-200 hover:bg-opacity-10 ${
                            active === item.id
                                ? "text-white bg-gray-200 bg-opacity-10"
                                : "text-gray-100"
                        }`}
                    >
                        {item.icon}
                        <span> {item.name}</span>
                    </div>
                ))}
            </div>

            <div className="w-full h-[10%] flex justify-center items-center">
                <div className="flex flex-row justify-around gap-5   text-[18px] text-white">
                    <span className="">Welcome Dunk</span>
                    <IoIosLogOut
                        onClick={handleLogout}
                        className="text-[30px] hover:text-red-500 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
