import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./components/Arrow";
import QualityText from "./components/QualityText";

interface CarouselProps {
    images: any[];
}
const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,

        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className="w-screen max-sm:h-auto sm:h-screen pt-[130px] relative">
            <Slider {...settings} className="!h-full !overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="w-screen max-sm:h-screen sm:h-screen flex justify-center items-center relative"
                    >
                        <img
                            src={image.link}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />

                        <QualityText
                            title={image.title}
                            text={image.text}
                            description={image.description}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
