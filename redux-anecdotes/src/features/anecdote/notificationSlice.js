import { createSlice } from '@reduxjs/toolkit';

export const showNotification = (message, time = 1) => {
  return async dispatch => {
    dispatch(show(message))
    setTimeout(() => dispatch(clear()), time * 1000);
  }
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    show: (state, action) => action.payload,
    clear: () => null,
  },
});

export const { show, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
