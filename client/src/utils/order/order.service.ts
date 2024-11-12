import axios from "../../axios";
import SocketSingleton from "../../socket";
export const GetOrderByUserIdAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/order/user/${id}`,
    });
};
export const GetOrderByIdAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/order/${id}`,
    });
};

export const GetOrderItemsAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/order/items/${id}`,
    });
};

export const getShipperByIdAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/user/client/${id}`,
    });
};

export const changeStatusOrderAPI = async (params: any) => {
    const socket = SocketSingleton.getInstance();
    socket.connect();
    socket.emit("orderComming");
    return await axios({
        method: "PUT",
        url: `/order/status/${params.order_id}`,
        data: params, //order_id, status, user_id, delivery_time
    });
};

export const cancelOrderAPI = async (params: any) => {
    return await axios({
        method: "PUT",
        url: `/order/cancel/${params.order_id}`,
        data: params, // {order_id: 1, message}
    });
};
