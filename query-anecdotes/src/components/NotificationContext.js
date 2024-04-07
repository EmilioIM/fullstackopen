import { createContext, useContext, useReducer } from 'react';

// Define initial state
const initialState = {
  message: '',
  duration: null,
};

// Create a context
const NotificationContext = createContext();

// Define reducer function
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.message, duration: action.duration };
    case 'HIDE':
      return { message: '', duration: null };
    default:
      return state;
  }
};



// Create a provider component
export const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotification = () => useContext(NotificationContext);
