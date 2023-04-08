import { createSlice } from '@reduxjs/toolkit';

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setHidden: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
});

export const { setLoading, setSuccess, setError, setHidden } = msgSlice.actions;

export default msgSlice.reducer;
