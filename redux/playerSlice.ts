import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  isModalOpen: false,
};

const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    toggleIsPlaying: (state, action) => {
      const newValue = action.payload;
      state.isPlaying = newValue;
    },
    toggleIsModalOpen: (state, action) => {
      const newValue = action.payload;
      state.isModalOpen = newValue;
    },
  },
});

export default playerSlice.reducer;
export const {toggleIsPlaying, toggleIsModalOpen} = playerSlice.actions;
