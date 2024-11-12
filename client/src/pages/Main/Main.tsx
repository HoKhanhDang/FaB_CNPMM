import HeroSection from "../../components/hero/Herosection";
import BigOffer from "./components/BigOffer/BigOffer";

import PopularDishes from "./components/FoodItems/FoodItems";
import Menu from "./components/Menu/Menu";

// import RichAndHealthy from "./components/RichAndHealthy/RichAndHealthy";
import SpecialsMenu from "./components/SpecialMenu/SpecialsMenu";
// import Testimonial from "./components/Testimonial/Testimonial";
// import WhyWeAreBest from "./components/WeTheBest/WhyWeAreBest";
// import DeliverySection from "./components/Delivery/DeliverySection";
// import RestaurantPage from "./components/OurRestaurant/RestaurantPage";
import layoutService from "../../utils/layout/layout.service";
import { useQuery } from "@tanstack/react-query";
import JSXParser from "react-jsx-parser";

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
                <HeroSection
                    title="ENJOY OUR CHICKEN BURGER FAST FOOD"
                    subtitle="Best In Town"
                    price="99$"
                />
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

                {/* <RichAndHealthy /> */}
                {/* <DeliverySection
                    title="A Moments Of"
                    phoneNumber="+880 1630 225 015"
                    subtitle="Delivered On Right Time & Place"
                    description="Food Khan is a restaurant, bar and coffee roastery located on a busy corner site in Farringdon's Exmouth Market. With glazed frontage on two sides of the building, overlooking the market and a bustling London inteon."
                /> */}
                {/* <RestaurantPage />             */}
                {/* <WhyWeAreBest /> */}
                {/* <Testimonial /> */}
            </div>
        </div>
    );
}
