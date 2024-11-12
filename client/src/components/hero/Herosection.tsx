import React from "react";
import image1 from "../../assets/image/hero.png";

type HeroSectionProps = {
    title: string;
    subtitle: string;
    price: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    price,
}) => {
    return (
        <section className="max-w-full w-full md:px-[200px] h-screen pt-[130px]">
            <div className="flex flex-row max-md:flex-col max-md:pt-5 h-full w-full justify-center items-center">
                <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full z-30">
                    <h2 className="text-xl italic font-medium text-red-600">
                        {subtitle}
                    </h2>
                    <h1 className="mt-3 text-5xl italic font-extrabold text-red-600 w-[422px] max-md:max-w-full max-md:text-4xl">
                        {title}
                    </h1>
                    <div className="hidden lg-flex gap-8 self-end mt-16 max-md:mt-10">
                        <button className="px-4 py-2.5 text-4xl font-bold text-orange-50 bg-red-600 rounded-xl">
                            Order Now
                        </button>
                        <div className="my-auto text-2xl basis-auto text-slate-700">
                            Price : {price}
                        </div>
                    </div>
                </div>
            
                <img
                    loading="lazy"
                    src={image1}
                    className=" object-scale-down md:object-cover w-3/4 h-full right-0  md:flex max-md:object-cover max-md:w-full max-md:h-[300px]"
                    alt="Delicious chicken burger"
                />
            </div>
        </section>
    );
};

export default HeroSection;
