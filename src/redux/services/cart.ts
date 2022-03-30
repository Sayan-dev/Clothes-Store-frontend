import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartItems } from "../../types/cart";
import { CompanyDress, UserCollectionDress } from "../../types/dress";

interface Cart_State {
    loading: boolean;
    items: CartItems;
    amount: number;
}

const initialState = {
    loading: false,
    items: {},
    amount: 0,
} as Cart_State;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem(state, action: PayloadAction<{ item: CartItem }>) {
            const { item } = action.payload;
            
            state.items[item._id] = item

            let newAmount = 0
            Object.keys(state.items).forEach((key)=>{
                newAmount += (state.items[key].price * state.items[key].quantity)
            })
            state.amount = newAmount

        },
        removeItemFromCart(state, action: PayloadAction<{ itemId: CartItem["_id"] }>){
            if(state.items[action.payload.itemId]){

                delete state.items[action.payload.itemId]
            }
            let newAmount = 0
            Object.keys(state.items).forEach((key)=>{
                newAmount += (state.items[key].price * state.items[key].quantity)
            })
            state.amount = newAmount
        }
    },
});

export const { addCartItem, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
