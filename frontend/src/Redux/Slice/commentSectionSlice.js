import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const commentSectionSlice = createSlice({
  name: 'commentSection',
  initialState,
  reducers: {
    switchOn : (state,id) => {
      state.value = id
    },
    switchOff: (state) => {
      state.value = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { switchOn,switchOff } = commentSectionSlice.actions

export default commentSectionSlice.reducer