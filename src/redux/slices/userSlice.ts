import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoType } from "src/types/octokit";

export interface UserState {
  userInfo: UserInfoType | null
}

const initialState: UserState = {
  userInfo: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions

export default userSlice.reducer