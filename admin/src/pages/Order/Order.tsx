//components
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "./components/FilterBar";
import ListOrders from "./components/ListOrder";
import PagingBar from "../../components/commons/PagingBar";

import { getSumOrdersByParams } from "../../utils/Order/order.utils";

export default function Order() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const [params] = useSearchParams();
    const [totalPage, setTotalPage] = useState<number>(0);
    const limit = 10;

    useEffect(() => {
        getSumOrdersByParams(params).then((data) => {
            setTotalPage(Math.ceil(data / limit));
        });
    }, [params]);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        sessionStorage.setItem("active", "1");
    }, []);

    return (
        <div className="w-full h-full bg-main-bg col-span-5 row-span-12">
            <FilterBar />
            <ListOrders isRender={true} />
            <PagingBar totalPage={totalPage} />
        </div>
    );
}
