import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'inventories',
    initialState: {
        detail: null,
        listAll: [],
        listCate: [],
        loadData: false,

    },
    reducers: {
        setListCate(state,actions){

            state.listCate = actions.payload;
        },
        setDetail(state, actions) {
            let data = [...state.listAll];
            let index = data.findIndex((item)=> item._id === actions.payload)
            state.detail = data[index];
        },


        setListAll(state, actions) {
            state.listAll = actions.payload;

        },      
        changeLoad(state, actions) {
            state.loadData = actions.payload;
        },
    }
})
export const inventoriesReducer = slice.reducer;
export const inventoriesActions = slice.actions