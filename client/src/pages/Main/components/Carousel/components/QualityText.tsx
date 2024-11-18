import React from "react";
interface QualityTextProps {
    text: string;
    title: string;
    description: string;
}
const QualityText: React.FC<QualityTextProps> = ({
    text,
    title,
    description,
}) => {
    return (
        <div className="z-50 absolute max-sm:top-[5%] sm:top-[15%] max-sm:left-0 sm:left-[10%] sm:flex flex-col items-start rounded-lg space-y-2 p-[50px]">
            <h2 className=" text-glow  max-sm:text-[15px] sm:text-[25px] sm:font-bold italic font-bold uppercase text-orange-100">
                {title}
            </h2>
            <div className="flex flex-col text-yellow-200">
                {text.split(" ").map((word, index) => {
                    return (
                        <span
                            key={index}
                            className="text-glow max-sm:text-[32px] italic sm:text-[50px] sm:font-bold uppercase font-extrabold"
                        >
                            {word}
                        </span>
                    );
                })}
            </div>

            <p className="max-sm:text-[10px] sm:text-[15px] font-medium text-orange-100">
                {description}
            </p>
        </div>
    );
};

export default QualityText;
