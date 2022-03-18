import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyDress, UserCollectionDress } from "../../types/dress";

interface Collection_State {
    loading: boolean;
    collection : Record<string, UserCollectionDress>
}

const initialState = {
    loading: false,
    collection: {}
} as Collection_State;


const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        setCollection(state, action: PayloadAction<{collection:UserCollectionDress[]}>){
            const newCollection:Record<string, UserCollectionDress> = {}
            action.payload.collection.forEach(ele=>{
                newCollection[ele._id] = ele
            })
            state.collection = newCollection
        }
    },
});

export const {setCollection} = collectionSlice.actions;
export default collectionSlice.reducer;
