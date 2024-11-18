import BigOffer from "./components/BigOffer/BigOffer";
import PopularDishes from "./components/FoodItems/FoodItems";
import Menu from "./components/Menu/Menu";
import SpecialsMenu from "./components/SpecialMenu/SpecialsMenu";
import layoutService from "../../utils/layout/layout.service";
import { useQuery } from "@tanstack/react-query";
import JSXParser from "react-jsx-parser";
import Carousel from "./components/Carousel/Carousel";

const images = [
    {
        link: "https://res.cloudinary.com/dytan1asl/image/upload/v1731480869/fAndb/lgrx3teaojwue9q386h2.webp",
        text: "Unmatched Flavor Experience",
        description: "Grilled Chicken Wings",
        title: "Savor the Perfect Crisp",
    },
    {
        link: "https://res.cloudinary.com/dytan1asl/image/upload/v1731480814/fAndb/uvpbm4onmwuyvk3yxsej.webp",
        text: "Freshness You Can Taste",
        description: "Juicy Chicken Sandwich",
        title: "Crafted to Satisfy Every Bite",
    },
    {
        link: "https://res.cloudinary.com/dytan1asl/image/upload/v1731480888/fAndb/rgcpefbpkz9tngw5ur6r.webp",
        text: "The Ultimate Indulgence",
        description: "Classic Chicken Burgers",
        title: "Perfected for Fast Food Enthusiasts",
    },
];

export default function Main() {
    const fetchLayout = async () => {
        const response = await layoutService.apiGetLayout("home");
        return response.data.result;
    };
    const { data } = useQuery({
        queryKey: ["layout", "home"],
        queryFn: () => fetchLayout(),
    });
    return (
        <div className="w-screen h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden">
            <div className="w-screen h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden lg:px-0 px-[30px] gap-[50px]">
                <Carousel images={images} />
                <PopularDishes />
                <Menu />
                <BigOffer />
                <SpecialsMenu />
                {data &&
                    data.map((item: any, index: number) => (
                        <JSXParser
                            key={index}
                            jsx={item.code}
                            bindings={{}}
                            components={{}}
                            renderInWrapper={false}
                        />
                    ))}
            </div>
        </div>
    );
}
