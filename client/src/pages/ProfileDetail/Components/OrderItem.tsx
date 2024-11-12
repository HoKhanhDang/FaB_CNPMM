import { IOrderItem } from "../../../types/IOrderItem";
import { MdDoubleArrow } from "react-icons/md";
import FormatCurrency from "../../../utils/common/FormatCurrency";
import FormatDay from "../../../utils/common/FormatDay";
import { useState } from "react";
import DetailOrderItem from "./DetailOrderItem";
import { GetItemsOrderByOrderID } from "../../../utils/order/order.util";
import { addItem } from "../../../redux/slice/cart.slice";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RatingComponent from "./RatingOrder";
interface OrderItemProps {
    items: IOrderItem;
}
const OrderItem: React.FC<OrderItemProps> = ({ items }) => {
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenRating, setIsOpenRating] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleReorder = async (id: string) => {
        Swal.fire({
            title: "Reorder now?",
            confirmButtonColor: "#ff0000",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            cancelButtonColor: "#999999",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const orderInfor = await GetItemsOrderByOrderID(id );
                orderInfor?.map((item: any) => {
                    dispatch(
                        addItem({
                            id: item.item_id,
                            title: item.title,
                            price: Number(item.price),
                            quantity: 1,
                            total: Number(item.price),
                            image: item.image,
                        })
                    );
                });
                navigate("/cart");
            } else {
                return;
            }
        });
    };
    return (
        <>
            {isOpenDetail && (
                <DetailOrderItem
                    order_id={items.order_id}
                    shipper_id={items.shipper_id}
                    setIsOpenDetail={setIsOpenDetail}
                    status={items.status}
                />
            )}
             {isOpenRating && (
                <div className="fixed w-full inset-0 z-40 flex justify-center items-center bg-blue-100 bg-opacity-55">
                    <RatingComponent
                        setIsOpenRating={setIsOpenRating}
                        order_id={items.order_id}
                        orderItems={items.orderItems}
                    />
                </div>
            )}
            <div
                onClick={() => setIsOpenDetail(true)}
                className="w-full h-auto gap-5 flex flex-col max-sm:text-sm sm:text-lg items-center justify-normal p-5 rounded-[10px] border transform transition-transform duration-300 hover:scale-105"
            >
                <div className="w-full h-1/3 flex flex-row items-center justify-between">
                    <h2 className=" font-semibold text-slate-700">
                        Order ID: {items.order_id.slice(0, 8)}...
                    </h2>
                    <h2 className=" font-semibold text-slate-700">
                        {FormatDay(items.create_at)}
                    </h2>
                    <h2 className=" font-semibold text-slate-700 text-xl">
                        {items.status}
                    </h2>
                </div>
                <div className="w-full h-2/3 flex flex-col gap-5">
                    {items.orderItems.map((item, index) => (
                        <div
                            key={index}
                            className="w-full h-auto flex flex-row items-center justify-between"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-[100px] h-[100px] object-cover"
                            />
                            <h2 className=" font-semibold text-slate-700">
                                {item.title}
                            </h2>
                            <h2 className=" font-semibold text-slate-700">
                                Price: {FormatCurrency(Number(item.price))}
                            </h2>
                            <h2 className=" font-semibold text-slate-700">
                                X {item.quantity}
                            </h2>
                        </div>
                    ))}
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold text-slate-700">
                            <span className="text-red-400 font-semibold text-[20px]">
                                Total:
                            </span>{" "}
                            {FormatCurrency(items.total_price)}
                        </h2>
                        {items.status === "Successfully" && (
                            <>
                                <div
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setIsOpenRating(true);
                                    }}
                                    className="w-auto flex flex-row items-center justify-center gap-2 transform_z p-2 rounded-md cursor-pointer"
                                >
                                    <FaStar className="text-[20px] text-yellow-400" />
                                    Rate a star
                                </div>
                            </>
                        )}
                        {items.status === "Cancelled" ||
                        items.status === "Successfully" ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleReorder(items.order_id);
                                }}
                                className=" animate-shake flex flex-row items-center gap-2 text-red-500 hover:text-red-400 cursor-pointer "
                            >
                                Reorder now <MdDoubleArrow />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default OrderItem;
