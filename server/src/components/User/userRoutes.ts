import { Router } from "express";

import CustomerController from "./Client/clientController";
import StaffControllder from "./Admin/adminController";

import verifyToken from "../../middlewares/verify-token";
import uploadCloud from "../../config/cloudinary.config";
const router = Router();

//customer api
router.get("/client", verifyToken, CustomerController.GetCustomersByParams);
router.get("/client/:user_id", CustomerController.GetUserById);
//////////////

//staff api
router.get("/admin", verifyToken, StaffControllder.GetStaffsByParams);
router.get("/admin/all", verifyToken, StaffControllder.GetAllStaff);
router.get("/admin/:user_id", verifyToken, StaffControllder.GetUserById);
router.put("/admin/:user_id", verifyToken, StaffControllder.UpdateUser);
router.put("/admin/permission/:user_id", verifyToken, StaffControllder.UpdatePermission);
/////////////

router.delete("/admin/:user_id", verifyToken, StaffControllder.DeleteStaff);
router.post(
    "/image",
    verifyToken,
    uploadCloud.single("image"),
    StaffControllder.UploadImage
);
router.put("/status/:user_id", verifyToken, CustomerController.updateStatus);

export default router;
