import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'employees',
    initialState: {
        detail: null,
        listAll: []
    },
    reducers: {

        setDetail(state, actions) {
            let data = [...state.listAll];
            let index = data.findIndex((item)=> item.id === actions.payload)
            state.detail = data[index];
        },


        setListAll(state, actions) {
            console.log(actions.payload);
            state.listAll = actions.payload;

        }
    }
})
export const employeesReducer = slice.reducer;
export const employeesActions = slice.actions