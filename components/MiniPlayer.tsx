import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {toggleIsModalOpen} from '../redux/playerSlice';
import {useMusicPlayerUtils} from '../features/utils/musicPlayerUtils';

const musicSpinner = require('../assets/musicSpinner.png');

const MiniPlayer = () => {
  const dispatch = useDispatch();

  const {isPlaying} = useSelector((store: RootState) => store.player);

  const {handlePreviousPress, handleNextPress, handlePlayPress} =
    useMusicPlayerUtils();

  return (
    <TouchableOpacity
      onPress={() => dispatch(toggleIsModalOpen(true))}
      activeOpacity={1}
      className=" flex flex-row absolute bottom-0 left-0 bg-[#112] w-full z-50 rounded-t-xl border-t-2 border-sky-600 px-4 pb-3 pt-2 items-center">
      <Image source={musicSpinner} className="w-12 h-12 mr-3" />
      <View className="flex-1">
        <Text className="font-semibold text-lg text-white">Uptown Funk </Text>
        <Text className="text-gray-400">Mark Ronson ft. Bruno Mars</Text>
      </View>
      <View className="flex flex-row items-center justify-center gap-x-3">
        <TouchableOpacity activeOpacity={0.8} onPress={handlePreviousPress}>
          <Icon name="play-skip-back" size={16} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-full py-[8px] pl-[9.5px] pr-[7px]"
          activeOpacity={0.8}
          onPress={handlePlayPress}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={16} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={handleNextPress}>
          <Icon name="play-skip-forward" size={16} color={'white'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MiniPlayer;
