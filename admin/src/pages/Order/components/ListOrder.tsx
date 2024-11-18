import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
//icons
import { LiaArrowRightSolid, LiaTimesCircle } from "react-icons/lia";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineDeliveryDining } from "react-icons/md";

import {
    getOrdersByParams,
    getHistoryOrders,
} from "../../../utils/Order/order.utils";
import { IOrder } from "../../../types/order.interface";
import OrderDetail from "./OrderDetail";

import FormatDay from "../../../helper/FormatDay.helper";
import FormatCurrency from "../../../helper/FormatCurrency.helper";

import {
    statusMap1,
    statusMap2,
    title,
} from "../../../constant/order.constant";
import TextColumn from "./TextColumn";
import { cancelOrderAPI, changeStatusOrderAPI } from "../order.service";
import { GetTime } from "../../../helper/GetTimeOnDate.helper";
import Driver from "./ListDriver";
import SocketSingleton from "../../../socket";
import { sendNotificationToUser } from "../../../utils/Notification/notification.utils";
import sendNotification from "../../../socket/sendNotification";

interface ListOrdersProps {
    isRender: boolean;
    history?: number;
}
const ListOrders: React.FC<ListOrdersProps> = ({ isRender, history }) => {
    const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [isOpenShowSelectDriver, setIsOpenShowSelectDriver] = useState(false);

    const [list, setList] = useState<IOrder[]>([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const socket = SocketSingleton.getInstance();

    const nextStage = async (status: string) => {
        if (status === "Pending") {
            return "Processing";
        }
        if (status === "Processing") {
            return "Packed";
        }
        if (status === "Packed") {
            return "Delivering";
        }
    };

    const handleChangeStatus = async (
        status: string,
        shipper_id?: string,
        order_id?: string
    ) => {
        Swal.fire({
            title: "Are you sure?",
            text: shipper_id
                ? "Confirm to choose this driver?"
                : "Do you want to confirm this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const stage = await nextStage(status);

                    const rs = await changeStatusOrderAPI({
                        user_id: shipper_id,
                        order_id: order_id || selectedOrder,
                        status: stage,
                    });
                    if (rs?.status === 200) {
                        socket.emit("orderArrive", shipper_id);
                        toast.success("Change status success");

                        const user_id = sessionStorage.getItem("user_id");
                        //send notification
                        await sendNotificationToUser({
                            title: "Order is delivering",
                            content: `Order #${selectedOrder} has been delivering`,
                            type: "done",
                            link: "/order",
                            user_id: user_id || "",
                        });
                        sendNotification();

                        setIsOpenShowSelectDriver(false);
                        fetchData();
                    }
                } catch (error) {
                    toast.error("Change status failed");
                }
            }
        });
    };

    const handleCancelOrder = async (id: string) => {
        const { value: text } = await Swal.fire({
            title: "Cancel order",
            text: "Do you want to cancel this order?",
            input: "textarea",
            inputLabel: "Please input your message",
            inputPlaceholder: "Type your message here...",
            inputAttributes: {
                "aria-label": "Type your message here",
            },
            showCancelButton: true,
        });
        if (text) {
            try {
                const rs = await cancelOrderAPI({
                    order_id: id,
                    message: text,
                });
                if (rs?.status === 200) {
                    toast.success("Cancel order success");
                    fetchData();
                }
            } catch (error) {
                toast.error("Cancel order failed");
            }
        }
    };
    const fetchData = async () => {
        if (history === 1) {
            getOrdersByParams({
                create_at: params.get("date"),
                status: params.get("status"),
                search: params.get("title"),
                page: params.get("page") || 1,
                limit: 10,
                history: 1,
            }).then((data) => {
                setList(data);
            });
        } else {
            setTimeout(() => {
                getOrdersByParams({
                    create_at: params.get("date"),
                    status: params.get("status"),
                    search: params.get("title"),
                    page: params.get("page") || 1,
                    limit: 10,
                }).then((data) => {
                    console.log("fetchData", data);
                    setList(data);
                });
            }, 100);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params, isRender, isOpenFormDetail]);

    useEffect(() => {
        if (list?.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list]);

    useEffect(() => {
        socket.connect();
        socket.on("orderDelivered", () => {
            fetchData();
        });

        socket.on("orderCommingNotification", () => {
            console.log("orderCommingNotification");
            fetchData();
        });
        return () => {
            socket.off("orderDelivered");
            socket.off("orderCommingNotification");
        };
    }, []);
    return (
        <div className="w-full h-[80%] flex flex-col justify-center items-center px-5">
            {isOpenFormDetail && (
                <OrderDetail
                    status={selectedStatus}
                    orderID={selectedOrder}
                    userID={sessionStorage.getItem("user_id") || ""}
                    setIsShowDetail={setIsOpenFormDetail}
                />
            )}
            {isOpenShowSelectDriver && (
                <Driver
                    setIsOpenShowSelectDriver={setIsOpenShowSelectDriver}
                    handleSelectDriver={handleChangeStatus}
                />
            )}

            <div className="grid grid-cols-12 grid-rows-1 w-full px-[30px]">
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
            {list.length === 0 ? (
                <div className="w-full h-full grid-rows-10 bg-white rounded-[30px] flex items-center justify-center p-5">
                    <span className="text-red-600 text-[25px] font-medium">
                        No item find
                    </span>
                </div>
            ) : (
                <div className="w-full h-full grid grid-cols-1 grid-rows-10  bg-white rounded-[30px] items-center justify-center p-[30px] ">
                    {list.map((item: IOrder, index: number) => {
                        return (
                            <div
                                onClick={() => {
                                    setSelectedStatus(item.status);
                                    setSelectedOrder(item.order_id);

                                    sessionStorage.setItem(
                                        "user_id",
                                        item.user_id || ""
                                    );
                                    setIsOpenFormDetail(true);
                                }}
                                key={index}
                                className={` grid grid-cols-12 grid-rows-1 w-full h-full rounded-[5px] hover:bg-blue-100 ${
                                    index !== 4 ? `border-b-[1px]` : ""
                                } border-gray-200`}
                            >
                                <TextColumn
                                    text={`${item.order_id.slice(0, 8)}...`}
                                    classNameValue={
                                        "justify-center items-center col-span-1 truncate"
                                    }
                                />

                                <TextColumn
                                    text={`${item.order_id.slice(0, 8)}...`}
                                    classNameValue={
                                        "justify-start items-center col-span-1"
                                    }
                                />
                                <TextColumn
                                    text={FormatCurrency(item.total_price)}
                                    classNameValue={
                                        "justify-start items-center col-span-1"
                                    }
                                />
                                <TextColumn
                                    text={item.message as string}
                                    classNameValue={
                                        "justify-start items-center col-span-3"
                                    }
                                />

                                <div className="flex flex-row gap-2 w-full justify-start items-center col-span-1">
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

                                <TextColumn
                                    text={
                                        item.delivery_time
                                            ? (GetTime(
                                                  item.delivery_time || ""
                                              ) as string)
                                            : `${FormatDay(item.create_at)}`
                                    }
                                    classNameValue={
                                        "justify-center items-center col-span-2"
                                    }
                                />
                                <TextColumn
                                    text={FormatDay(item.create_at)}
                                    classNameValue={
                                        "justify-center items-center col-span-2"
                                    }
                                />

                                <div className="flex justify-center items-center p-2 col-span-1">
                                    {item.status === "Pending" && (
                                        <div
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedOrder(item.order_id);
                                                sessionStorage.setItem(
                                                    "user_id",
                                                    item.user_id || ""
                                                );
                                                handleChangeStatus(
                                                    item.status,
                                                    undefined,
                                                    item.order_id
                                                );
                                            }}
                                            className="w-full h-full flex flex-row items-center justify-center gap-2 animate-bounce-slow"
                                        >
                                            <Tooltip
                                                title="Confirm move to next stage"
                                                arrow
                                            >
                                                <span>
                                                    <LiaArrowRightSolid className="text-[30px] text-processing hover:text-orange-800" />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    )}
                                    {item.status === "Packed" && (
                                        <div
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedOrder(item.order_id);
                                                sessionStorage.setItem(
                                                    "user_id",
                                                    item.user_id || ""
                                                );
                                                setIsOpenShowSelectDriver(true);
                                            }}
                                            className="w-full h-full flex flex-row items-center justify-center gap-2 animate-bounce-slow"
                                        >
                                            <Tooltip
                                                title="Confirm move to next stage"
                                                arrow
                                            >
                                                <span>
                                                    <MdOutlineDeliveryDining className="text-[30px] text-processing hover:text-orange-800 " />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    )}
                                    {item.status !== "Cancelled" &&
                                        item.status !== "Delivered" &&
                                        item.status !== "Successfully" && (
                                            <div
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    handleCancelOrder(
                                                        item.order_id
                                                    );
                                                }}
                                                className="w-full h-full flex flex-row items-center justify-center gap-2    "
                                            >
                                                <Tooltip
                                                    title="Cancel order"
                                                    arrow
                                                >
                                                    <span>
                                                        <LiaTimesCircle className="text-[30px] text-cancelled hover:text-red-300" />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ListOrders;
