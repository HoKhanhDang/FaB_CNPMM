import axios from "../../axios";

export const apiGetRatingByItemID = async (item_id: string) => {
    return await axios({
        method: "GET",
        url: "/rating/item",
        params: { item_id }, //item_id
    });
};
export const apiGetRatingByOrderID = async (order_id: string) => {
    return await axios({
        method: "GET",
        url: "/rating/order",
        params: { order_id }, //order_id
    });
}

export const apiPostRating = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/rating",
        data, //order_id, user_id, rating, comment
    });
}