import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notificationSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
})