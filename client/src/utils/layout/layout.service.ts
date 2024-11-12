import axios from "../../axios";
const apiGetLayout = async (page: string) => {
    return await axios({
        method: "GET",
        url: `/grid`,
        params: { page: page },
    });
};

export default {
    apiGetLayout,
}