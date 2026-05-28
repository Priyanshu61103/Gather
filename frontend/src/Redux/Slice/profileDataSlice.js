import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const profileDataSlice = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setProfileData : (state,result) => {
      state.value = result
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProfileData } = profileDataSlice.actions

export default profileDataSlice.reducer