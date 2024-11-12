import React from "react";

const features = [
    "Simple and easy to distinguish",
    "Pleasure of the moment blinded desire",
    "Able to do what we like best",
];

const FeatureList: React.FC = () => {
    return (
        <div className="builder-canvas flex relative flex-wrap gap-2.5 mt-7 min-h-[323px] max-md:max-w-full">
            {features.map((feature, index) => (
                <React.Fragment key={index}>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fcf950d3669f0dc6b551a200df04d51d46ff2fa09466612f17c61cee12ccc5b?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                        alt=""
                        className="object-contain absolute left-0 w-5 aspect-[1.05] fill-red-600 h-[19px]"
                        style={{ top: `${33 + index * 57}px` }}
                    />
                    <div
                        className="absolute text-2xl text-slate-700 left-[53px]"
                        style={{ top: `${30 + index * 57}px` }}
                    >
                        {feature}
                    </div>
                </React.Fragment>
            ))}
            <button
                onClick={() => {
                    window.location.href = "/about";
                }}
                className="flex absolute flex-col justify-center self-center px-14 py-2.5 text-4xl font-bold text-orange-50  bg-red-600 rounded-3xl h-[62px] left-[280px] top-[237px] w-[300px] max-md:px-5 hover:animate-transformZ"
            >
                <span className="text-xl">Read More</span>
            </button>
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e999a1651a89356ca934abcc15bd7b01ad40fe6b104b8f5aa6c002d3b498af14?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                alt="Decorative image"
                className="object-contain absolute top-0 w-0 rounded-xl aspect-[0.95] h-[323px] left-[462.08331298828125px]"
            />
        </div>
    );
};

export default FeatureList;
