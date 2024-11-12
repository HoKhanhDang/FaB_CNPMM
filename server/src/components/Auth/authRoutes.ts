const express = require("express");
const router = express.Router();

import AuthCustomer from "./Client/authController";
import AuthAdmin from "./Admin/authController";

//customer routes
router.post("/client/login", AuthCustomer.loginController);
router.post("/request-otp", AuthCustomer.requestOtpController);
router.post("/verify-otp", AuthCustomer.verifyOtpController);
router.post("/client/register", AuthCustomer.registerController);

//admin routes
router.post("/admin/login", AuthAdmin.Login);
router.post("/admin/register", AuthAdmin.Register);
router.put("/changePassword", AuthAdmin.changePassword);
export default router;
