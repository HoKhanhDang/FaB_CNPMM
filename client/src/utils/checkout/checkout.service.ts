import axios from "../../axios";
import SocketSingleton from "../../socket";

export const CreateOrder = async (data: any) => {
    const socket = SocketSingleton.getInstance();
    socket.connect();
    socket.emit("orderComming");
    return await axios({
        method: "POST",
        url: "/order",
        data,
    });
};
export const AddOrderItem = async (orderItem: any) => {
    return await axios({
        method: "POST",
        url: "/order/items",
        data: orderItem,
    });
};

export const CreateVNPayLink = async (body: any) => {
    return await axios({
        method: "POST",
        url: "/vnpay/create_payment_url",
        data: body,
    });
};
