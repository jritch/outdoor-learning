import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

type Props = {
  onClick: () => void;
};

const deleteIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/delete-icon.png';

export default function DeleteButton({onClick}: Props) {
  return (
    <TouchableOpacity style={styles.deleteIconButton} onPress={onClick}>
      <Image source={{uri: deleteIcon}} style={styles.deleteIconStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteIconButton: {
    backgroundColor: '#262627',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconStyle: {
    width: 40,
    height: 40,
  },
});
