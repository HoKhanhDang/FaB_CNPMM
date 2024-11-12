import axios from "axios";

const url = "http://localhost:3000";

const instance = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});

function setAuthorizationHeader(config: any) {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
instance.interceptors.request.use(setAuthorizationHeader, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            // Handle logout here
            localStorage.removeItem("access_token");
            localStorage.removeItem("cartItems");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;
