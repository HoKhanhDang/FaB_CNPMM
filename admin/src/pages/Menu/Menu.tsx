//components
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./Components/FilterBar";
import ListItems from "./Components/ListItems";

import { getFoodByParamsAPI } from "./menu.service";
import PagingBar from "../../components/commons/PagingBar";
import FormAdd from "./Components/FormAdd";
import FormEdit from "./Components/FormEdit";

const Menu = () => {
    const [isRender, setIsRender] = useState(false);
    const [params] = useSearchParams();
    const [page, setPage] = useState(1);
    const limit = 5;

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [m_id, setM_id] = useState("");
    const handleEdit = (isEdit: boolean, m_id: string) => {
        setIsEdit(isEdit);
        setM_id(m_id);
    };

    //api paging
    const getSumFood = async () => {
        try {
            const data = {
                status: params.get("status"),
                title: params.get("title"),
            };

            // Gọi API để lấy dữ liệu
            const res = await getFoodByParamsAPI(data);
            setPage(Math.ceil(res?.data?.data.total / limit));
        } catch (error) {
            console.error("Error fetching sum:", error);
            setPage(0);
        }
    };

    useEffect(() => {
        getSumFood();
        setIsRender(!isRender);
    }, [params, isAdd, isEdit]);

    return (
        <div className="w-full h-full bg-main-bg col-span-5 row-span-12">
            {isAdd && <FormAdd setIsAdd={setIsAdd} />}
            {isEdit && <FormEdit m_id={m_id} setIsEdit={setIsEdit} />}
            <FilterBar setIsAdd={setIsAdd} />
            <ListItems setIsEdit={handleEdit} isRender={isRender} />
            <PagingBar totalPage={page} />
        </div>
    );
};

export default Menu;
