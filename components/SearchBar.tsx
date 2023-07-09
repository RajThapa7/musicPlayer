import {View, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
  return (
    <View className="flex flex-row px-5 bg-gray-800 rounded-full items-center mx-4">
      <Icon name="search" className="" size={14} />
      <TextInput
        placeholder="Search songs playlists and artists"
        className="flex-1"
      />
    </View>
  );
};

export default SearchBar;
