import * as React from 'react';
import {useCallback, useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {NoteTakingElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import FeaturedCoverImage from '../../components/FeaturedCoverImage';
import TextVoiceInput from '../../components/TextVoiceInput';
import {Camera} from 'expo-camera';
import {navigationDelay} from '../../constants/navigationDelay';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import NoteTakingLessonComponent from './NoteTakingLessonComponent';

type Props = {
  elementProps: NoteTakingElement;
  elementId: number;
  totalElements: number;
};

export default function NoteTakingLessonScreen({
  navigation,
  route,
  elementProps,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> &
  Props): JSX.Element {
  const {messages, imageSources} = elementProps;
  const imageSource = imageSources?.[0];

  if (imageSource == null) {
    throw new Error(
      'At least one image must be provided to NoteTakingLessonScreen',
    );
  }

  const onComplete = useCallback(() => {
    if (elementId < totalElements - 1) {
      navigation.navigate('LessonContentScreen', {elementId: elementId + 1});
    }
    // TODO: What should happen when the user completes the lesson?
  }, [elementId, navigation, totalElements]);

  return (
    <NoteTakingLessonComponent
      messages={messages}
      imageSource={imageSource}
      onComplete={onComplete}
      navigation={navigation}
      route={route}
      elementId={elementId}
      totalElements={totalElements}
    />
  );
}
