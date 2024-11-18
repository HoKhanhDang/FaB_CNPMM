import { Request, Response } from "express";
// Services
import AuthAdminService from "./auth.service";

const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ status: 400, message: "Missing required fields" });
    }

    try {
        const { user, token, refreshToken, role } =
            await AuthAdminService.loginUser(
                email as string,
                password as string
            );
        return res.status(200).json({
            status: 200,
            message: "Login successfully",
            data: {
                user,
                token,
                refreshToken,
                role: user.role,
            },
        });
    } catch (err: any) {
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message || "Server error",
        });
    }
};

const Register = async (req: Request, res: Response) => {
    let { email, password, name, phone, role, permissions } = req.body;

    if (!email || !password || !name || !phone || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const permissionConvert = JSON.stringify(permissions);

    try {
        const data = await AuthAdminService.registerUser({
            name: name as string,
            email: email as string,
            password: password as string,
            phone: phone as string,
            role: role as string,
            permission: permissionConvert,
        });
        return res.status(200).json({
            data: data,
        });
    } catch (err: any) {
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message || "Server error",
        });
    }
};

const changePassword = async (req: Request, res: Response) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const data = await AuthAdminService.changePasswordService({
            email: email as string,
            oldPassword: oldPassword as string,
            newPassword: newPassword as string,
        });
        return res.status(200).json({
            status: 200,
            data: data,
            message: "Change password successfully",
        });
    } catch (err: any) {
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message || "Server error",
        });
    }
};

export default { Login, Register, changePassword };
