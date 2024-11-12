import { useState } from "react";
import OrderCard from "./OrderCard";
import DetailOrder from "./DetailOrder";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrdersByParams } from "../../../utils/Order/order.utils";
interface MainPanelProps {}

const MainPanel: React.FC<MainPanelProps> = ({}) => {
    const queryClient = useQueryClient();
    
    const fetchAllOrder = async () => {
        const orderList = getOrdersByParams({
            page: 1,
            limit: 10000,
            status: "Processing",
        });
        return orderList;
    };
    const { data, isLoading } = useQuery({
        queryKey: ["fetchOrders"],
        queryFn: fetchAllOrder,
    });
    const refreshData = () => {
        queryClient.invalidateQueries({ queryKey: ["fetchOrders"] });
    };

    return (
        <div className="w-full h-full rounded-[20px] bg-sidebar grid grid-cols-5 grid-rows-2 gap-5 p-5">
            {data?.length ? (
                data?.map((order: any) => {
                    return (
                        <OrderCard
                            fetchAllOrder={refreshData}
                            message={order.message}
                            orderId={order.order_id}
                            delivery_time={order.delivery_time}
                        />
                    );
                })
            ) : (
                <div className="w-full h-full flex justify-center items-center text-red-500 col-span-5 row-span-2 text-[30px]">There are no recipe...</div>
            )}
        </div>
    );
};

export default MainPanel;
