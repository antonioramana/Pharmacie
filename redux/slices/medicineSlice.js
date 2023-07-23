import{createSlice} from "@reduxjs/toolkit";
import apiServices from "../../services/apiServices";

export  const medicineSlice=createSlice({
    name:"medicines",
    initialState:{
        medicines:[]
    },
    reducers:{
        getMedicine:(state)=>{
            state.medicines=apiServices.getMedicine();
        },
        addMedicine:(state,action)=>{
            const medicine=action.payload;
            apiServices.addMedicine(medicine);
            state.push(action.payload);
            //state.medicines=apiServices.getMedicine();
        },
        deleteMedicine:(state,action)=>{
            const id = action.payload;
            apiServices.deleteMedicine(id);
            state.filter(item => item.id !== id);
            //state.medicines=apiServices.getMedicine();
        },
        updateMedicine:(state,action)=>{
            //const id=action.payload.id;
            const{id,medicine} =action.payload;
            apiServices.updateMedicine(id,medicine);
            state.medicines=apiServices.getMedicine();
        },
        putMedicine:(state,action)=>{
            const id=action.payload.id;
            const qte=action.payload.qte;
            apiServices.putMedicine(id,qte);
            state.medicines=apiServices.getMedicine();
        }

    }
});
export const {getMedicine,addMedicine,deleteMedicine,updateMedicine,putMedicine}=medicineSlice.actions;
const medicineReducer=medicineSlice.reducer;

export default  medicineReducer;