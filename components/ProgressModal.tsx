import React, {useCallback, useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {View} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  setCurrentTrack,
  toggleIsModalOpen,
  toggleIsPlaying,
} from '../redux/playerSlice';
import Slider from '@react-native-community/slider';
import {convertSecondsIntoMinutesAndSeconds} from '../features/utils/utilFunctions';

const img = require('../public/music.jpeg');

const events = [Event.PlaybackTrackChanged];

const ProgressModal = () => {
  const {isModalOpen, isPlaying} = useSelector(
    (store: RootState) => store.player,
  );

  const {position, duration} = useProgress();

  const dispatch = useDispatch();

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackTrackChanged) {
      TrackPlayer.getCurrentTrack().then(index => {
        console.log(index, 'index');
        dispatch(setCurrentTrack({id: index}));
      });
    }
  });

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

  const handleSliderChange = async (value: number) => {
    setSliderValue(value);
    await TrackPlayer.seekTo(value);
  };

  const {currentTrack} = useSelector((store: RootState) => store.player);

  const [sliderValue, setSliderValue] = useState(position);

  useEffect(() => {
    setSliderValue(position);
  }, [position]);

  return (
    <View>
      <Modal
        visible={isModalOpen}
        onRequestClose={() => dispatch(toggleIsModalOpen(false))}
        animationType="slide"
        style={styles.modal}
        statusBarTranslucent={true}
        transparent={true}>
        {/* for making blurred backdrop */}
        {/* <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        /> */}

        <TouchableWithoutFeedback
          onPress={() => dispatch(toggleIsModalOpen(false))}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        {/* modal content  */}
        <View style={styles.modalContent}>
          {/* close bar */}
          <CloseIcon onPress={() => dispatch(toggleIsModalOpen(false))} />

          <View className="rounded-2xl flex items-center justify-center mb-7">
            <Image
              source={img}
              className="rounded-2xl w-72 h-80"
              resizeMode="contain"
            />
          </View>

          <View className="w-full mb-5">
            <Text className="text-2xl font-bold text-white text-center">
              {currentTrack.title}
            </Text>
            <Text className="text-center">{currentTrack.artist}</Text>
          </View>

          {/* slider  */}
          <View className="flex w-full items-center pb-6 pt-8">
            <Slider
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#8a8888"
              value={sliderValue}
              onValueChange={handleSliderChange}
              style={styles.slider}
            />
            <View className="flex flex-row w-full justify-between px-12">
              <Text className="text-xs">
                {convertSecondsIntoMinutesAndSeconds(position)}
              </Text>
              <Text className="text-xs">
                {convertSecondsIntoMinutesAndSeconds(duration)}
              </Text>
            </View>
          </View>

          {/* player controls */}
          <View className="flex flex-row items-center justify-center gap-x-3">
            <TouchableOpacity activeOpacity={0.8} onPress={handlePreviousPress}>
              <Icon name="play-skip-back" size={30} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white rounded-full py-4 pl-[19px] pr-[15px]"
              activeOpacity={0.8}
              onPress={handlePlayPress}>
              <Icon
                name={isPlaying ? 'pause' : 'play'}
                size={30}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleNextPress}>
              <Icon name="play-skip-forward" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CloseIcon = ({
  onPress,
}: {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}) => (
  <View className="absolute -top-3 w-full">
    <TouchableOpacity
      className="w-36 h-1 bg-gray-400 rounded-full mx-auto"
      onPress={onPress}
    />
  </View>
);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    backgroundColor: 'rgba(52, 53, 73, 0.6)',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    position: 'relative',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  slider: {
    width: 330,
  },
});

export default ProgressModal;
