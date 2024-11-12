import { getFoodNutritionAPI } from "./nutri.service";
import { INutrition } from "../../types/INutrition";

export const getFoodNutrition = async (params: any) => {
    try {
        const rs = await getFoodNutritionAPI(params.item_id);
        return rs?.data.data as INutrition;
    } catch (error) {
        console.log(error);
    }
};
