import axios from "../../axios";

export const apiGetProfile = async (_id: string) => {
    return await axios({
        method: "GET",
        url: `/user/client/${_id}`,

    });
};


