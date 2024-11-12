import React, { useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
interface HeaderProps {
    setIsOpenNavMenu: (value: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ setIsOpenNavMenu }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
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
            <Navigation setIsOpenNavMenu={setIsOpenNavMenu}/>
        </div>
    );
};

export default Header;
