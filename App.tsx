import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {addTracks, setupPlayer} from './trackPlayerService';
import MusicList from './features/MusicList';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ProgressModal from './components/ProgressModal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
          <MusicList />
          <ProgressModal />
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112',
  },
});

export default App;
