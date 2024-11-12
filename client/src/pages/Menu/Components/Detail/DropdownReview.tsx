import React, { useState } from "react";
import FoodRating from "./ItemReview";
import { RiArrowDownSLine } from "react-icons/ri";
interface DropdownItemMenuProps {
    item_id: string;
}

const DropdownItemMenu: React.FC<DropdownItemMenuProps> = ({ item_id }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full flex flex-col justify-center items-center">
            <button
                className="transition-all duration-1000 ease-in-out max-sm:w-full sm:w-1/2 hover:bg-red-500/90 p-2 bg-red-500 my-5 text-white rounded-lg flex flex-row items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {!isOpen ? "View" : "Hidden"} Food Ratings
                <RiArrowDownSLine
                    className={`${
                        isOpen ? "rotate-180" : "rotate-0"
                    } text-[30px] transition-all duration-1000 ease-in-out`}
                />
            </button>
            {isOpen && (
                <div className="animate__animated animate__fadeIn inset-0 mt-2 max-sm:w-full max-sm:mx-2 sm:w-1/2 sm:p h-auto bg-white border rounded-lg shadow-lg p-4">
                    <FoodRating item_id={
                        item_id
                    }/>
                </div>
            )}
        </div>
    );
};

export default DropdownItemMenu;
