import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../slice/user.slice";
import CartSlice from "../slice/cart.slice";
const persistConfig = {
    key: "customer",
    storage,
};
const persistConfigCart = {
    key: "cart",
    storage,
}

export const rootStore = configureStore({
    reducer: {
        customerSlice: persistReducer(persistConfig, userSlice),
        cartSlice: persistReducer(persistConfigCart, CartSlice),
    },
});
export const persistor = persistStore(rootStore);
