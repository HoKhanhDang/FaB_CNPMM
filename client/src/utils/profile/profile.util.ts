import { apiGetProfile } from "./profile.service";

export const GetProfileById = async (id: string) => {
    try {
        const rs = await apiGetProfile(id);
        return rs?.data.data;
    } catch (error) {
        throw error;
    }
};
