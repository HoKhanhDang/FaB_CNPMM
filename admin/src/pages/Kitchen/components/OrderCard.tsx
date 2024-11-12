import { useState } from "react";
import DetailOrder from "./DetailOrder";
import {
    GetDateOnDate,
    GetTimeOnDate,
} from "../../../helper/GetTimeOnDate.helper";
import { changeStatusOrderAPI } from "../../Order/order.service";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { addNotification } from "../../../redux/slice/notification.slice";
import { sendNotificationAction } from "../../../redux/api/notification";

interface OrderCardProps {
    orderId: string;
    userId?: string;
    delivery_time?: string;
    message?: string;
    fetchAllOrder: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
    orderId,
    userId,
    delivery_time,
    message,
    fetchAllOrder,
}) => {
    const dispatch: any = useDispatch();

    const [isOpenDetail, setIsOpenDetail] = useState(false);

    const handleChangeStatus = async (orderId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, done it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeStatusOrderAPI({
                    order_id: orderId,
                    status: "Packed",
                    delivery_time: delivery_time,
                });
                fetchAllOrder();

                dispatch(
                    sendNotificationAction({
                        title: "Order Packed" as string,
                        content: `Order ${orderId} has been packed` as string,           
                        link: `/order/${orderId}` as string,
                        type: "done" as string,           
                    })
                );

                if (rs.status === 200) {
                    toast.success("Change status successfully!");
                } else {
                    toast.error("Change status failed!");
                }
            }
        });
    };
    return (
        <>
            {isOpenDetail && (
                <DetailOrder
                    item={{
                        order_id: orderId,
                        message: message as string,
                    }}
                    setIsOpenDetail={setIsOpenDetail}
                />
            )}
            <div className="w-full h-full bg-recipe col-span-1 row-span-1 p-2 rounded-md transition transform hover:scale-105 ">
                <div className="w-full h-[20%] bg-recipe-bg p-2 flex flex-row justify-between items-center">
                    <span className="text-white font-bold text-[18px]">
                        Order {`${orderId.slice(0, 5)}...`}
                    </span>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white font-bold text-[12px]">
                            {GetTimeOnDate(delivery_time as string)}
                        </span>
                        <span className="text-white font-bold text-[12px]">
                            {GetDateOnDate(delivery_time as string)}
                        </span>
                    </div>
                </div>
                <div className="w-full h-[80%] flex flex-col justify-center items-center gap-5 p-[20px]">
                    <div
                        onClick={() => {
                            setIsOpenDetail(true);
                        }}
                        className="w-full h-1/2 bg-blue-50 flex flex-row items-center justify-center rounded-md hover:bg-blue-400 "
                    >
                        View Detail
                    </div>
                    <div
                        onClick={() => {
                            handleChangeStatus(orderId);
                        }}
                        className="w-full h-1/2 bg-green-200 flex flex-row items-center justify-center rounded-md hover:bg-green-400 "
                    >
                        Done
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderCard;
