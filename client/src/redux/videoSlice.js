import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    currentVideo: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = videoSlice.actions;

export default videoSlice.reducer;
