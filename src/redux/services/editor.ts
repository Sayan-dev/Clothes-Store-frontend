import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyDress } from "../../types/dress";

interface Editor_State {
    loading: boolean;
    amount: number;
    items: CompanyDress[];
    canvas_state: string;
    final_image: string;
    catagory: CompanyDress["type"] | "";
}

const initialState = {
    loading: false,
    amount: 0,
    items: [],
    canvas_state: "",
    final_image: "",
    catagory: "",
} as Editor_State;

interface Item_State {
    item: CompanyDress;
    canvas_state?: string;
    canvas_image?: string;
}

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<Item_State>) {
            if (
                state.items.findIndex((ele) =>
                    ele._id === action.payload.item._id
                )< 0
            ){
                state.items.push(action.payload.item);
                state.amount += action.payload.item.price;
                state.canvas_state = action.payload.canvas_state;
                state.final_image = action.payload.canvas_image;
            }

        },
        removeAllItems(state, action: PayloadAction<CompanyDress>) {
            state.items = [];
            state.amount = 0;
        },
        setCatagory(
            state,
            action: PayloadAction<{ catagory: CompanyDress["type"] | "" }>
        ) {
            state.catagory = action.payload.catagory;
            state.canvas_state = null;
        },
        setCanvasState(
            state,
            action: PayloadAction<{ current_state: string }>
        ) {
            state.canvas_state = action.payload.current_state;
        },
        setFinalImage(
            state,
            action: PayloadAction<{
                current_state: string;
                canvas_image?: string;
            }>
        ) {
            state.canvas_state = action.payload.current_state;
            state.final_image = action.payload.canvas_image;
        },
    },
});

export const {
    addItemToCart,
    removeAllItems,
    setCatagory,
    setCanvasState,
    setFinalImage,
} = editorSlice.actions;
export default editorSlice.reducer;
