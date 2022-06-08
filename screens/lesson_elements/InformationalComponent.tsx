import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {InformationalElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import FeaturedCoverImage from '../../components/FeaturedCoverImage';
import useTextToSpeech from '../../hooks/useTextToSpeech';

type Props = {
  elementProps: InformationalElement;
  elementId: number;
  totalElements: number;
};

export default function InformationalComponent({
  navigation,
  route,
  elementProps,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> & Props) {
  const {imageSources, messages} = elementProps;

  const imageSource = imageSources?.[0] ?? null;

  useTextToSpeech(messages, true);

  return (
    <LessonPrimaryLayout
      elementId={elementId}
      totalElements={totalElements}
      topElement={<FeaturedCoverImage imageSource={imageSource} />}
      navigation={navigation}
      route={route}
    >
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
    </LessonPrimaryLayout>
  );
}

// TODO: Use colors from the theme instead of hardcoding
const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  messageSection: {
    display: 'flex',
    flexGrow: 1,
    margin: 12,
  },
  imageSection: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: 0,
  },
  navigationSection: {
    flexGrow: 0,
    marginBottom: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    // flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 10 + 50,
    height: 22 + 50,
  },
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 10 + 50,
    height: 22 + 50,
  },
  arrow: {
    width: 10,
    height: 22,
  },
  lessonNumber: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
    color: 'white',
  },
  lessonNumberContainer: {flexGrow: 1, textAlign: 'center'},
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
