import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "Feed",
}

export const pageSlice = createSlice({
  name: 'selectedPage',
  initialState,
  reducers: {
    setSelectedPage : (state,page) => {
      state.value = page
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedPage } = pageSlice.actions

export default pageSlice.reducer