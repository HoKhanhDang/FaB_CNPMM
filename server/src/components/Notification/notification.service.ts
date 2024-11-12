import { Notification, INotification } from "./notification.model"; // Đảm bảo đường dẫn chính xác
import { ObjectId } from "mongodb";
// Lấy tất cả thông báo
const GetNotificationService = async (): Promise<INotification[]> => {
    try {
        return await Notification.find(); // Lấy tất cả thông báo
    } catch (error) {
        throw new Error(`Error fetching notifications: ${error}`);
    }
};

// Lấy thông báo theo ID
const GetNotificationByIdService = async (nof_id: string): Promise<INotification | null> => {
    try {
        return await Notification.findOne({ _id: nof_id }); // Tìm thông báo theo ID
    } catch (error) {
        throw new Error(`Error fetching notification by ID: ${error}`);
    }
};

// Thêm thông báo mới
const AddNotificationService = async (params: {
    title: string;
    content: string;
    type: 'new' | 'done' | 'repaired' | 'ingredient' | 'failed';
    link: string;
}): Promise<INotification> => {
    const { title, content, type, link } = params;

    const newNotification = new Notification({
        nof_id: new ObjectId(),
        title,
        content,
        type,
        isRead: false,
        link,
        time: new Date(),
    });

    try {
        return await newNotification.save(); // Lưu thông báo mới
    } catch (error) {
        throw new Error(`Error adding notification: ${error}`);
    }
};

// Thay đổi trạng thái đã đọc của thông báo
const changeIsReadService = async (params: { nof_id: string }): Promise<INotification | null> => {
    const { nof_id } = params;

    try {
        const updatedNotification = await Notification.findOneAndUpdate(
            {nof_id},
            { isRead: true },
            { new: true }
        );

        if (!updatedNotification) {
            throw new Error("Notification not found");
        }

        return updatedNotification; // Trả về thông báo đã cập nhật
    } catch (error) {
        throw new Error(`Error updating notification: ${error}`);
    }
};

export { 
    GetNotificationService, 
    GetNotificationByIdService, 
    AddNotificationService, 
    changeIsReadService 
};