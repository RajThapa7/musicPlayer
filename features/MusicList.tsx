import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {Track} from 'react-native-track-player';
import MusicItem from '../components/MusicItem';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';

const MusicList = () => {
  const [musicList, setMusicList] = useState<Track[]>();

  const renderSeparator = () => <View className="h-4" />;

  useEffect(() => {
    (async () => {
      const list = await TrackPlayer.getQueue();
      setMusicList(list);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar />
      <MiniPlayer />
      <FlatList
        data={musicList}
        renderItem={({item}) => (
          <MusicItem artist={item.artist} title={item.title} id={item.id} />
        )}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={{paddingBottom: 120}}
        className="flex-1 pt-6 pb-20"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
});

export default MusicList;
