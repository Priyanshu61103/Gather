import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value : {}
}

export const payloadSlice = createSlice({
   name:'payloadData',
   initialState,
   reducers:{
      setPayloadData: (state,userData)=>{
          state.value = userData;
          console.log(state.value);
      }
   }
});

export const {setPayloadData} = payloadSlice.actions;

export default payloadSlice.reducer; 