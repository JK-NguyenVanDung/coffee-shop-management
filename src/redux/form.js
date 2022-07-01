import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'form',
    initialState: {
        show: false,
        loadData: false,
        loadData1: false,
        formAddCategory: false,
        nameMenu: null

    },
    reducers: {
        showForm(state) {
            state.show = true;
        },
        closeForm(state) {
            state.show = false
        },
        setNameMenu(state, actions) {
            state.nameMenu = actions.payload
        },
        showFormAddCategory(state) {
            state.formAddCategory = true;
        },
        closeFormAddCategory(state) {
            state.formAddCategory = false
        },
        changeLoad(state, actions) {
            state.loadData = actions.payload;
        },
        changeLoadProduct(state, actions) {
            state.loadData1 = actions.payload;
        },

    }
})
export const formReducer = slice.reducer;
export const formActions = slice.actions