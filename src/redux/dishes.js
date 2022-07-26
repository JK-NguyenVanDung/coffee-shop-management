import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'dishes',
    initialState: {
        detail: null,
        listAll: [],
        listCate: [],

        loadData: false,

    },
    reducers: {
        setListCate(state,actions){
            console.log(actions.payload);

            state.listCate = actions.payload;
        },
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
export const dishesReducer = slice.reducer;
export const dishesActions = slice.actions