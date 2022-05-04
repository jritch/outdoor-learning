import * as React from 'react';
import {Image, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {AudioUtil} from 'react-native-pytorch-core';

type Props = {
  source: string;
};

export default function PlayAudioButton(props: Props) {
  const playAudioIconSource =
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/play_audio.png';

  async function playAudio() {
    const audio = await AudioUtil.fromFile(props.source);
    audio.play();
  }

  return (
    <View>
      <TouchableOpacity onPress={playAudio}>
        <View style={styles.playButton}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 110,
            }}
          >
            <Image
              style={styles.playAudioImage}
              source={{uri: playAudioIconSource}}
            />
            <Text style={styles.playButtonText}>PLAY AUDIO</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playButton: {
    height: 40,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262627',
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 14,
    alignContent: 'flex-end',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  playAudioImage: {
    width: 14,
    height: 14,
    marginTop: 2,
  },
});
