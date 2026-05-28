import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const userProfileDataSlice = createSlice({
  name: 'userProfileData',
  initialState,
  reducers: {
    setUserProfileData : (state,result) => {
      state.value = result
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserProfileData } = userProfileDataSlice.actions

export default userProfileDataSlice.reducer