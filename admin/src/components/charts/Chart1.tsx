import React from "react";
import {
    AiOutlineEye,
    AiOutlineShoppingCart,
    AiOutlineShopping,
    AiOutlineUser,
} from "react-icons/ai";

interface CardNumberProps {
    title: string;
    number: number;
    change: number;
    changeType: "up" | "down";
    icon: React.ReactNode;
}
const CardNumber: React.FC<CardNumberProps> = ({
    title,
    number,
    change,
    changeType,
    icon,
}) => {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 w-full">
            <div className="flex flex-col justify-start items-start gap-5">
                <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
                <div className="flex flex-row items-center justify-between w-full ">
                    <div className="flex items-center space-x-2">
                        <div>
                            <h3 className="text-2xl font-semibold">{number}</h3>
                            <p className="text-gray-500">{title}</p>
                        </div>
                    </div>
                    <div
                        className={`text-lg font-semibold ${
                            changeType === "up"
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {change.toFixed(2)}% {changeType === "up" ? "↑" : "↓"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNumber;
