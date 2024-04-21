import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notificationSlice'
import blogReducer from '../features/blogSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
})