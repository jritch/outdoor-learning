import * as React from 'react';
import {useState} from 'react';
import {
  Image as ImageRN,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, Image} from 'react-native-pytorch-core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import classifyImage from '../components/ImageClassifier';
import Bubble from '../components/Bubble';

import SampleEucalyptusTreesScreen from './SampleEucalyptusTreesScreen';
import {RootStackParamList} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function FindScanEucalyptusTreeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'FindScanEucalyptusTreeScreen'>) {
  const findTreeText =
    'Go find and scan a eucalyptus tree to start the lesson.';
  const viewTreeText = 'View eucalyptus tree photos';
  const incorrectTreeText =
    'This doesn’t seem like a eucalyptus tree. Take a closer look at the reference photos.';
  const correctTreeText = 'Great job! You have found a eucalyptus tree.';
  const wouldYouLikeToLearnText =
    'Would you like to learn more about the tree?';
  const closeIcon =
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/close.png';

  const [scanningStarted, setScanningStarted] = useState(false);
  const [showSampleImageScreen, setShowSampleImageScreen] =
    useState<boolean>(false);
  const [imageClass, setImageClass] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  // Function to handle images whenever the user presses the capture button
  async function handleImage(image: Image) {
    setScanningStarted(true);
    setImageClass(null);
    try {
      const result = await classifyImage(image);
      setImageClass(result);
      image.release();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={StyleSheet.absoluteFill}>
        <Camera
          style={[StyleSheet.absoluteFill, {bottom: insets.bottom}]}
          onCapture={handleImage}
        />
        {imageClass && (
          <View style={styles.bubbleContainer}>
            <Bubble text={imageClass} />
          </View>
        )}
        {!scanningStarted && (
          <View style={styles.messageHolder}>
            <Text style={{color: 'white', fontSize: 16}}>{findTreeText}</Text>
            <TouchableOpacity
              onPress={() => {
                setShowSampleImageScreen(true);
              }}
            >
              <Text
                style={{
                  color: 'background: rgba(70, 140, 247, 1)',
                  fontSize: 16,
                  marginTop: 24,
                }}
              >
                {viewTreeText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {scanningStarted &&
          imageClass &&
          imageClass.indexOf('eucalyptus') == -1 && (
            <View style={styles.messageHolder}>
              <Text style={{color: 'white', fontSize: 16}}>
                {incorrectTreeText}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowSampleImageScreen(true);
                }}
              >
                <Text
                  style={{
                    color: 'background: rgba(70, 140, 247, 1)',
                    fontSize: 16,
                    marginTop: 24,
                  }}
                >
                  {viewTreeText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        {imageClass && imageClass.indexOf('eucalyptus') == 0 && (
          <View style={styles.successMessageHolder1}>
            <Text style={{color: 'white', fontSize: 16}}>
              {correctTreeText}
            </Text>
          </View>
        )}
        {imageClass && imageClass.indexOf('eucalyptus') == 0 && (
          <View style={styles.successMessageHolder2}>
            <Text style={{color: 'white', fontSize: 16}}>
              {wouldYouLikeToLearnText}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.messageHolder}>
        <Text style={{color: 'white', fontSize: 16}}>{incorrectTreeText}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LessonContentScreen');
          }}
        >
          <Text
            style={{
              color: 'background: rgba(70, 140, 247, 1)',
              fontSize: 16,
              marginTop: 24,
            }}
          >
            {'[DEV] Skip to next screen'}
          </Text>
        </TouchableOpacity>
      </View>
      {showSampleImageScreen && <SampleEucalyptusTreesScreen />}
      {showSampleImageScreen && (
        <View style={styles.closeIcon}>
          <TouchableOpacity
            onPress={() => {
              setShowSampleImageScreen(false);
            }}
          >
            <ImageRN
              source={{uri: closeIcon}}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Custom render style for label container
const styles = StyleSheet.create({
  bubbleContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    marginLeft: 24,
  },
  messageHolder: {
    position: 'absolute',
    width: '70%',
    bottom: 150,
    left: 24,
    backgroundColor: '#121212',
    borderRadius: 18,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  successMessageHolder1: {
    position: 'absolute',
    width: '70%',
    bottom: 268,
    left: 24,
    backgroundColor: '#121212',
    borderRadius: 18,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  successMessageHolder2: {
    position: 'absolute',
    width: '70%',
    bottom: 196,
    left: 24,
    backgroundColor: '#121212',
    borderRadius: 18,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
