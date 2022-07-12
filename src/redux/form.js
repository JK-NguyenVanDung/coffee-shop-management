import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'form',
    initialState: {
        show: false,
        loadData: false,
        loadData1: false,
        formAddCategory: false,
        nameMenu: null,
        formType: "",
    },
    reducers: {
        showForm(state) {
            state.show = true;
            console.log(state.show);
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
        setFormType(state, actions) {
            state.formType = actions.payload
        },    
    }
})
export const formReducer = slice.reducer;
export const formActions = slice.actions