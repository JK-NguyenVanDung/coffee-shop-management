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
        weekDetail: null,
        newWeekSchedule: null,
        existedSchedule: null,
        modalCurrentDate: null,
        modalFirtWeekday: null,
        modalLastWeekday: null,
    },
    reducers: {
        setNewWeekSchedule(state, actions) {
            state.newWeekSchedule = actions.payload;



        },
        setExistedSchedule(state, actions) {
            state.existedSchedule = actions.payload;


        },
        setWeekDetail(state, actions) {
            state.weekDetail = actions.payload;
        },
        setDetail(state, actions) {
            let data = [...state.listEmployees];
            let index = data.findIndex((item)=> item._id === actions.payload)
            state.detail = data[index];
        },


        setListEmployees(state, actions) {
            state.listEmployees = actions.payload;

        },    
        setListAll(state, actions) {
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
        setModalCurrent(state, actions) {
            state.modalCurrentDate = actions.payload;
        },    setModalStart(state, actions) {
            state.modalFirtWeekday = actions.payload;
        },
        setModalLast(state, actions) {
            state.modalLastWeekday = actions.payload;
        },
    }
})
export const scheduleReducer = slice.reducer;
export const scheduleActions = slice.actions