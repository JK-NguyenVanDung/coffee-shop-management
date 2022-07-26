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
        enabled: true,
        modalError: false,
        detail: false,
        delete: false,
    },
    reducers: {
        showDelete(state) {
            state.delete =true;
        }, hideDelete(state) {
            state.delete = false;
        },
        setDetail(state,actions) {
            state.detail = actions.payload;
        },
        showError(state) {
            state.modalError = true;
        },
        hideError(state) {
            state.modalError = false;
        },
        enableForm(state) {
            state.enabled = true;
        },
        disableForm(state) {
            state.enabled = false;
        },
        showForm(state) {
            state.show = true;
        },
        closeForm(state) {
            state.show = false
            state.detail=false
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