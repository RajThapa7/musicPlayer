import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.PlayFromId,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.PlayFromId,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: 0,
      url: require('./assets/fluidity-100-ig-edit-4558.mp3'),
      title: 'Fluidity',
      artist: 'tobylane',
      duration: 60,
    },
    {
      id: 1,
      url: require('./assets/penguinmusic-modern-chillout-future-calm-12641.mp3'),
      title: 'Modern Chillout',
      artist: 'penguinmusic',
      duration: 66,
    },
    {
      id: 2,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 3,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 4,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 5,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 6,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 7,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 8,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 9,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 10,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 11,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 12,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 13,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 14,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 15,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 16,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
    {
      id: 17,
      url: require('./assets/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // TODO: Attach remote event handlers
}
