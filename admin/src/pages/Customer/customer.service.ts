import axios from "../../axios";

export const getCustomerByIdAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/user/client/${id}`,
        params: {_id: id },
    });
};
export const getCustomerByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/user/client",
        params: data,
    });
};
export const changeStatusCustomerAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/status/${data._id}`,
        data,
    });
};
export const getOrderByCustomerIdAPI = async (data: any) => {
    return await axios.get(`http://localhost:5000/api/order/user/${data}`)
    // return await axios({
    //     method: "GET",
    //     url: `/user/${data}`,
    //     params: data,
    // });
};