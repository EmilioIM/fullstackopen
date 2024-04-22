import { createSlice } from '@reduxjs/toolkit'

const loginUserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setLoginUser: (state, action) => {
      return action.payload
    },
  },
})

export const { setLoginUser } = loginUserSlice.actions

export default loginUserSlice.reducer