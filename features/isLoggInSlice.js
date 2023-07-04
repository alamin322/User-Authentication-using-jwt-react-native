import {createSlice} from '@reduxjs/toolkit';

const isLoggedInSlice = createSlice({

  name: 'auth',

  initialState: {
    isLoggedIn: false,
  },

  reducers: {

    login: state => {
      state.isLoggedIn = true;
    },
    
    logout: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {login, logout} = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
