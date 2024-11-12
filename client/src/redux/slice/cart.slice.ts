import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../../types/ICartItem";
export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [] as ICartItem[],
        total: 0,
        payment_method: "",
    },
    reducers: {
        setPaymentMethod: (state, action) => {
            state.payment_method = action.payload;
        },
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                existingItem.total += item.total;
            } else {
                state.items.push(item);
            }
            state.total += item.total;
        },
        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) {
                state.total += (quantity - item.quantity) * item.price;
                item.quantity = quantity;
                item.total = item.quantity * item.price;
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const listChange = state.items.filter((i) => i.id !== id);
            state.total = listChange.reduce(
                (acc, item) => acc + (item.total ?? 0),
                0
            );
            state.items = listChange;
        },
    },
});

export const { setPaymentMethod, addItem, changeQuantity, removeItem } =
    CartSlice.actions;
export default CartSlice.reducer;
