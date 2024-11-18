import { Router } from "express";
import {
    AddMenu,
    DeleteMenu,
    UpdateMenu,
    GetMenuById,
    GetAllMenu,
    GetMenuByParams,
    GetSpecialMenu,
    UpdateStatusMenu
} from "./menuController";
import uploadCloud from "../../config/cloudinary.config";
import StaffController from "../User/Admin/adminController";

const router = Router();

router.post("/", AddMenu);
router.put("/:m_id", UpdateMenu);
router.put("/status/:m_id", UpdateStatusMenu);
router.delete("/:m_id", DeleteMenu);

// router.get("/all", GetAllMenu);
router.get("/special-menu", GetSpecialMenu);
router.get("/", GetMenuByParams);
router.get("/:menu_id", GetMenuById);


router.post("/image", uploadCloud.single("image"), StaffController.UploadImage);
export default router;
