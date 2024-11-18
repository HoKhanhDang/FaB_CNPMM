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

const GetNotificationByUserIdService = async (
    user_id: string
): Promise<INotification[]> => {
    try {
        return await Notification.find({
            user_id: user_id,
            isDeleted: false,
        }).sort({ time: -1 }); // Lấy tất cả thông báo
    } catch (error) {
        throw new Error(`Error fetching notifications: ${error}`);
    }
};

// Thêm thông báo mới
const AddNotificationService = async (params: {
    title: string;
    content: string;
    type: "new" | "done" | "repaired" | "ingredient" | "failed";
    link: string;
    user_id?: string;
}): Promise<INotification> => {
    const { title, content, type, link } = params;

    const newNotification = new Notification({
        nof_id: new ObjectId(),
        title,
        content,
        type,
        isRead: false,
        link,
        user_id: params.user_id,
        time: new Date(),
    });

    try {
        return await newNotification.save(); // Lưu thông báo mới
    } catch (error) {
        throw new Error(`Error adding notification: ${error}`);
    }
};

// Thay đổi trạng thái đã đọc của thông báo
const changeIsReadService = async (params: {
    nof_id: string;
}): Promise<INotification | null> => {
    const { nof_id } = params;

    try {
        const updatedNotification = await Notification.findOneAndUpdate(
            { nof_id },
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

const DeleteAllNotificationByUserIDService = async (user_id: string) => {
    try {
        const notifications = await Notification.find({ user_id: user_id });
        if (!notifications) {
            throw new Error("Notification not found");
        }
        notifications.forEach(async (notification) => {
            await Notification.findOneAndUpdate(
                { nof_id: notification.nof_id },
                { isDeleted: true },
                { new: true }
            );
        });
    } catch (error) {
        throw new Error(`Error deleting notifications: ${error}`);
    }
};

export {
    GetNotificationService,
    AddNotificationService,
    changeIsReadService,
    GetNotificationByUserIdService,
    DeleteAllNotificationByUserIDService,
};
