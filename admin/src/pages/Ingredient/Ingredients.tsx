//components
import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import FormAdd from "./components/FormAdd";
import PagingBar from "../../components/commons/PagingBar";
//api
import { getSumIngredientAPI } from "./ingredient.service";
import ListIngredients from "./components/ListIngredients";
import FilterBar from "./components/FilterBar";

export default function Ingredient() {
    const [isAdd, setIsAdd] = useState(false);
    const [isRender, setIsRender] = useState(false);
    const [params] = useSearchParams();

    const [totalPage, setTotalPage] = useState(0);
    const limit = 10;

    const fetchData = async () => {
        const data = {
            is_available: params.get("status"),
            search: params.get("title"),
        };
        const rs = await getSumIngredientAPI(data);
        setTotalPage(Math.ceil(rs?.data?.result[0] / limit));
    };
    

    useEffect(() => {
        fetchData();

    }, [params, isRender]);
    return (
            <div className="w-full h-full bg-main-bg col-span-5 row-span-12   ">
                {isAdd && <FormAdd isOpen={setIsAdd} setIsRender={setIsRender} isRender={isRender} />}

                <FilterBar setIsAdd={setIsAdd} />
                <ListIngredients isRender={isRender} />
                <PagingBar totalPage={totalPage} />
            </div>
    );
}
