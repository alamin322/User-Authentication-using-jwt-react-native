import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAuthApi } from '../services/userAuthApi';
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';
import isLoggedInReducer  from '../features/isLoggInSlice';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    user: userReducer,
    auth: authReducer,
    userLogin: isLoggedInReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userAuthApi.middleware),

});

setupListeners(store.dispatch);
