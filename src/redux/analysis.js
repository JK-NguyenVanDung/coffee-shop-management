import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'analysis',
    initialState: {
        detail: null,
        listAll: [],
        loadData: false,
        date: null,
        stats:null,
        type: true,
    },
    reducers: {
        setType(state,actions){
            state.type = !state.type;

        }
        ,
        setDate(state,actions){
            state.date = actions.payload;

        }
        ,
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
        setStats(state,actions){
            state.stats = actions.payload;

        }
    }
})
export const analysisReducer = slice.reducer;
export const analysisActions = slice.actions