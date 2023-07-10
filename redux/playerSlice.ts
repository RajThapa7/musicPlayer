import {createSlice} from '@reduxjs/toolkit';
import {trackList} from '../data/trackData';

const initialState = {
  isPlaying: false,
  isModalOpen: false,
  activeTrackId: 0,
  currentTrack: {
    id: 0,
    title: '',
    artist: '',
    duration: 0,
    url: '',
  },
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
    setCurrentTrack: (state, action) => {
      if (typeof action.payload.id !== 'undefined') {
        state.currentTrack = trackList.filter(
          item => item.id === action.payload.id,
        )[0];
      } else {
        const newValue = action.payload;
        state.currentTrack = newValue;
      }
    },
  },
});

export default playerSlice.reducer;
export const {toggleIsPlaying, toggleIsModalOpen, setCurrentTrack} =
  playerSlice.actions;
