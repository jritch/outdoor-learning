import * as React from 'react';
import {useCallback, useState, useEffect} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ImageReference, Messages} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import FeaturedCoverImage from '../../components/FeaturedCoverImage';
import TextVoiceInput from '../../components/TextVoiceInput';
import useTextToSpeech from '../../hooks/useTextToSpeech';

type Props = {
  messages: Messages;
  imageSource: ImageReference;
  onComplete: () => void;
  elementId: number;
  totalElements: number;
};

export default function NoteTakingLessonComponent({
  navigation,
  route,
  messages,
  imageSource,
  onComplete,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> &
  Props): JSX.Element {
  const DEFAULT_TEXT_VOICE_INPUT_BOTTOM = 45;
  const DEFAULT_AVAILABLE_WINDOW_HEIGHT_THRESHOLD = 510;

  const [showChatArea, setShowChatArea] = useState<boolean>(true);
  const [textVoiceInputBottom, setTextVoiceInputBottom] = useState<number>(
    DEFAULT_TEXT_VOICE_INPUT_BOTTOM,
  );

  // The array of messages passed to this hook should never change, except by appending new messages to read.
  // So after image capture we still need to provide the original messages array to the hook.
  useTextToSpeech(messages, true);

  const onKeyboardDidShow = useCallback((e: KeyboardEvent) => {
    setShowChatArea(false);
    const availableWindowHeight =
      Dimensions.get('window').height - e.endCoordinates.height;
    if (availableWindowHeight > DEFAULT_AVAILABLE_WINDOW_HEIGHT_THRESHOLD) {
      setTextVoiceInputBottom(0);
    }
  }, []);

  const onKeyboardDidHide = useCallback(() => {
    const availableWindowHeight = Dimensions.get('window').height;
    setTextVoiceInputBottom(DEFAULT_TEXT_VOICE_INPUT_BOTTOM);
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [onKeyboardDidHide, onKeyboardDidShow]);

  const notesView = (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        height: 350,
        bottom: 0,
      }}
    >
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: textVoiceInputBottom,
        }}
      >
        <TextVoiceInput
          placeHolderText="Add notes"
          onSubmit={() => {}}
          onSave={onComplete}
          isSaveEnabled={true}
          targetImage={
            typeof imageSource === 'object' && 'uri' in imageSource
              ? imageSource.uri ?? null
              : null
          }
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LessonPrimaryLayout
        elementId={elementId}
        totalElements={totalElements}
        topElement={<FeaturedCoverImage imageSource={imageSource} />}
        navigation={navigation}
        route={route}
        showNavigation={false}
      >
        {showChatArea && (
          <ChatScrollViewContainer
            chatElements={messages.map((message, i) => (
              <ChatBubble
                key={i}
                alignment="left"
                view={<Text style={styles.bubbleText}>{message}</Text>}
                bubbleColor={'rgba(38, 38, 39, 1)'}
                backgroundColor={'#121212'}
              />
            ))}
          />
        )}
        {notesView}
      </LessonPrimaryLayout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
