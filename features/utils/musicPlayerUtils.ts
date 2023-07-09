import {useCallback} from 'react';
import TrackPlayer, {State} from 'react-native-track-player';
import {useDispatch} from 'react-redux';
import {toggleIsPlaying} from '../../redux/playerSlice';

export const useMusicPlayerUtils = () => {
  const dispatch = useDispatch();

  const handlePreviousPress = useCallback(async () => {
    TrackPlayer.skipToPrevious();
    TrackPlayer.play();
    dispatch(toggleIsPlaying(true));
  }, [dispatch]);

  const handlePlayPress = useCallback(async () => {
    if ((await TrackPlayer.getState()) === State.Playing) {
      TrackPlayer.pause();
      dispatch(toggleIsPlaying(false));
    } else {
      TrackPlayer.play();
      dispatch(toggleIsPlaying(true));
    }
  }, [dispatch]);

  const handleNextPress = useCallback(async () => {
    TrackPlayer.skipToNext();
    TrackPlayer.play();
    dispatch(toggleIsPlaying(true));
  }, [dispatch]);

  return {
    handlePreviousPress,
    handlePlayPress,
    handleNextPress,
  };
};
