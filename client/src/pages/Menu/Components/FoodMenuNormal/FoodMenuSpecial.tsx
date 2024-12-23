/**
 * This code was generated by Builder.io.
 */
import React from "react";
import FoodItem from "./FoodMenuItem";
import { IFoodItem } from "../../../../types/IFood";

interface FoodItemProps {
    items?: IFoodItem[];
}

const FoodMenuSpecial: React.FC<FoodItemProps> = ({
    items,
}) => {
    return (
        <main className="flex flex-col md:px-[100px] mt-5 bg-white">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86d931f38fdd01a1de4852bc2e455ffb30f2fea7c3abda8f92bc1bf5baa5128?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                alt="Food menu header"
                className="object-contain w-full shadow-sm aspect-[3.76] max-md:max-w-full"
            />
            <section className="mt-6 max-md:mr-2 max-md:max-w-full w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {items?.slice(0, 2).map((item, index) => (
                        <FoodItem key={index} {...item} />
                    ))}
                </div>
            </section>
            <section className="mt-8 max-md:mr-2 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {items?.slice(2, 4).map((item, index) => (
                        <FoodItem key={index} {...item} />
                    ))}
                </div>
            </section>
            <section className="mt-8 max-md:mr-2 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {items?.slice(4, 6).map((item, index) => (
                        <FoodItem key={index} {...item} />
                    ))}
                </div>
            </section>
            <section className="mt-8 max-md:mr-2 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {items?.slice(6, 8).map((item, index) => (
                        <FoodItem key={index} {...item} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default FoodMenuSpecial;
