//components
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListCustomer from "./components/ListCustomer";
import FilterBar from "./components/FilterBar";
import PagingBar from "../../components/commons/PagingBar";
import { getCustomerByParamsAPI } from "./customer.service";

export default function Customer() {
    const [params] = useSearchParams();
    const pageNumber = 1;
    const [totalPage, setTotalPage] = useState(1);
    const limit = 5;

    //api paging
    const getSumCustomer = async () => {
        const data = {
            page: params.get("page") || pageNumber,
            status: params.get("status"),
            search: params.get("search"),
            limit: 5,
        };

        const res = await getCustomerByParamsAPI(data);
        setTotalPage(Math.ceil(res.data.total / limit));
    };
    useEffect(() => {
        getSumCustomer();
    }, [params]);

    return (
        <div className="w-full h-full bg-main-bg col-span-5 row-span-12">
            <FilterBar />
            <ListCustomer />
            <PagingBar totalPage={totalPage} />
        </div>
    );
}
