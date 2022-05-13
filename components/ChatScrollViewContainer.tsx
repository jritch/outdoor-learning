import * as React from 'react';
import {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import TextVoiceInput from '../components/TextVoiceInput';
import ChatBubble from '../components/ChatBubble';
import findAnswer from '../components/questionAnswerModelInference';
import LessonOptionsBar from '../components/LessonOptionsBar';
import {RootStackParamList} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatBubbleObject} from '../types';

type Props = {
  chatElements: Array<JSX.Element>;
};

export default function ChatScrollViewContainer({
  chatElements,
}: Props): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <ScrollView
      style={styles.scrollView}
      ref={scrollViewRef}
      onContentSizeChange={() => {
        if (chatElements.length > 1) {
          scrollViewRef?.current?.scrollToEnd({animated: true});
        }
      }}
    >
      <View style={styles.scrollContents}>
        {chatElements.map((element, index) => (
          <View style={styles.bubbleWrapperBottomMargin} key={index}>
            {element}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  scrollContents: {
    marginTop: 16,
    marginHorizontal: 24,
  },
  bubbleWrapperBottomMargin: {
    marginBottom: 16,
  },
});
