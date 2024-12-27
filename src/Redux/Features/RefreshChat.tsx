/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

export const refreshChatSlice = createSlice({
  name: 'refreshChat',
  initialState:{
    value : false,
  },
  reducers: {
    RefreshChat: (state) => {
      state.value = !state.value;
    },
  },
});

export const {RefreshChat} = refreshChatSlice.actions;
export default refreshChatSlice.reducer;
