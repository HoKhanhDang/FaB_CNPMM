import { getAllNotificationsAPI, sendNotificationAPI} from "../../pages/Notification/notification.service"

export const getAllNotifications = async () => {
    const rs = await getAllNotificationsAPI();
  
    return rs?.data?.data;
}

export const sendNotification = async (data: any) => {
  
    const rs = await sendNotificationAPI(data);
   
    return rs?.data;
}

