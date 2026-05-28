import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const editSlice = createSlice({
  name: 'editButton',
  initialState,
  reducers: {
    setEditButton : (state) => {
      if(state.value == false)
      state.value = true;
      else
      state.value = false;    
    }
  },
})

// Action creators are generated for each case reducer function
export const { setEditButton } = editSlice.actions

export default editSlice.reducer