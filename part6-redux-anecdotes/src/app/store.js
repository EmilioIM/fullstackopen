import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from '../features/anecdote/anecdoteSlice';
import filterReducer from '../features/anecdote/filterSlice';
import notificationReducer from '../features/anecdote/notificationSlice';

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filters: filterReducer,
    notification: notificationReducer,
  },
});