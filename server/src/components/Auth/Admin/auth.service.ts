import bcrypt from "bcrypt";
import User from "../../User/user.model";
import { IUser } from "../../User/user.model";
import { ObjectId } from "mongodb";
import {
    generateToken,
    generateRefreshToken,
} from "../../../middlewares/jwt";

const loginUser = async (
    email: string,
    password: string
): Promise<{
    user: IUser;
    token: string;
    refreshToken: string;
    role: string;
}> => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw { status: 400, message: "Email does not exist" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw { status: 401, message: "Password is incorrect" };
        }

        if (user.role === "user" || user.status !== "active") {
            throw { status: 402, message: "You are not allowed to login" };
        }

        const token = generateToken(user.user_id.toString(), user.role, user.status);
        const refreshToken = generateRefreshToken(user.user_id.toString());

        // Cập nhật refreshToken trong cơ sở dữ liệu
        user.refreshToken = refreshToken;
        await user.save();

        return { user, token, refreshToken, role: user.role };
    } catch (error) {
        throw error;
    }
};

const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    username: string;
    role: string;
    permission?: any;
}): Promise<{ message: string; data: IUser }> => {
    const { name, email, password, phone, role, username, permission } = data;

    try {
        // Kiểm tra email đã tồn tại chưa
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            throw { status: 400, message: "Email already exists" };
        }

        // Kiểm tra số điện thoại đã tồn tại chưa
        const phoneExists = await User.findOne({ phone });
        if (phoneExists) {
            throw { status: 401, message: "Phone Number already exists" };
        }


        const newUser = new User({
            user_id: new ObjectId,
            fullName: name,
            email,
            password,
            phone,
            username,
            role,
            permissions: permission || {},
            status: "active", // hoặc trạng thái mặc định
        });

        await newUser.save();

        return { message: "Register successfully", data: newUser };
    } catch (error) {
        throw error;
    }
};

const changePasswordService = async (data: {
    email: string;
    oldPassword: string;
    newPassword: string;
}): Promise<{ message: string; data: any }> => {
    const { email, oldPassword, newPassword } = data;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw { status: 400, message: "User not found" };
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw { status: 401, message: "Old password is incorrect" };
        }

        user.password = newPassword;
        await user.save();

        return { message: "Change password successfully", data: user };
    } catch (error) {
        throw error;
    }
};

export default {
    loginUser,
    registerUser,
    changePasswordService,
}
