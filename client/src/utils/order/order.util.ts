import {
    GetOrderItemsAPI,
    getShipperByIdAPI,
    GetOrderByUserIdAPI,
} from "../../utils/order/order.service";

export const GetOrder = async (id: string) => {
    const rs = await GetOrderByUserIdAPI(id);
    const data = await Promise.all(
        rs?.data.result.map(async (item: any) => {
            const orderItems = await GetOrderItemsAPI(item.order_id);
            return {
                ...item,
                orderItems: orderItems.data.result,
            };
        })
    );
    return data;
};

export const GetShipper = async (id: string) => {
    const rs = await getShipperByIdAPI(id);
    return rs.data.data;
};

export const GetItemsOrderByOrderID = async (id: string) => {
    const orderItems = await GetOrderItemsAPI(id);

    return orderItems.data.result;
};
