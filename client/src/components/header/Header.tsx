import React, { useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
import SocketSingleton from "../../socket";
import { getAllNotificationsByUserId } from "../../utils/notification/notificatin.util";
import { useSelector } from "react-redux";
import { INotification } from "../../types/INotification";
interface HeaderProps {
    setIsOpenNavMenu: (value: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ setIsOpenNavMenu }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [notification, setNotification] = useState<INotification[]>([]);
    const { id } = useSelector((state: any) => state.customerSlice);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    const fetchNotifications = async () => {
        getAllNotificationsByUserId(id).then((rs) => {
            setNotification(rs);
        });
    };

    useEffect(() => {
        //get notification
        const socket = SocketSingleton.getInstance();
        socket.on("get-notification", () => {
            fetchNotifications();
        });
        fetchNotifications();

        window.addEventListener("scroll", handleScroll);

        return () => {
            socket.off("get-notification");
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    

    return (
        <div
            ref={headerRef}
            className={`w-full shadow-lg fixed top-0 h-[130px] z-40 transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <TopBar
                openingHours="Mon - Fri: 9am - 5pm"
                phoneNumber="123-456-7890"
            />
            <Navigation
                fetchNotifications={fetchNotifications}
                notification={notification}
                setIsOpenNavMenu={setIsOpenNavMenu}
            />
        </div>
    );
};

export default Header;
