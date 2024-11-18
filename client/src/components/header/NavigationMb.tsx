import React from "react";
import { useNavigate } from "react-router-dom";
interface NavigationItemProps {
    text: string;
    className?: string;
    link?: string;
}

function NavigationItem({
    text,
    className = "",
    link = "/",
}: NavigationItemProps) {
    const navigate = useNavigate();
    return (
        <div
            className={`gap-2.5 self-stretch mt-5 text-2xl font-extrabold text-green-800 uppercase ${className}`}
            onClick={() => {
                navigate(link);
            }}
        >
            {text}
        </div>
    );
}
const navigationItems = [
    { text: "home", className: "whitespace-nowrap", link: "/" },
    { text: "about", className: "whitespace-nowrap", link: "/about" },
    { text: "course", link: "/course" },
    { text: "vls team", link: "/" },
    { text: "vls life", link: "/" },
    { text: "recruitment", className: "whitespace-nowrap", link: "/career" },
    { text: "contact", className: "whitespace-nowrap", link: "/contact" },
];

const Divider: React.FC = () => (
    <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
        <div className="w-full border-2 border-orange-500 border-dashed min-h-[2px] max-md:max-w-full" />
    </div>
);

interface MainLayoutProps {
    handleOpen: () => void;
}
const MainLayout: React.FC<MainLayoutProps> = ({ handleOpen }) => {
    return (
        <div className="flex flex-col absolute top-0 left-0 w-screen h-screen z-50 bg-slate-200">
            <div className="flex flex-col items-start w-full max-sm:mt-0 max-sm:max-w-sm">
                <div className="flex gap-10 items-center self-stretch">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9540c33e122eeb03474e15720dd59de70d2ca0080331599d4c5af37a0aa3bc4?apiKey=e34b0bbc442149bfa463a424862e236a&"
                        alt=""
                        className="object-contain shrink-0 self-stretch my-auto aspect-[1.27] w-[90px] max-sm:ml-9"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f34fc0d6572ffb2381d3fb010d84bf0ab9df99228da372af6ddfac0aec1a8790?apiKey=e34b0bbc442149bfa463a424862e236a&"
                        alt=""
                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
                        onClick={handleOpen}
                    />
                </div>
                {navigationItems.map((item, index) => (
                    <NavigationItem
                        key={index}
                        text={item.text}
                        className={`${index === 0 ? "mt-5 w-full" : ""} ${
                            item.className || ""
                        } max-sm:pl-10`}
                        link={item.link}
                    />
                ))}
            </div>
            <Divider />
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/71584985d5aaf99f18868e5eea7dd4cfa8b2f79d5079356d49cf9b839d2e16d4?apiKey=e34b0bbc442149bfa463a424862e236a&"
                alt=""
                className="object-contain self-end -mt-28 mr-10 w-5 aspect-[0.59] max-md:mr-2.5"
            />
        </div>
    );
};

export default MainLayout;
