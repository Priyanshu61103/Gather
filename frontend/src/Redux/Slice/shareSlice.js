import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    switchOnShare : (state,id) => {
      state.value = id
    },
    switchOffShare: (state) => {
      state.value = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { switchOnShare,switchOffShare } = shareSlice.actions

export default shareSlice.reducer