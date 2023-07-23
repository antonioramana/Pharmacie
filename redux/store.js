import {configureStore} from "@reduxjs/toolkit";
import medicineReducer from"./slices/medicineSlice"

const Store= configureStore({
    reducer:{
        medicines: medicineReducer,
    }
});
export default Store;