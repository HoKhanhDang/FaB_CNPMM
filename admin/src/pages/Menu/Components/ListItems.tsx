import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    getFoodByParamsAPI,
    deleteFoodAPI,
    updateStatusFoodAPI,
} from "../menu.service";
import Swal from "sweetalert2";
import FormIngredients from "./FormIngredients";
import FormNutrition from "./FormNutrition";

//icon
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { FiBox } from "react-icons/fi";
import FormatCurrency from "../../../helper/FormatCurrency.helper";

const title = [
    {
        title: "Title",
        colSpan: "col-span-2",
        justify: "justify-center",
    },
    {
        title: "Image",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Price",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Category",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Description",
        colSpan: "col-span-2",
        justify: "justify-start",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
        justify: "justify-center",
    },
    {
        title: "Action",
        colSpan: "col-span-2",
        justify: "justify-center",
    },
];

interface ListItemsProps {
    setIsEdit: (value: boolean, m_id: string) => void;
    isRender?: boolean;
}
const ListItems: React.FC<ListItemsProps> = ({ setIsEdit, isRender }) => {
    const [list, setList] = useState<any[]>([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [isOpenFormNutri, setIsOpenFormNutri] = useState(false);
    const [isOpenFormIngre, setIsOpenFormIngre] = useState(false);
    const [id, setId] = useState("");

    const handleOpenFormIngre = (id: string) => {
        setId(id);
        setIsOpenFormIngre(true);
    };
    const handleOpenFormNutri = (id: string) => {
        setId(id);
        setIsOpenFormNutri(true);
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await deleteFoodAPI(id);
                if (rs.status === 200) {
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
                } else {
                    Swal.fire("Error!", "Something went wrong", "error");
                }
                fetchData();
            }
        });
    };

    const fetchData = async () => {
        const data = {
            availability: params.get("status"),
            title: params.get("title"),
            category: params.get("category"),
            page: params.get("page") || 1,
            limit: 5,
        };
        const rs = await getFoodByParamsAPI(data);
        setList(rs?.data?.data?.data);
    };

    useEffect(() => {
        fetchData();
    }, [params, isRender]);

    useEffect(() => {
        if (list?.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list]);
    return (
        <div className="w-full h-[80%] flex flex-col justify-center items-center px-5">
            {isOpenFormIngre && (
                <FormIngredients
                    item_id={id}
                    setIsOpenFormIngre={setIsOpenFormIngre}
                    isEdit={isOpenFormIngre}
                />
            )}
            {isOpenFormNutri && (
                <FormNutrition
                    id={id}
                    setIsOpenFormNutri={setIsOpenFormNutri}
                    isEdit={isOpenFormNutri}
                />
            )}
            <div className="grid grid-cols-10 grid-rows-1 w-full px-5">
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
                <div className="w-full h-full grid-rows-5 bg-white rounded-[30px] flex items-center justify-center p-5">
                    <span className="text-red-600 text-[25px] font-medium">
                        No item find
                    </span>
                </div>
            ) : (
                <div className="w-full h-full grid grid-cols-1 grid-rows-5 bg-white rounded-[30px] items-center justify-center p-[30px]">
                    {list?.map(
                        (
                            item: {
                                item_id: string;
                                title: string;
                                image: string;
                                price: string;
                                category: string;
                                description: string;
                                availability: boolean;
                            },
                            index: number
                        ) => {
                            return (
                                <div
                                    key={index}
                                    className={`grid grid-cols-10 grid-rows-1 w-full  h-full rounded-[5px] hover:bg-blue-100 px-2 ${
                                        index !== 4 ? `border-b-[1px]` : ""
                                    } border-gray-200`}
                                >
                                    <div className="flex justify-center items-center col-span-2">
                                        <p className="text-lg font-bold text-black opacity-50 py-2">
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center col-span-1">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-[75px] h-[75px] object-cover rounded-[10px] border border-gray-200"
                                        />
                                    </div>
                                    <div className="flex justify-start items-center col-span-1">
                                        <p className="text-sm text-gray-500">
                                            {FormatCurrency(Number(item.price))}
                                        </p>
                                    </div>

                                    <div className="flex justify-start items-center col-span-1">
                                        <p className="text-sm text-gray-500">
                                            {item.category}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center col-span-2">
                                        <p className="text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="flex justify-center items-center col-span-1">
                                        <select
                                            value={
                                                item.availability
                                                    ? "available"
                                                    : "out_of_service"
                                            }
                                            onChange={async (e) => {
                                                const newStatus =
                                                    e.target.value ===
                                                    "available";
                                                // Call API to update status here
                                                await updateStatusFoodAPI({
                                                    m_id: item.item_id,
                                                    availability: newStatus,
                                                });
                                                fetchData();
                                            }}
                                            className={`text-sm bg-white border border-gray-300 rounded-md p-2 ${
                                                item.availability
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }}`}
                                        >
                                            <option value="available">
                                                Available
                                            </option>
                                            <option value="out_of_service">
                                                Out of service
                                            </option>
                                        </select>
                                    </div>

                                    <div className="flex justify-center items-center gap-3 col-span-2">
                                        <div className="flex flex-row justify-between items-center text-[12px] gap-2">
                                            <button
                                                onClick={() =>
                                                    handleOpenFormIngre(
                                                        item.item_id
                                                    )
                                                }
                                                className="text-white text-[15px] bg-green-400 p-2 rounded-[30px] hover:bg-green-200 flex flex-row items-center"
                                            >
                                                <FiBox className="text-[20px]" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleOpenFormNutri(
                                                        item.item_id
                                                    )
                                                }
                                                className="text-yellow-100 text-[15px] bg-yellow-400 p-2 rounded-[30px] hover:bg-yellow-200 flex flex-row items-center"
                                            >
                                                <FiLink className="text-[20px]" />
                                            </button>

                                            <LiaEdit
                                                onClick={() =>
                                                    setIsEdit(
                                                        true,
                                                        item.item_id
                                                    )
                                                }
                                                className="text-[30px] text-blue-300 hover:text-blue-500"
                                            />
                                            <MdOutlineDelete
                                                onClick={() =>
                                                    handleDelete(item.item_id)
                                                }
                                                className=" text-[30px] text-red-300 hover:text-red-500"
                                            />
                                        </div>
                                        {/* <FaEye
                                                onClick={() =>
                                                    handleOpenForm(item.user_id)
                                                }
                                                className="text-[30px] text-yellow-500 hover:text-yellow-200"
                                            />

                                            <FaBan
                                                onClick={() =>
                                                    handleBanCustomer(
                                                        item.user_id,
                                                        item.status === "banned"
                                                            ? "active"
                                                            : "banned"
                                                    )
                                                }
                                                className="text-[30px] text-red-500 hover:text-red-200"
                                            /> */}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
};

export default ListItems;
