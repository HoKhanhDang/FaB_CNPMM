import { Schema } from "mongoose";

interface IUser {
    user_id: Schema.Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    image: string;  
}

interface ILoginResponse {
    message: string;
    token?: string;
    status?: number;
    user?: {
        id: string;
        email: string;
        fullName: string;
        image: string
    };
}

interface IOtpResponse {
    success: boolean;
    otp?: string;
    error?: any;
}

interface IRegisterResponse {
    message: string;
    result?: any;
    status?: number;
    
}

export { IUser, ILoginResponse, IOtpResponse, IRegisterResponse };