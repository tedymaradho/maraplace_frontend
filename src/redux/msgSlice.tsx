import { createSlice } from '@reduxjs/toolkit';

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    msgShow: false,
    msgTitle: '',
    msgContent: '',
    msgBtnContent: '',
  },
  reducers: {
    setMsgShow: (state, action) => {
      state.msgShow = true;
      state.msgTitle = action.payload.title;
      state.msgContent = action.payload.content;
      state.msgBtnContent = action.payload.btnContent;
    },
    setMsgHide: (state) => {
      state.msgShow = false;
      state.msgTitle = '';
      state.msgContent = '';
      state.msgBtnContent = '';
    },
  },
});

export const { setMsgShow, setMsgHide } = msgSlice.actions;

export default msgSlice.reducer;
