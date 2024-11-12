import { useEffect, useState } from "react";
import { getStaffByParamsAPI, deleteStaffAPI } from "../staff.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import FormUpdate from "./FormUpdate";
import { useDispatch } from "react-redux";
import { LiaTrashAlt } from "react-icons/lia";

import {
    title,
    statusMap1,
    statusMap2,
} from "../../../constant/staff.constant";

export default function ListStaff() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [params] = useSearchParams();
    const [isOpenFormUpdate, setIsOpenFormUpdate] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleOpenFormUpdate = (item: any) => {
        setIsOpenFormUpdate(!isOpenFormUpdate);
        setSelectedItem(item);
    };

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteStaffAPI(id);
                fetchData();
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    const fetchData = async () => {
        const rs = await getStaffByParamsAPI({
            page: params.get("page") || 1,
            role: params.get("role"),
            status: params.get("status"),
            search: params.get("search"),
        });
        setList(rs?.data.data);
    };

    useEffect(() => {
        fetchData();
    }, [params, isOpenFormUpdate]);

    useEffect(() => {
        if (list?.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list]);

    return (
        <div className="w-full h-[80%] flex flex-col justify-center items-center p-2">
            <div className="grid grid-cols-8 grid-rows-1 w-[80%] px-5">
                {title.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex justify-start items-center ${item.colSpan}`}
                        >
                            <p className="text-lg font-bold text-black opacity-50 py-2 ">
                                {item.title}
                            </p>
                        </div>
                    );
                })}
            </div>
            {list?.length === 0 ? (
                <div className="w-[80%] h-full grid-rows-5 bg-white rounded-[30px] flex items-center justify-center p-5">
                    <span className="text-red-600 text-[25px] font-medium">
                        No item find
                    </span>
                </div>
            ) : (
                <div className="w-[80%] h-full grid grid-cols-1 grid-rows-5 bg-white rounded-[30px] items-center justify-center p-5">
                    {list?.map(
                        (
                            item: {
                                user_id: number;
                                image: string;
                                fullName: string;
                                email: string;
                                phone: string;
                                role: string;
                                status: string;
                                point: number;
                                permissions: string[];
                            },
                            index: number
                        ) => {
                          
                            return (
                                <div
                                    onClick={() =>
                                        handleOpenFormUpdate(item.user_id)
                                    }
                                    key={item.user_id}
                                    className={` grid grid-cols-8 grid-rows-1 w-full h-full rounded-[5px] hover:bg-blue-100 px-2 ${
                                        index !== 4 ? `border-b-[1px]` : ""
                                    } border-gray-200`}
                                >
                                    {isOpenFormUpdate &&
                                        selectedItem === item.user_id && (
                                            <FormUpdate
                                                permissions={item.permissions}
                                                _id={item.user_id}
                                                handleOpenFormUpdate={
                                                    handleOpenFormUpdate
                                                }
                                            />
                                        )}
                                    <div className="flex justify-start items-center col-span-2">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div className="ml-2">
                                            <p className="text-lg font-bold text-black opacity-50 py-2">
                                                {item.fullName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center col-span-2">
                                        <p className="text-sm text-gray-500">
                                            {item.phone}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center col-span-1">
                                        <p className="text-sm text-gray-500">
                                            {item.role}
                                        </p>
                                    </div>

                                    <div className="flex flex-row gap-2 justify-start items-center col-span-1">
                                        <div
                                            className={`flex items-center justify-center`}
                                        >
                                            <div
                                                className={`w-[10px] h-[10px] rounded-full ${statusMap2.get(
                                                    item.status
                                                )}`}
                                            ></div>
                                        </div>
                                        <p
                                            className={`text-sm font-semibold ${statusMap1.get(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </p>
                                    </div>

                                    <div className="flex justify-start items-center col-span-1">
                                        <p className="text-sm text-gray-500">
                                            {item.point}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center col-span-1">
                                        <LiaTrashAlt
                                            onClick={(event) => {
                                                event?.stopPropagation();
                                                handleDelete(
                                                    item.user_id.toString()
                                                );
                                            }}
                                            className=" text-cancelled text-[40px] p-1 rounded-md ml-2 hover:text-red-200"
                                        />
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}
