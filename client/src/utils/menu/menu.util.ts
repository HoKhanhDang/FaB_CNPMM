import {
    getFoodDetailAPI,
    getMenuAPI,
    getSpecialMenuAPI,
} from "./menu.service";
import { IFoodItem } from "../../types/IFood";
export const getMenu = async (params: any) => {
    try {
        const rs = await getMenuAPI(params);
        return rs?.data.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSpecialMenu = async () => {
    try {
        const rs = await getSpecialMenuAPI();
        return rs?.data.data as IFoodItem[];
    } catch (error) {
        console.log(error);
    }
};

export const getFoodDetail = async (id: string) => {
    try {
        const rs = await getFoodDetailAPI(id);
        return rs?.data.data;
    } catch (error) {
        console.log(error);
    }
};
