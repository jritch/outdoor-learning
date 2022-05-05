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

  const [scanningStarted, setScanningStarted] = useState(false);
  const [imageClass, setImageClass] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  // Function to handle images whenever the user presses the capture button
  async function handleImage(image: Image) {
    setScanningStarted(true);
    setImageClass(null);
    try {
      const result = await classifyImage(image);
      console.log('Image classification result:', result);
      setImageClass(result);
      image.release();
    } catch (error) {
      console.log(error);
    }
  }

  const messageElements = [];

  if (!scanningStarted) {
    messageElements.push(
      <Text style={styles.messageText}>{findTreeText}</Text>,
      <TouchableOpacity
        onPress={() => navigation.navigate('SampleEucalyptusTreesScreen')}
      >
        <Text style={styles.linkText}>{viewTreeText}</Text>
      </TouchableOpacity>,
    );
  }

  if (
    scanningStarted &&
    imageClass &&
    imageClass.indexOf('eucalyptus') === -1
  ) {
    messageElements.push(
      <Text style={styles.messageText}>{incorrectTreeText}</Text>,
      <TouchableOpacity
        onPress={() => navigation.navigate('SampleEucalyptusTreesScreen')}
      >
        <Text style={styles.linkText}>{viewTreeText}</Text>
      </TouchableOpacity>,
    );
  }

  if (imageClass && imageClass.indexOf('eucalyptus') === 0) {
    messageElements.push(
      <Text style={styles.messageText}>{correctTreeText}</Text>,
    );
  }

  if (imageClass && imageClass.indexOf('eucalyptus') === 0) {
    messageElements.push(
      <Text style={styles.messageText}>{wouldYouLikeToLearnText}</Text>,
    );
  }

  messageElements.push(
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('LessonContentScreen');
      }}
    >
      <Text style={styles.linkText}>{'Skip to the lesson'}</Text>
    </TouchableOpacity>,
  );

  return (
    <View style={styles.mainContainer}>
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
        <View style={styles.messageHolder}>
          {messageElements.map((element, index) => (
            <View
              style={
                index !== messageElements.length - 1
                  ? styles.messageParagraphBottomSpacing
                  : null
              }
            >
              {element}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bubbleContainer: {
    marginTop: 24,
    alignItems: 'center',
  },

  messageText: {
    color: 'white',
    fontSize: 16,
  },
  linkText: {
    color: 'background: rgba(70, 140, 247, 1)',
    fontSize: 16,
  },
  messageParagraphBottomSpacing: {
    marginBottom: 24,
  },
  messageHolder: {
    position: 'absolute',
    width: '70%',
    bottom: 150,
    left: 24,
    backgroundColor: '#121212',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
