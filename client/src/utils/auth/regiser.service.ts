import axios from "../../axios";

export const apiRegister = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/auth/client/register",
        data,
    });
};
export const sendEmail = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/auth/request-otp",
        data,
    });
};
export const verifyEmail = async (data: any) => {
    try {
        return await axios({
            method: "POST",
            url: "/auth/verify-otp",
            data,
        });
    } catch (error) {
        console.log(error);
    }
   
};
