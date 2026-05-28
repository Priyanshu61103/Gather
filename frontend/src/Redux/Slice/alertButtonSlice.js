import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const alertButtonSlice = createSlice({
  name: 'alertButton',
  initialState,
  reducers: {
    setAlertButton : (state,message) => {
      state.value = message;    
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAlertButton } = alertButtonSlice.actions

export default alertButtonSlice.reducer