import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from '../features/anecdote/anecdoteSlice';
import notificationReducer from '../features/anecdote/notificationSlice';

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
  },
});