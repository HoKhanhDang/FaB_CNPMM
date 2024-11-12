import axios from "../../axios";

export const GetTotalData = async () => {
    return await axios({
        method: "GET",
        url: "/chart/total",
    })
}