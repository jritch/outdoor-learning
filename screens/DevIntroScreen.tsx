import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import type {RootStackParamList} from '../types';

export default function DevIntroScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'DevIntroScreen'>) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          [DEV] Stanford Nature App: Dev Screen
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LessonIntroScreen')}
          style={styles.button}
        >
          <Text style={styles.startButtonText}>{'Start App'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.startButtonText}>{'[WIP] Dev Menu'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center',
  },
  headingContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 22,
    height: 160,
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  startButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 24,
    marginRight: 24,
  },
  buttonWrapper: {
    // position: 'absolute',
    // bottom: 84,
    width: '100%',
    margin: 8,
  },
  imageSection: {
    marginTop: 50,
    width: '100%',
    height: 256,
    backgroundColor: '#ffffff',
  },
});
