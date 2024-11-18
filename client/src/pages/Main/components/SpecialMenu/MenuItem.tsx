import React from "react";
import { IFoodItem } from "../../../../types/IFood";
import { useNavigate } from "react-router-dom";
interface MenuItemData {
    item: IFoodItem;
}

const MenuItem: React.FC<MenuItemData> = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`menu?id=${item.item_id}`)}
            className="w-full h-full p-5 hover:bg-red-400 hover:text-white flex flex-col justify-center items-center rounded-md"
        >
            <img
                src={item.image}
                alt={`${item.title} menu item`}
                className="object-cover w-[100px] h-[100px] rounded-xl"
                loading="lazy"
            />
            <div className={`mt-2 text-center text-[15px] w-auto`}>
                <span>{item.title}</span>
            </div>
        </div>
    );
};

export default MenuItem;
