import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
    getCustomerByParamsAPI,
    changeStatusCustomerAPI,
} from "../customer.service";
import DisplayInformation from "./DisplayInformation";
import { FaBan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { title, statusMap1, statusMap2 } from "../../../constant/customer.constant";

interface StatusButtonProps {
    color: string;
    text: string;
}

export default function ListCustomer() {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [params] = useSearchParams();

    const [isOpenFormInformation, setIsOpenFormInformation] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    const handleOpenForm = (userId: string) => {
        setIsOpenFormInformation(!isOpenFormInformation);
        setSelectedCustomer(userId);
    };
    const handleBanCustomer = async (userId: string, status: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to do this action?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeStatusCustomerAPI({
                    _id: userId,
                    status: status,
                });
                if (rs?.status === 200) {
                    toast.success("Change status successfully");
                    fetchData();
                } else {
                    toast.error("Change status failed");
                }
            }
        });
    };

    const fetchData = async () => {
        const rs = await getCustomerByParamsAPI({
            page: params.get("page") || 1,
            status: params.get("status"),
            search: params.get("search"),
        });
        setList(rs.data.data);
    };
    useEffect(() => {
        fetchData();
    }, [params]);
    useEffect(() => {
        if (list.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list]);

    return (
        <div className="w-full h-[80%] flex flex-col justify-center items-center px-[100px]">
            <div className="grid grid-cols-7 grid-rows-1 w-[80%] px-[30px]">
                {title.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex ${item.justify} items-center ${item.colSpan}`}
                        >
                            <p className="text-lg font-bold text-black opacity-50 py-2">
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
                <div className="w-[80%] h-full grid grid-cols-1 grid-rows-5 bg-white rounded-[30px] items-center justify-center p-[30px]">
                    {list?.map(
                        (
                            item: {
                                user_id: string;
                                image: string;
                                fullName: string;
                                email: string;
                                phone: string;
                                status: string;
                            },
                            index: number
                        ) => {
                            return (
                             
                                    <div
                                        onClick={() =>
                                            handleOpenForm(item.user_id)
                                        }
                                        key={item.user_id}
                                        className={`" grid grid-cols-7 grid-rows-1 w-full h-full rounded-[5px] hover:bg-blue-100 ${
                                            index !== 4 ? `border-b-[1px]` : ""
                                        } border-gray-200"`}
                                    >
                                        <div className="flex justify-center items-center col-span-1">
                                            <p className="text-lg font-bold text-black opacity-50 py-2">
                                                {item.user_id.slice(0, 5)}...
                                            </p>
                                        </div>
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

                                        <div className="flex  flex-row justify-start gap-2 items-center col-span-1">
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

                                        <div className="flex justify-start items-center gap-3 col-span-1">
                                        
                                            <FaBan
                                                onClick={(event) => {
                                                    event?.stopPropagation();
                                                    handleBanCustomer(  
                                                        item.user_id,
                                                        item.status === "banned"
                                                            ? "active"
                                                            : "banned"
                                                    );
                                                }}
                                                className="text-[30px] text-red-500 hover:text-red-200"
                                            />
                                        </div>
                                    </div>
                            
                            );
                        }
                    )}
                    {isOpenFormInformation && (
                        <DisplayInformation
                            setIsOpenFormInformation={setIsOpenFormInformation}
                            user_id={selectedCustomer}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
