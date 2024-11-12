import axios from "../../axios";

export const loginAPI = async (email: String, password: String) => {
    return await axios({
        method: "POST",
        url: "/auth/admin/login",
        data: {
            email,
            password,
        },
    });
};

export const registerAPI = async (data: Object) => {
    return await axios({
        method: "POST",
        url: "/auth/admin/register",
        data,
    });
};
