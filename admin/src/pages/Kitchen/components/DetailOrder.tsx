import { useQuery } from "@tanstack/react-query";
import FormatCurrency from "../../../helper/FormatCurrency.helper";
import { IOrderItem } from "../../../types/order.interface";
import { fetchOrderItems } from "../../../utils/Order/order.utils";

const DetailOrder = ({
    item: { order_id, message },
    setIsOpenDetail,
}: {
    item: {
        order_id: string;
        message: string;
    };
    setIsOpenDetail: (value: boolean) => void;
}) => {
    const fetchAllOrder = async () => {
        const rs = await fetchOrderItems(order_id);
        return rs;
    };
    const { data, isLoading } = useQuery({
        queryKey: ["fetchOrderItems"],
        queryFn: fetchAllOrder,
    });
    return (
        <div
            onClick={() => setIsOpenDetail(false)}
            className="fixed inset-0 z-50 w-screen h-screen p-[30px] flex justify-center items-center bg-main-bg bg-opacity-50"
        >
            <div
                onClick={(event) => {
                    event?.stopPropagation();
                }}
                className="w-[25%] h-[80%] bg-white rounded-md flex flex-col justify-start items-center p-[20px] gap-5"
            >
                <span className="text-[25px] font-bold pt-2">
                    Order {order_id.slice(0, 5)}...
                </span>
                <div className="w-full h-[30%] flex flex-col justify-start items-start gap-2 ">
                    <text
                        name="message"
                        id=""
                        className="w-full h-full bg-recipe text-black p-2"
                    >
                        <span className="font-bold">Note: </span>
                        {message}
                    </text>
                </div>
                <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-center gap-1 ">
                    {data?.map((item, index) => {
                        return (
                            <div className="flex flex-row w-full h-auto py-1 items-center justify-start gap-5 transition transform hover:scale-105 border-b">
                                <div className="w-[40%] flex justify-start items-start">
                                    <img
                                        className="w-[100px] h-[100px] rounded-md object-cover"
                                        src={item.image}
                                        alt=""
                                    />
                                </div>
                                <div className="w-[40%] max-w-[40%] h-auto text-[15px] font-medium">
                                    {item.title}
                                </div>
                                <span className="text-[15px]">
                                    <span className="text-[10px]">X</span>{" "}
                                    {item.quantity}
                                </span>
                            </div>

                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DetailOrder;
