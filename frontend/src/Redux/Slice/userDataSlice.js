import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData : (state,info) => {
      state.value = info
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer