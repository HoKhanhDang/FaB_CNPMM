import { Request, Response } from "express";

import AuthClientService from "./auth.service";

// Controller for login
const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    try {
        const result = await AuthClientService.login(
            email as string,
            password as string
        );
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error);
        res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || "Server error",
        });
    }
};

// Controller for OTP request
const requestOtpController = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ message: "Please provide an email address." });
    }

    try {
        const result = await AuthClientService.sendOtp(email as string);
        if (result.success) {
            return res.status(200).json({ message: "OTP sent successfully!" });
        } else {
            return res.status(500).json({ message: "Failed to send OTP." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
};

// Controller for OTP verification
const verifyOtpController = (req: Request, res: Response) => {
    const { otp, email } = req.body;

    if (!otp || !email) {
        return res
            .status(400)
            .json({ message: "Please provide both OTP and email." });
    }

    const isValid = AuthClientService.verifyOtp(otp as string);

    if (!isValid) {
        return res.status(400).json({
            status: 400,
            message: "Invalid OTP code. Please double-check and try again.",
        });
    }

    return res.status(200).json({ message: "OTP verified successfully!" });
};

// Controller for registration
const registerController = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    try {
        const result = await AuthClientService.register(
            name as string,
            email as string,
            password as string,
            phone as string
        );
        return res.status(200).json({
            message: "Đăng ký thành công",
            result,
        });
    } catch (error: any) {
        if (error.status === 409) {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
};

export default {
    loginController,
    requestOtpController,
    verifyOtpController,
    registerController,
};
