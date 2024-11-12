import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useMemo, useState } from "react";
import { getStaffByParamsAPI } from "../staff.service";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function PagingBar() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const pageNumber = 1;
    const [totalPage, setTotalPage] = useState(1);
    const limit = 5;

    const getSumStaff = async () => {
        const data = {
            page: params.get("page") || pageNumber,
            status: params.get("status"),
            role: params.get("role"),
            search: params.get("search"),
            limit: 5,
        };
        const res = await getStaffByParamsAPI(data);

        if (res?.status !== 200) {
            return;
        }
        setTotalPage(Math.ceil(res?.data?.length[0]?.Sum / limit));
    };
    useEffect(() => {
        getSumStaff();   
    }, [params]);
    return (
        <div className="w-full h-[10%] flex justify-center items-center">
            <Stack spacing={2}>
                <Pagination
                    count={totalPage}
                    onChange={(event, page) => {
                        params.delete("page");
                        params.append("page", page.toString());
                        navigate(`?${params.toString()}`);
                    }}
                />
            </Stack>
        </div>
    );
}
