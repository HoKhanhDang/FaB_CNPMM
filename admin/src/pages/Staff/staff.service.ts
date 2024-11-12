import axios from "../../axios";

export const getStaffByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: `/user/admin`,
        params: data,
    });
};

export const getStaffByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: `/user/admin/${id}`,
    });
};

export const getAllStaffAPI = async () => {
    return await axios({
        method: "GET",
        url: "/user/admin/all",
    });
};

export const deleteStaffAPI = async (id: any) => {
    return await axios({
        method: "DELETE",
        url: `/user/admin/${id}`,
    });
};

export const updateStaffAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/admin/${data.user_id}`,
        data,
    });
};

export const updatePermissionAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/admin/permission/${data.user_id}`,
        data,
    });
};
