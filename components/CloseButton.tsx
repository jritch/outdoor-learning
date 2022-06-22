import * as React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  onClick: () => void;
};

const closeIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/close-icon.png';

export default function CloseButton({onClick}: Props) {
  return (
    <TouchableOpacity style={styles.closeIconButton} onPress={onClick}>
      <Image source={{uri: closeIcon}} style={styles.closeIconStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  closeIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconStyle: {
    width: 40,
    height: 40,
  },
});
