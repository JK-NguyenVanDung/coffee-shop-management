import { createSlice } from '@reduxjs/toolkit'
// import { API_CONFIG } from '../api';
import axiosConfig from '../api/axiosConfig';
// import authService from '../service/auth/authService';
const slice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        info: {
           
        },
        accessRight: false,

    },
    reducers: {
        setAdminAuth(state){
            state.accessRight = true;
        },
        setEmpAuth(state){
            state.accessRight =false;

        },
        login(state, actions) { 
            state.token = actions.payload
        },
        logout(state) {
            state.token = null;

        },
        setInfo(state, actions) {
            state.info = actions.payload
        }
    },
})
export const authReducers = slice.reducer;
export const authActions = slice.actions;

