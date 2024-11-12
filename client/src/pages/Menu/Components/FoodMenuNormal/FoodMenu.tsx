import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import FoodMenuItem from "./FoodMenuItem";

import { IFoodItem } from "../../../../types/IFood";

interface FoodMenuProps {
    items: IFoodItem[];
    len?: number;
}

const FoodMenu: React.FC<FoodMenuProps> = ({ items, len }) => {
    const [itemCount, setItemCount] = useState<number>(len || items.length);
    const [filterItems, setFilterItems] = useState<IFoodItem[]>(items);
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1,
    };

    useEffect(() => {
        setItemCount(len || items.length);
        setFilterItems(items.slice(0, len || items.length));
    }, [len, items]);

    useEffect(() => {
        setFilterItems(items.slice(0, itemCount));
    }, [itemCount, items]);

    return (
        <main className="md:px-[100px] pt-5 bg-white w-full ">
            <div className="w-full h-[50px] mb-5 flex justify-start items-center">
                <div className="flex flex-row items-center gap-2 mb-4">
                    <label
                        htmlFor="itemCount"
                        className="text-lg font-semibold"
                    >
                        Quantity:
                    </label>
                    <input
                        id="itemCount"
                        type="number"
                        min="1"
                        max={items.length}
                        value={itemCount}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        className="w-20 h-10 px-2 text-lg text-gray-600 bg-gray-100 rounded focus:outline-none"
                    />

                    <select
                        value={itemCount}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        className="h-10 px-3 text-lg text-gray-600 bg-gray-100 rounded focus:outline-none"
                    >
                        <option value={5}>5 items</option>
                        <option value={10}>10 items</option>
                        <option value={15}>15 items</option>
                        <option value={20}>20 items</option>
                        <option value={items.length}>All</option>
                    </select>
                </div>
            </div>
            <div className="w-full h-auto">
                <Masonry
                    style={{ width: "100%" }}
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid gap-5 w-full"
                    columnClassName="my-masonry-grid_column"
                >
                    {filterItems.length >= 3 && (
                        <div className="transform_z">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8cce017380ef412439d973dd7de2d9d1311e6eb0bc13e14210d4d515d9fc423?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                                alt="Featured dish"
                                className="object-contain w-full shadow-sm max-md:max-w-full rounded-3xl"
                            />
                        </div>
                    )}

                    {filterItems.map((item, index) => (
                        <div key={index}>
                            <FoodMenuItem {...item} />
                        </div>
                    ))}
                    {filterItems.length >= 10 && (
                        <div className="transform_z">
                            <img
                                loading="lazy"
                                src="https://img.freepik.com/premium-psd/grill-beef-steak-hot-delicious-social-media-instagram-post-template_1145094-1440.jpg"
                                alt="Featured dish"
                                className="object-contain w-full shadow-sm max-md:max-w-full rounded-3xl"
                            />
                        </div>
                    )}
                </Masonry>
            </div>
        </main>
    );
};

export default FoodMenu;
