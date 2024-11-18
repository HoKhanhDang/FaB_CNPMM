import { Router } from "express";
import {
    GetAllNotification,
    AddNotification,
    ChangeIsRead,
    GetNotificationsByUserID,
    DeleteAllNotificationByUserID
} from "./notificationController";

const router = Router();

router.get("/", GetAllNotification);
router.get("/:user_id", GetNotificationsByUserID);
router.post("/", AddNotification);
router.put("/:nof_id", ChangeIsRead);
router.delete("/:user_id", DeleteAllNotificationByUserID);

export default router;
