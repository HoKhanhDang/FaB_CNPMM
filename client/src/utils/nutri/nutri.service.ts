import axios from "../../axios";

export const getFoodNutritionAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/nutrition/${id}`,
    });
};
