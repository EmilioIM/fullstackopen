import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notificationSlice'
import blogReducer from '../features/blogSlice'
import userReducer from '../features/userSlice'
import loginUserReducer from '../features/loginUserSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    loginUser: loginUserReducer,
  },
})