import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return {
        message: action.payload.message,
        type: action.payload.type // 'success' or 'error'
      }
    },
    clearNotification: () => null,
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer

export const triggerNotification = (message, type = 'success') => (dispatch) => {
  dispatch(setNotification({ message, type }))
  setTimeout(() => {
    dispatch(clearNotification())
  }, 3000)
}
