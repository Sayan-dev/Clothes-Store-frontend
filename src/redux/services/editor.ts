import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyDress } from "../../types/dress";

interface Editor_State {
    loading: boolean;
    amount: number;
    items: CompanyDress[],
    finalImage: string;
}

const initialState = {
    loading: false,
    amount: 0,
    items: [],
    finalImage: ""
} as Editor_State;


const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<CompanyDress>){
            state.items.push(action.payload)
            state.amount += action.payload.price
        },
        removeAllItems(state, action: PayloadAction<CompanyDress>){
            state.items=[]
            state.amount = 0
        }
    },
});

export const {addItemToCart, removeAllItems} = editorSlice.actions;
export default editorSlice.reducer;
