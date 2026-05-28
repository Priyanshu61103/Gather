import { configureStore } from '@reduxjs/toolkit'
import storyReducer from "../Slice/storySlice.js" 
import pageReducer from "../Slice/pageSlice.js"
import editReducer from "../Slice/editSlice.js"
import alertButtonReducer from "../Slice/alertButtonSlice.js"
import profileDataReducer from "../Slice/profileDataSlice.js"
import userDataReducer from "../Slice/userDataSlice.js"
import userProfileDataReducer from '../Slice/userProfileDataSlice.js'
import commentSectionReducer from '../Slice/commentSectionSlice.js'
import shareReducer from "../Slice/shareSlice.js"
export const store = configureStore({
  reducer: {
     storyButton:storyReducer,
     selectedPage:pageReducer,
     editButton:editReducer,
     alertButton:alertButtonReducer,
     profileData:profileDataReducer,
     userData:userDataReducer,
     userProfileData:userProfileDataReducer,
     commentSection:commentSectionReducer,
     share:shareReducer
  },
})