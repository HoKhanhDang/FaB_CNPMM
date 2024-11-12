import { apiGetRatingByItemID,apiGetRatingByOrderID, apiPostRating } from "./rating.service";

export const GetRatingByItemID = async (order_id: string) => {
    const response = await apiGetRatingByItemID(order_id);
    return response.data.data;
}
export const GetRatingByOrderID = async (order_id: string) => {
    const response = await apiGetRatingByOrderID(order_id);
    return response.data.data;
}

export const PostRating = async (data: any) => {
    const response = await apiPostRating(data);
    return response;
}