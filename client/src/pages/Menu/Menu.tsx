import React, { useEffect, useState } from "react";
import FoodMenu from "./Components/FoodMenuNormal/FoodMenu";
import FoodMenuSpecial from "./Components/FoodMenuNormal/FoodMenuSpecial";
import SearchBar from "./Components/SeachBar";
import HeroSection from "../../components/top-title/HeroSection";
import { useSearchParams } from "react-router-dom";
import { getMenu, getSpecialMenu } from "../../utils/menu/menu.util";

import { IFoodItem } from "../../types/IFood";
import { useQuery } from "@tanstack/react-query";
import ItemDetail from "./Components/Detail/ItemDetail";
const Menu: React.FC = () => {
    const [params] = useSearchParams();
    const [foods, setFood] = useState<IFoodItem[]>([]);
    const [foodDetail, setFoodDetail] = useState<IFoodItem | null>(null);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const { data } = useQuery({
        queryKey: ["menu"],
        queryFn: getSpecialMenu,
    });
    const fetchData = async () => {
        const rs = await getMenu({
            title: params.get("search"),
            page: 1,
            limit: 20,
        });
      
        if (params.get("id")) {
            rs.forEach((item: any) => {
                if (item.item_id === params.get("id")) {
                    setFoodDetail(item);
                }
            });
        }
        setFood(rs);
    };

    useEffect(() => {
        if (params.get("id")) {
            setIsShowDetail(true);
        }else{
            setIsShowDetail(false);
        }
        fetchData();
    }, [params]);
    console.log(foodDetail);
    return (
        <main className="flex flex-col items-center">
            <div className="flex flex-col items-center lg:px-0 px-[30px]">
                <HeroSection
                    title={
                        isShowDetail ? (foodDetail?.title as string) : "Menu"
                    }
                    description={
                        isShowDetail
                            ? ""
                            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius mod tempor incididunt ut labore et dolore magna"
                    }
                />
                {!isShowDetail && <SearchBar />}
                {isShowDetail && (
                    <>
                        <ItemDetail
                            title={foodDetail?.title as string}
                            id={foodDetail?.item_id as string}
                            price={foodDetail?.price as number}
                            detail={foodDetail?.description as string}
                            image={foodDetail?.image as string}
                            availability={foodDetail?.availability as boolean}

                        />
                        <span className="text-[30px] text-red-500 font-bold mt-5">
                            See more items
                        </span>
                    </>
                )}

                <FoodMenu items={foods} len={foods.length} />
                <FoodMenuSpecial items={data} />
            </div>
        </main>
    );
};

export default Menu;
