import { createSlice } from "@reduxjs/toolkit";

export const CustomerSlice = createSlice({
    name: "customer",
    initialState: {
        fullName: "",
        token: "",
        isLogin: false,
        id: "",
        image: "",
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isLogin = true;
            state.id = action.payload.user.id;
            state.fullName = action.payload.user.fullName;
            state.image = action.payload.user.image;
        },
        logout: (state) => {
            state.id = "";
            state.token = "";
            state.isLogin = false;
            state.fullName = "";
            state.image = "";
        },
    },
});

export const { login, logout } = CustomerSlice.actions;
export default CustomerSlice.reducer;
