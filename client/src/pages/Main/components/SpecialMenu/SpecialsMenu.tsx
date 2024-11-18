/**
 * This code was generated by Builder.io.
 */
import React from "react";
import MenuItem from "./MenuItem";
import { useQuery } from "@tanstack/react-query";
import { getSpecialMenu } from "../../../../utils/menu/menu.util";
import { IFoodItem } from "../../../../types/IFood";
const SpecialsMenu: React.FC = () => {
    const {data} = useQuery({
        queryKey: ["specialmenu", "specialmenu"],
        queryFn: () => getSpecialMenu(),
    })

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 lg:px-[100px]">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 max-w-full text-center">
                SPECIALS MENU FOR ALL TIME
            </h1>
            <div className="w-full grid max-sm:grid-cols-1 sm:grid-cols-7 gap-1 lg:px-[100px] mt-8 text-lg md:text-xl lg:text-2xl text-red-600">
                { data && data.slice(0, 14).map((item:IFoodItem, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SpecialsMenu;
