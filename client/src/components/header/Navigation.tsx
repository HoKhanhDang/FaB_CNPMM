import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";

//logo
import logo from "../../assets/images/logo.png";

import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/user.slice";
import Notification from "../notification/Notifications";
import { INotification } from "../../types/INotification";
interface NavigationProps {
    setIsOpenNavMenu: (value: boolean) => void;
    notification: INotification[];
    fetchNotifications?: () => void;
}

const links = [
    {
        title: "Home",
        url: "",
    },
    {
        title: "About",
        url: "about",
    },
    {
        title: "Menu",
        url: "menu",
    },

    {
        title: "Contact",
        url: "contact",
    },
];

const Navigation: React.FC<NavigationProps> = ({
    setIsOpenNavMenu,
    notification,
    fetchNotifications,
}) => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: any) => state.cartSlice);
    const { isLogin, image } = useSelector((state: any) => state.customerSlice);
    const [isShowNotification, setIsShowNotification] = React.useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        window.localStorage.removeItem("persist:cart");
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <nav className="mt-[30px] flex flex-col justify-center items-center self-stretch px-16 py-6 w-full h-[100px] text-xl font-bold bg-orange-50 shadow-sm text-slate-700 max-md:px-5 max-md:max-w-full">
                <div className="flex flex-row gap-10 max-sm:justify-between sm:justify-evenly items-center md:justify-between w-full rounded-none max-w-[1198px] max-md:max-w-full">
                    <div className="sm:!hidden flex justify-center items-start w-[80px]">
                        <RxHamburgerMenu
                            onClick={() => setIsOpenNavMenu(true)}
                            className="text-[30px] cursor-pointer transform transition-transform duration-300 hover:scale-125"
                        />
                    </div>
                    <img
                        loading="lazy"
                        src={logo}
                        className="object-contain shrink-0 max-w-full aspect-[1.49] h-[70px] w-[70px] cursor-pointer "
                        alt="Company Logo"
                        onClick={() => navigate("/")}
                    />
                    <div className="flex gap-[50px] justify-center items-center h-full">
                        <div className="sm:flex hidden flex-row h-full w-auto gap-10 items-center whitespace-nowrap text-[18px]">
                            {links.map((link) => (
                                <div
                                    onClick={() => {
                                        navigate(`/${link.url}`);
                                    }}
                                    className="self-stretch my-auto hover:text-red-500 cursor-pointer"
                                >
                                    {link.title}
                                </div>
                            ))}
                        </div>

                        <div className="max-md:hidden md:flex gap-2.5 self-stretch my-auto text-[18px]">
                            <div className="flex flex-col justify-start">
                                <div className="grow self-start">
                                    Delivery Order
                                </div>
                                <div className="grow self-start text-[15px]">
                                    +880 1630 225 015
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa7a00446cf452cebab86c688e9f263c37b3e0e795c7b103c54095f9de29a909?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                                className="object-contain shrink-0 aspect-square w-[35px]"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-row justify-evenly items-center gap-5 relative">
                            <Badge
                                badgeContent={
                                    notification.filter((item) => {
                                        return !item.isRead;
                                    })?.length || 0
                                }
                                color="primary"
                                className="flex justify-center items-start"
                            >
                                <FaBell
                                    className=" cursor-pointer text-[30px] transform transition-transform duration-300 hover:scale-125 hover:text-red-500"
                                    color="action"
                                    onClick={() =>
                                        setIsShowNotification(
                                            !isShowNotification
                                        )
                                    }
                                />
                            </Badge>
                            {isLogin && isShowNotification && (
                                <Notification
                                    fetchNotifications={fetchNotifications}
                                    setIsShowNotification={
                                        setIsShowNotification
                                    }
                                    listNotification={notification}
                                />
                            )}
                            <Badge
                                badgeContent={items?.length || 0}
                                color="primary"
                                className="flex justify-center items-start"
                            >
                                <FaCartShopping
                                    className=" cursor-pointer text-[30px] transform transition-transform duration-300 hover:scale-125 hover:text-red-500"
                                    color="action"
                                    onClick={() => navigate("/cart")}
                                />
                            </Badge>
                        </div>

                        {!isLogin && (
                            <div
                                onClick={() => navigate("/auth/login")}
                                className=" sm:flex hidden cursor-pointer self-stretch px-5 py-2 my-auto text-lg text-orange-50 whitespace-nowrap bg-red-600 rounded-xl shadow-sm   transform transition-transform duration-300 hover:scale-110"
                            >
                                LOGIN
                            </div>
                        )}
                        {isLogin && (
                            <div className="sm:flex hidden gap-2.5 self-stretch my-auto text-[18px]">
                                <div className="flex flex-col justify-center items-center">
                                    <div
                                        onClick={() => {
                                            navigate(`/profile`);
                                        }}
                                        className="w-[40px] h-[40px]  flex justify-center items-center transform transition-transform duration-300 hover:scale-110"
                                    >
                                        <img
                                            src={image}
                                            className="w-full h-full object-cover rounded-[100px]"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="self-stretch px-5 py-2 my-auto text-lg text-red-500 rounded-xl transform transition-transform duration-300 hover:scale-110 hover:text-red-300">
                                    <IoLogOutOutline
                                        onClick={handleLogout}
                                        className="text-[30px]"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
