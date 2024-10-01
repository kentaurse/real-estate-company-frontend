import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
}

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
    }
  },
})

export const { setUser } = UserSlice.actions

export default UserSlice.reducer