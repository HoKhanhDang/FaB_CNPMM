import axios from "../../axios";

export const getShiftsAPI = async () => {
    return await axios({
        method: "GET",
        url: "/shift",
    });
};

export const addShiftAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/shift",
        data,
    });
};
export const deleteShiftAPI = async (id: any) => {
    return await axios({
        method: "DELETE",
        url: `/shift/${id}`,
    });
};
