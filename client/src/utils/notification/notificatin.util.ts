import { getAllNotificationsByUserIdService } from "./notification.service";

export const getAllNotificationsByUserId = async (
    user_id: string
): Promise<[]> => {
    const rs = await getAllNotificationsByUserIdService(user_id);
    return rs.data.data;
};
