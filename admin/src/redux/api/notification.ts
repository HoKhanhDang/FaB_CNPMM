import { createAsyncThunk} from "@reduxjs/toolkit";
import {getAllNotificationsAPI} from "../../pages/Notification/notification.service"
import { sendNotification } from '../../utils/Notification/notification.utils';
import INotification from "../../types/notification.interface";

export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async () => {
        const response = await getAllNotificationsAPI();
   
        return response.data.data;
    }
)

export const sendNotificationAction = createAsyncThunk(
    "notifications/sendNotification",
    async (data: INotification) => {
      
        const response = await sendNotification(data);
    
        return response;
    }
)