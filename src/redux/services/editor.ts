import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyDress } from "../../types/dress";

interface Editor_State {
    loading: boolean;
    amount: number;
    items: CompanyDress[],
    finalImage: string;
    catagory: CompanyDress["type"],
}

const initialState = {
    loading: false,
    amount: 0,
    items: [],
    finalImage: "",
    catagory: "mens"
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
        },
        setCatagory(state, action: PayloadAction<{catagory:CompanyDress["type"]}>){
            state.catagory = action.payload.catagory
        }
    },
});

export const {addItemToCart, removeAllItems, setCatagory} = editorSlice.actions;
export default editorSlice.reducer;
