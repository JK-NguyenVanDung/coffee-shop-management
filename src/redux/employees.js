import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'employees',
    initialState: {
        detail: null,
        listAll: [],
        loadData: false,
        lock: false,
        chart: null,
        workLog: null,
        workedTime: null,
    },
    reducers: { 
        setWorkedTime(state, actions) {
            state.workedTime = actions.payload;
        }, 
        setWorkLog(state, actions) {
            state.workLog = actions.payload;
        }, 
        lockPage(state) {
 
            state.lock = true;
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
export const employeesReducer = slice.reducer;
export const employeesActions = slice.actions