import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getMenu } from "../../../../utils/menu/menu.util";
// Define the type for menu items

interface IMenuItem {
    item_id: string;
    title: string;
    description: string;
    price: number;
    category: "Food" | "Beverage" | "Special";
}

const Menu: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"Food" | "Beverage" | "Special">(
        "Food"
    );
    const { data } = useQuery({
        queryKey: ["menu", "menu"],
        queryFn: () => getMenu({}),
    });

    const filteredItems: IMenuItem[] =
        data?.filter((item: IMenuItem) => item.category === activeTab) || [];

    return (
        <div className="w-full max-sm:px-2 sm:px-[100px] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Check out our menu</h1>
            <p className="text-sm italic mb-6">
                Demoralized by the charms of pleasure of the moment so blinded
                except to some advantage.
            </p>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                {["Food", "Beverage", "Special"].map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 font-semibold ${
                            activeTab === category
                                ? "text-white bg-red-500"
                                : "text-red-500 border border-red-500"
                        } rounded-full focus:outline-none`}
                        onClick={() =>
                            setActiveTab(category as typeof activeTab)
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Menu Items */}
            <div className="w-full flex max-sm:flex-col sm:flex-row ">
                <div className="max-sm:w-full sm:w-1/2 h-full ">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8fa983c00fbd93fe26609bb2d5c06e0aec611827c2f1dad9f61c4c4d58e5d613?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                        alt=""
                    />

                    <button
                        onClick={() => (window.location.href = "#/menu")}
                        className="w-full h-[50px] bg-red-500 hover:bg-red-500/70 text-white rounded-md flex justify-center items-center"
                    >
                        Get all Menu
                    </button>
                </div>

                <div className="max-sm:w-full sm:w-1/2 p-5  h-full ">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item: IMenuItem) => (
                            <div
                                onClick={() =>
                                    (window.location.href = `#/menu?id=${item.item_id}`)
                                }
                                key={item.item_id}
                                className="mb-4 border-b hover:bg-orange-100 border-gray-200 p-4 flex flex-row items-center justify-between"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xl font-semibold text-red-500">
                                        {item.title}
                                    </span>
                                    <span className="text-gray-700">
                                        {item.description}
                                    </span>
                                </div>

                                <span className="text-lg font-bold mt-2 text-red-500">
                                    ${item.price}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">
                            No items available in this category.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
