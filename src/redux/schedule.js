import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'schedule',
    initialState: {
        detail: null,
        listAll: [],
        listEmployees:[],
        loadData: false,
        currentDate: null,
        firstWeekday: null,
        lastWeekday: null,

    },
    reducers: {

        setDetail(state, actions) {
            let data = [...state.listEmployees];
            let index = data.findIndex((item)=> item._id === actions.payload)
            state.detail = data[index];
        },


        setListEmployees(state, actions) {
            state.listEmployees = actions.payload;

        },    
        setListAll(state, actions) {
            console.log(actions.payload);
            state.listAll = actions.payload;

        },      
        changeLoad(state, actions) {
            state.loadData = actions.payload;
        },
        setCurrent(state, actions) {
            state.currentDate = actions.payload;
        },    setStart(state, actions) {
            state.firstWeekday = actions.payload;
        },
        setLast(state, actions) {
            state.lastWeekday = actions.payload;
        },
    }
})
export const scheduleReducer = slice.reducer;
export const scheduleActions = slice.actions