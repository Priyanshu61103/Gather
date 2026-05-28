import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const storySlice = createSlice({
  name: 'storyButton',
  initialState,
  reducers: {
    switchOn : (state) => {
      state.value = true
    },
    switchOff: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { switchOn,switchOff } = storySlice.actions

export default storySlice.reducer