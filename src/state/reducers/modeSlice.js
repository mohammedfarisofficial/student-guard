import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    theme: 'light',
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme =  action.payload
    },
  },
});

export const { setTheme } = modeSlice.actions;
export default modeSlice.reducer;