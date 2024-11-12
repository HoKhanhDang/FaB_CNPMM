import React from "react";
import LeftCarousel from "../LeftCarousel";

const dishes = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/510335dc34f36c8e07b4ee3678c874d8ff3114f5e30abd5dc607077fea3450d0?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 1",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/17680eb9932fe5db89daf96937417968880c288cd23ab4b762f4b6b1d6654424?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 2",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b33f177db2edfea743ba94fbc0f376f7e48c7e6cf1f8241b8189914add060f1c?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 3",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fb43f9a56aebd639542d48225366991a25fee3dd0d8d71c83b0922eb018cb2f?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 4",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ea34573be79f68a0b2ac13ae203f418309b8b8a9f4006e57a72cc1468ff82c2?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 5",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/510335dc34f36c8e07b4ee3678c874d8ff3114f5e30abd5dc607077fea3450d0?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 1",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/17680eb9932fe5db89daf96937417968880c288cd23ab4b762f4b6b1d6654424?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 2",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b33f177db2edfea743ba94fbc0f376f7e48c7e6cf1f8241b8189914add060f1c?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 3",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fb43f9a56aebd639542d48225366991a25fee3dd0d8d71c83b0922eb018cb2f?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 4",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ea34573be79f68a0b2ac13ae203f418309b8b8a9f4006e57a72cc1468ff82c2?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        alt: "Popular dish 5",
    },
];

const PopularDishes: React.FC = () => {
    return (
        <div className="flex flex-col md:px-[100px] w-full h-auto gap-2">
            <h3 className="self-center text-xl font-bold text-slate-700 max-md:ml-2.5">
                Food Items
            </h3>
            <h2 className="self-center text-4xl font-bold text-red-600">
                Popular Dishes
            </h2>
            <LeftCarousel images={dishes}/>
            {/* <div className="flex max-md:flex-col flex-row gap-5 mt-5 scrollbar-hidden max-md:animate-none scrolling-wrapper">
                {dishes.map((dish, index) => (
                    <img
                        key={index}
                        loading="lazy"
                        src={dish.src}
                        alt={dish.alt}
                        className="object-contain shrink-0 max-w-full rounded-md aspect-[1.91] w-[250px]"
                    />
                ))}
            </div> */}
        </div>
    );
};

export default PopularDishes;
