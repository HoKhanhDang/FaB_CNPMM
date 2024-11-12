import axios from "../../axios";

export const apiLogin = async (data: any) => {
    try {
        const response = await axios({
            method: "POST",
            url: "/auth/client/login",
            data
        });
        return response;
    } catch (error) {
        throw error; // Re-throw the error to be handled by the calling function
    }
};