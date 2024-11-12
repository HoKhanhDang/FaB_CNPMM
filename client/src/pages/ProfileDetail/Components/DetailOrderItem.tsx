import { useEffect, useState } from "react";
import StepperComponents from "../../../components/stepper/Stepper";
import { GetShipper } from "../../../utils/order/order.util";
import Swal from "sweetalert2";
import {
    cancelOrderAPI,
    changeStatusOrderAPI,
} from "../../../utils/order/order.service";
import { toast } from "react-toastify";
import SocketSingleton from "../../../socket";

interface DetailOrderItemProps {
    setIsOpenDetail: (isOpen: boolean) => void;
    status?: string;
    shipper_id?: string;
    order_id?: string;
}
const DetailOrderItem: React.FC<DetailOrderItemProps> = ({
    setIsOpenDetail,
    status,
    shipper_id,
    order_id,
}) => {
    interface Shipper {
        image: string;
        fullName: string;
        phone: string;
    }

    const [shipper, setShipper] = useState<Shipper | null>(null);
    const socket = SocketSingleton.getInstance();

    const handleCancelOrder = async () => {
        const { value: text } = await Swal.fire({
            title: "Cancel order",
            text: "Do you want to cancel this order?",
            input: "textarea",
            inputLabel: "Please input your message",
            inputPlaceholder: "Type your message here...",
            inputAttributes: {
                "aria-label": "Type your message here",
            },
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            showCancelButton: true,
        });
        if (text) {
            try {
                const rs = await cancelOrderAPI({
                    order_id: order_id,
                    message: text,
                });
                if (rs?.status === 200) {
                    toast.success("Cancel order success");
                    setIsOpenDetail(false);
                    socket.connect();
                    socket.emit("orderCancel", order_id);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch (error) {
                toast.error("Cancel order failed");
            }
        }
    };

    const handleConfirmOrder = async () => {
        try {
            Swal.fire({
                title: "Confirm order",
                text: "Do you get the order yet?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const rs = await changeStatusOrderAPI({
                        order_id: order_id,
                        status: "Successfully",
                        delivery_time: new Date().toLocaleTimeString(),
                    });
                    if (rs?.status === 200) {
                        toast.success("Confirm order success");
                        setIsOpenDetail(false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        toast.error("Confirm order failed");
                    }
                }
            });
        } catch (error) {
            toast.error("Confirm order failed");
        }
    };

    const fetchData = async () => {
        const rs = await GetShipper(shipper_id as string);
        setShipper(rs);
    };
    useEffect(() => {
        if (shipper_id) {
            fetchData();
        }
    }, []);
    return (
        <div
            onClick={() => setIsOpenDetail(false)}
            className="fixed inset-0 z-50 w-screen h-screen bg-gray-400 bg-opacity-70 flex justify-center items-center max-sm:px-4"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="max-sm:w-full sm:w-2/3 sm:h-auto flex flex-col items-start justify-start bg-white z-50 p-5 rounded-[10px] gap-5"
            >
                <StepperComponents status={status} />
                <div className="flex flex-row justify-evenly items-center w-full rounded-[10px] border p-2">
                    {status === "Pending" || status === "Processing" || status === "Packed" ? (
                        <h2 className="font-semibold text-slate-700 text-center w-full">
                            Your order is not delivering yet
                        </h2>
                    ) : (
                        <>
                            <img
                                src={shipper?.image}
                                className="w-[50px] h-[50px]"
                                alt=""
                            />
                            <h2 className="font-semibold text-slate-700">
                                Shipper: {shipper?.fullName}
                            </h2>
                            <h2 className="font-semibold text-slate-700">
                                Phone: {shipper?.phone}
                            </h2>
                        </>
                    )}
                </div>
                <div className="flex flex-row justify-center items-center w-full h-1/3 px-5 gap-5 text-white">
                    {(status === "Pending" || status === "Processing") && (
                        <div
                            onClick={() => {
                                handleCancelOrder();
                            }}
                            className="w-1/2 h-auto flex justify-center items-center bg-red-500 p-5 transform_z rounded-sm cursor-pointer"
                        >
                            Cancel Orders
                        </div>
                    )}
                    {status === "Delivered" && (
                        <div
                            onClick={handleConfirmOrder}
                            className="w-1/2 h-auto flex justify-center items-center bg-blue-500 p-5 transform_z rounded-sm cursor-pointer"
                        >
                            Confirm your order are delivered{" "}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DetailOrderItem;
