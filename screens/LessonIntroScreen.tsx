import * as React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function LessonIntroScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'LessonIntroScreen'>) {
  const headingTextContent = 'Learn about eucalyptus trees guided by audio.';
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingSection}>
        <Text style={styles.headingText}>{headingTextContent}</Text>
      </View>
      <View style={styles.imageSection}>
        <ImageBackground
          source={{uri: 'https://reactjs.org/logo-og.png'}}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.buttonPosition}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FindScanEucalyptusTreeScreen')}
          style={styles.button}
        >
          <Text style={styles.startButtonText}>{'START'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headingText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headingSection: {
    marginLeft: 24,
    marginRight: 24,
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
  buttonPosition: {
    position: 'absolute',
    bottom: 84,
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSection: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    flex: 1,
  },
});
