import axios from "../../axios";

export const getAllNotificationsByUserIdService = async (user_id: string) => {
    return await axios.get(`/notification/${user_id}`);
}

export const changeIsReadAPI = async (nof_id: string) => {
    return await axios.put(`/notification/${nof_id}`);
}

export const deleteAllNotificationByUserIDAPI = async (user_id: string) => {
    return await axios.delete(`/notification/${user_id}`);
}
