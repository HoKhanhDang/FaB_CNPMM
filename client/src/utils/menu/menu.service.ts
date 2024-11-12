import axios from "../../axios";

export const getMenuAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/menu-item",
        params,
    });
};

export const getSpecialMenuAPI = async () => {
    return await axios({
        method: "GET",
        url: "/menu-item/special-menu",
    });
};

export const getFoodDetailAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/menu-item/${id}`,
    });
};
