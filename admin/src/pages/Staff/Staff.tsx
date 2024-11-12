//components
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "./components/FilterBar";
import ListStaff from "./components/ListStaff";
import PagingBar from "../../components/commons/PagingBar";
import { getStaffByParamsAPI } from "./staff.service";

export default function Staff() {
    const [params] = useSearchParams();
    const pageNumber = 1;
    const [totalPage, setTotalPage] = useState(1);
    const limit = 5;

    //api paging
    const getSumStaff = async () => {
        const data = {
            page: params.get("page") || pageNumber,
            status: params.get("status"),
            role: params.get("role"),
            search: params.get("search"),
            limit: 5,
        };
        const res = await getStaffByParamsAPI(data);
        setTotalPage(Math.ceil(res?.data?.total / limit));
    };
    useEffect(() => {
        getSumStaff();
    }, [params]);

    return (
        <div className="w-full h-full bg-main-bg col-span-5 row-span-12   ">
            <FilterBar />

            <ListStaff />
            <PagingBar totalPage={totalPage} />
        </div>
    );
}
