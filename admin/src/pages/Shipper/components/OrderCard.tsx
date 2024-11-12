import { useState } from "react";
import DetailShipping from "./DetailShipping";
import Swal from "sweetalert2";
import { changeStatusOrderAPI } from "../../Order/order.service";
import SocketSingleton from "../../../socket";

interface OrderCardProps {
    order_id: string;
    time: string;
    fetchOrders: () => void;
}
const OrderCard: React.FC<OrderCardProps> = ({
    order_id,
    time,
    fetchOrders,
}) => {
    const socket = SocketSingleton.getInstance();
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    let check = false;
    const handleComplete = async (stage: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Confirm that you want complete this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, complete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeStatusOrderAPI({
                    status: stage,
                    order_id,
                });
         
                if (rs?.status === 200) {
                    Swal.fire(
                        "Completed!",
                        "Thank for your service <3",
                        "success"
                    );
                    fetchOrders();
                    setIsOpenDetail(false);
                    socket.emit("orderDelivered", order_id);
                    check = true;
                }
            }
        });

        return check;
    };
    return (
        <>
            {isOpenDetail && (
                <DetailShipping
                    handleComplete={handleComplete}
                    order_id={order_id}
                    setIsOpenDetail={setIsOpenDetail}
                />
            )}
            <div
                onClick={() => setIsOpenDetail(true)}
                className="text-[20px] px-5 flex flex-row justify-around rounded-[30px] items-center w-full min-h-[150px] h-[150px] bg-blue-200 text-black"
            >
                <span>#{order_id}</span>
                <span className="text-[15px] font-light">{time}</span>
            </div>
        </>
    );
};
export default OrderCard;
