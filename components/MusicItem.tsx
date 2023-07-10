import {View, Image, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {useDispatch} from 'react-redux';
import {
  toggleIsModalOpen,
  toggleIsPlaying,
  setCurrentTrack,
} from '../redux/playerSlice';

const img = require('../public/music.jpeg');

interface IMusicItem {
  title: string | undefined;
  artist: string | undefined;
  id: number;
}

const events = [
  Event.RemotePlayId,
  Event.RemotePause,
  Event.PlaybackTrackChanged,
];

const MusicItem = ({title, artist, id}: IMusicItem) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(0);
  const dispatch = useDispatch();

  const handlePlayPress = async () => {
    dispatch(toggleIsModalOpen(true));
    dispatch(setCurrentTrack({title, artist}));
    if (currentTrackIndex === id) {
      if ((await TrackPlayer.getState()) === State.Playing) {
        TrackPlayer.pause();
        dispatch(toggleIsPlaying(false));
      } else {
        TrackPlayer.play();
        dispatch(toggleIsPlaying(true));
      }
    } else {
      TrackPlayer.skip(id);
      TrackPlayer.play();
      dispatch(toggleIsPlaying(true));
    }
  };

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.RemotePlayId) {
      console.warn('remote play');
    }
    if (event.type === Event.RemotePause) {
      console.log('remote pause');
    }
    if (event.type === Event.PlaybackTrackChanged) {
      TrackPlayer.getCurrentTrack().then(index => setCurrentTrackIndex(index));
    }
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="flex flex-row items-center justify-between px-4"
      onPress={handlePlayPress}>
      <View className="flex flex-row items-center gap-x-4">
        <Image source={img} className="w-12 h-12 rounded-lg" />
        <View>
          <Text
            className={`${
              currentTrackIndex === id ? 'text-sky-400' : 'text-white'
            } font-semibold`}>
            {title}
          </Text>
          <Text className="text-gray-500 text-xs">{artist}</Text>
        </View>
      </View>
      <View className="flex flex-row items-center gap-x-4">
        <Icon
          name={isFavourite ? 'heart' : 'heart-outline'}
          size={20}
          onPress={() => setIsFavourite(prev => !prev)}
        />
        <EntypoIcon name="dots-three-vertical" size={16} />
      </View>
    </TouchableOpacity>
  );
};

export default MusicItem;
