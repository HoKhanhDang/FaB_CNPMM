import { Router } from "express";
import { GetAllNotification, AddNotification,ChangeIsRead } from "./notificationController";

const router = Router();

router.get("/", GetAllNotification)
router.post("/", AddNotification)
router.put("/:nof_id", ChangeIsRead)

export default router;