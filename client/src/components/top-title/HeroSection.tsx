/**
 * This code was generated by Builder.io.
 */
import React from "react";

interface HeroSectionProps {
    title: string;
    description: string;
}
const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
    return (
        <header className="flex relative flex-col justify-center items-center h-[400px] self-stretch px-20 pt-[130px] w-full text-orange-50 min-h-[280px] max-md:px-5 max-md:pt-24 max-md:max-w-full">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/443c9c548f4f60485edd7843abad7713979d075b25e755b5f71d41c1ba3594b3?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                alt=""
                className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col max-w-full w-full">
                <h1 className="self-center text-4xl font-bold">{title}</h1>
                <p className="mt-1 max-sm:text-[1rem] text-center px-5" >
                    {description}
                </p>
            </div>
        </header>
    );
};

export default HeroSection;