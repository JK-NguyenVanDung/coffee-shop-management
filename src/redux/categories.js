import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'categories',
    initialState: {
        detail: null,
        listAll: [],
        loadData: false,

    },
    reducers: {

        setDetail(state, actions) {
            let data = [...state.listAll];
            let index = data.findIndex((item)=> item._id === actions.payload)
            console.log(index)
            state.detail = data[index];
        },


        setListAll(state, actions) {
            console.log(actions.payload);
            state.listAll = actions.payload;

        },      
        changeLoad(state, actions) {
            state.loadData = actions.payload;
        },
    }
})
export const categoriesReducer = slice.reducer;
export const categoriesActions = slice.actions