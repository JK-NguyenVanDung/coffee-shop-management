import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./redux";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistConfig } from "redux-persist/es/types";
const config = combineReducers({
    auth: reducers.authReducers,
    menu: reducers.menuReducer,
    form: reducers.formReducer,
    employees: reducers.employeesReducer,
    dishes: reducers.dishesReducer,
    categories: reducers.categoriesReducer,
    schedule: reducers.scheduleReducer,
    bills: reducers.billsReducer,
    inventories: reducers.inventoriesReducer,
    // order: reducers.orderReducer,
    // news: reducers.newsReducer,
    // keyword: reducers.keyWordReducer,
    // vouchers:reducers.vouchersReducer
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    version: 1,
    // blacklist:[]
}
const persisReducerConfig = persistReducer(persistConfig, config)
const store = configureStore({
    reducer: persisReducerConfig
})
export const persistor = persistStore(store);
export default store;