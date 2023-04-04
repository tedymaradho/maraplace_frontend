import { createSlice } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    email: '',
    token: '',
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    clearCurrentUser: (state) => {
      state.email = '';
      state.token = '';
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
