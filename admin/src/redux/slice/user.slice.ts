import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        fullName: "",
        token: "",
        isLogin: false,
        id: "",
        role: "",
        permissions: []
    },
    reducers: {
        login: (state, action) => {
        ;
            state.token = action.payload.token;
            state.isLogin = true;
            state.id = action.payload.id;
            state.role = action.payload.role;
            state.permissions = action.payload.permissions;
            state.fullName = action.payload.fullName;
        },
        logout: (state) => {
            state.id = "";
            state.token = "";
            state.role = "";
            state.permissions = [];
            state.isLogin = false;
            state.fullName = "";
        },
    },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
