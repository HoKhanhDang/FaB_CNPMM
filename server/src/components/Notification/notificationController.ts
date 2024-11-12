import { Request, Response } from "express";
import { 
    GetNotificationService, 
    AddNotificationService, 
    changeIsReadService, 
    GetNotificationByIdService 
} from "./notification.service";

// Lấy tất cả thông báo
const GetAllNotification = async (req: Request, res: Response) => {
    try {
        const result = await GetNotificationService();
        return res.status(200).json({ message: "Notifications fetched successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// Thêm thông báo mới
const AddNotification = async (req: Request, res: Response) => {
    const { title, content, type, link } = req.body; // Sử dụng req.body cho dữ liệu
    if (!title || !content || !type || !link) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const result = await AddNotificationService({ title, content, type, link });
        return res.status(201).json({ message: "Notification added successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// Thay đổi trạng thái đã đọc của thông báo
const ChangeIsRead = async (req: Request, res: Response) => {
    const { nof_id } = req.params; // Lấy ID từ URL
    if (!nof_id) {
        return res.status(400).json({ message: "Notification id is required" });
    }
    try {
        const result = await changeIsReadService({ nof_id });
        return res.status(200).json({ message: "Notification updated successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export { 
    GetAllNotification, 
    AddNotification, 
    ChangeIsRead 
};