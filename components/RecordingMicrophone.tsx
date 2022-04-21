import * as React from 'react';
import { Image } from 'react-native';

type Props = {
  isActive: Boolean;
};

export default function RecordingMicrophone(props: Props) {
  const activeMicrophoneImageSource = 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/microphone_active.png';
  const inactiveMicrophoneImageSource = 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/microphone_inactive.png';

  return (
    <Image
      style={styles.image}
      source={{uri: props.isActive ? activeMicrophoneImageSource : inactiveMicrophoneImageSource}}
    />
  );
}

const styles = {
  image: {
    height: 25,
    width: 15,
  }
}
