/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState:{
    item:'',
  },
  reducers: {
    updateSelection: (state, action) => {
      state.item = action.payload;
    },
    clearSelection: (state) => {
      state.item = '';
    },
  },
});

export const {updateSelection,clearSelection} = headerSlice.actions;
export default headerSlice.reducer;
