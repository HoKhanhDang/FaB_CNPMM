import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { totp } from "otplib";
import User from "../../User/user.model";
import { ObjectId } from "mongodb";
import {
    ILoginResponse,
    IOtpResponse,
    IRegisterResponse,
} from "../../../types/customer.interface";

const secret_key = "secret_key"; // JWT secret key
const otpSecretKey = "ahihi"; // OTP secret key
const otpExpireSeconds = 300; // OTP expiration time

totp.options = { digits: 6, step: otpExpireSeconds };

const login = async (
    email: string,
    password: string
): Promise<ILoginResponse> => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw { status: 400, message: "Email không tồn tại" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw { status: 401, message: "Mật khẩu không đúng" };
        }

        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            secret_key,
            { expiresIn: "1h" }
        );

        return {
            message: "Đăng nhập thành công",
            token,
            user: {
                id: user.user_id.toString(),
                email: user.email,
                fullName: user.fullName || "",
                image: user.image || "",
            },
        };
    } catch (error) {
        throw error;
    }
};

const sendOtp = async (email: string): Promise<IOtpResponse> => {
    const otp = totp.generate(otpSecretKey);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "duonglatoi111@gmail.com",
            pass: "fqab gidq ebji illn", // Lưu ý: Không nên để mật khẩu thật trong code
        },
        secure: false,
    });

    // Gửi mã OTP qua email
    const mailOptions = {
        from: '"FastFood DAQ Restaurant" <no-reply@fastfooddaq.com>',
        to: email,
        subject: "Mã xác thực (OTP) của bạn",
        text: `Xin chào,
    
    Cảm ơn bạn đã sử dụng dịch vụ của FastFood DAQ Restaurant.
    
    Mã OTP của bạn là: ${otp}
    
    Mã này sẽ hết hạn sau ${otpExpireSeconds / 60} phút.
    
    Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
    
    Trân trọng,
    FastFood DAQ Restaurant`,

        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Xin chào,</h2>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của <strong>FastFood DAQ Restaurant</strong>.</p>
            <p>Mã OTP của bạn là:</p>
            <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">
                ${otp}
            </div>
            <p>Mã này sẽ hết hạn sau ${otpExpireSeconds / 60} phút.</p>
            <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
            <p>Trân trọng,<br/>
            FastFood DAQ Restaurant</p>
        </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, otp };
    } catch (error) {
        return { success: false, error };
    }
};

const checkEmailExist = async (email: string): Promise<boolean> => {
    const user = await User.findOne({ email });
    return user ? true : false;
};
const checkPhoneExist = async (phone: string): Promise<boolean> => {
    const user = await User.findOne({ phone });
    return user ? true : false;
};

const register = async (
    name: string,
    email: string,
    password: string,
    phone: string
): Promise<IRegisterResponse> => {
    try {
        const emailExists = await checkEmailExist(email);
        if (emailExists) {
            throw { status: 409, message: "Email đã tồn tại" };
        }
        const phoneExists = await checkPhoneExist(phone);
        if (phoneExists) {
            throw { status: 409, message: "Số điện thoại đã tồn tại" };
        }

        const newUser = new User({
            user_id: new ObjectId(),
            fullName: name,
            email,
            phone,
            password,
            status: "active",
            create_at: new Date(),
        });

        await newUser.save();

        return { message: "Đăng ký thành công", result: newUser };
    } catch (error) {
        throw error;
    }
};

const verifyOtp = (otp: string): boolean => {
    const isValid = totp.check(otp, otpSecretKey);
    return isValid;
};

export default { login, sendOtp, register, verifyOtp };
