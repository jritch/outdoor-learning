import * as React from 'react';
import {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {QuizElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import FeaturedCoverImage from '../../components/FeaturedCoverImage';
import QuizAnswerBubble from '../../components/QuizAnswerBubble';
import useTextToSpeech from '../../hooks/useTextToSpeech';

type Props = {
  elementProps: QuizElement;
  elementId: number;
  totalElements: number;
};

type ChatViewPrompt = {
  text: string;
  type: string;
  response?: string;
  isCorrectAnswer?: boolean;
};

export default function QuizElementScreen({
  navigation,
  route,
  elementProps,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> & Props) {
  const {imageSources, messages, possibleAnswers, correctAnswerIndex} =
    elementProps;
  const [chatViewPrompts, setChatViewPrompts] = useState(
    getChatViewPrompts(messages, possibleAnswers, correctAnswerIndex),
  );
  const [disableSelection, setDisableSelection] = useState<boolean>(false);

  const imageSource = imageSources?.[0] ?? null;

  function getChatViewPrompts(
    promptMessages: Array<string>,
    possibleAnswersForPrompts: Array<any>,
    correctAnswerIndexForPrompts: number,
  ): Array<ChatViewPrompt> {
    const chatViewPromptsObjects = [];
    for (let entry of promptMessages) {
      chatViewPromptsObjects.push({type: 'question', text: entry});
    }
    for (let index = 0; index < possibleAnswersForPrompts.length; index++) {
      const chatViewPromptEntry: ChatViewPrompt = {
        type: 'answer',
        text: possibleAnswersForPrompts[index].option,
        response: possibleAnswersForPrompts[index].response,
      };
      if (index === correctAnswerIndexForPrompts) {
        chatViewPromptEntry.isCorrectAnswer = true;
      }
      chatViewPromptsObjects.push(chatViewPromptEntry);
    }
    return chatViewPromptsObjects;
  }

  function answerSelectedCallback(response?: string) {
    if (response) {
      const inCorrectAnswerPrompt = {type: 'question', text: response};
      setChatViewPrompts(oldArray => [...oldArray, inCorrectAnswerPrompt]);
    }
  }

  useTextToSpeech(
    chatViewPrompts.map(cvp => cvp.text),
    true,
  );

  return (
    <LessonPrimaryLayout
      elementId={elementId}
      totalElements={totalElements}
      topElement={<FeaturedCoverImage imageSource={imageSource} />}
      navigation={navigation}
      route={route}
    >
      <ChatScrollViewContainer
        chatElements={chatViewPrompts.map((entry, i) => {
          if (entry.type === 'question') {
            return (
              <ChatBubble
                key={i}
                alignment="left"
                view={<Text style={styles.bubbleText}>{entry.text}</Text>}
                bubbleColor={'rgba(38, 38, 39, 1)'}
                backgroundColor={'#121212'}
              />
            );
          } else {
            return (
              <QuizAnswerBubble
                key={i}
                text={entry.text}
                onSelect={() => {
                  answerSelectedCallback(entry.response);
                  setDisableSelection(true);
                }}
                disabled={disableSelection}
              />
            );
          }
        })}
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
