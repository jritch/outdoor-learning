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

const eucalyptusInformation = require('../assets/content/eucalyptus_information.json');

enum ChatBubbleType {
  REPLY = 'reply',
  QUESTION = 'question',
}

export default function QuestionAnswerScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'QuestionAnswerScreen'>) {
  const startPromptText = 'Type your question or ask through voice.';
  const [data, setData] = useState([
    {text: startPromptText, type: ChatBubbleType.REPLY},
  ]);
  const textBlurb = eucalyptusInformation.content;
  const scrollViewRef = useRef<ScrollView>(null);

  async function submitQuestion(question: string) {
    if (question) {
      setData(oldArray => [
        ...oldArray,
        {text: question, type: ChatBubbleType.QUESTION},
      ]);
      await getAnswer(question);
    }
  }

  async function getAnswer(question: string) {
    const result = await findAnswer(textBlurb, question);
    setData(oldArray => [
      ...oldArray,
      {text: result.text, type: ChatBubbleType.REPLY},
    ]);
  }

  function getChatBubbleForAnswer(answer: string, index: number) {
    const text = answer
      ? answer
      : "Sorry, I don't know the answer to that question";
    const textView = <Text style={styles.bubbleText}>{text}</Text>;
    return (
      <View style={styles.answer} key={index}>
        <ChatBubble
          alignment={'left'}
          view={textView}
          bubbleColor={'rgba(38, 38, 39, 1)'}
          backgroundColor={'#121212'}
        />
      </View>
    );
  }

  function getChatBubbleForQuestion(question: string, index: number) {
    const textView = <Text style={styles.bubbleText}>{question}</Text>;
    return (
      <View style={styles.question} key={index}>
        <ChatBubble
          alignment={'right'}
          view={textView}
          bubbleColor={'#468CF7'}
          backgroundColor={'#121212'}
        />
      </View>
    );
  }

  function renderChatBubble(item: ChatBubbleObject, index: number) {
    const {type, text} = item;
    if (type === ChatBubbleType.REPLY) {
      return getChatBubbleForAnswer(text, index);
    }
    return getChatBubbleForQuestion(text, index);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'height'}
      keyboardVerticalOffset={90}
    >
      <View style={{width: '100%', height: '70%', marginTop: 104}}>
        <ScrollView
          style={styles.scrollView}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({animated: true})
          }
        >
          {data.map((item, index) => renderChatBubble(item, index))}
        </ScrollView>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <TextVoiceInput
          placeHolderText="Ask a question"
          onSubmit={(text: string) => submitQuestion(text)}
          isSaveEnabled={false}
          targetImage={null}
        />
      </View>
      <View style={styles.optionsBarArea}>
        <LessonOptionsBar
          displayQuestionAnswerScreen={true}
          onClose={() => navigation.navigate('LessonTabNavigator')}
          onQuestionMark={() => navigation.goBack()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    backgroundColor: '#121212',
  },
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 19,
    marginTop: 25,
  },
  answer: {
    flexDirection: 'row',
    marginLeft: 19,
    marginTop: 25,
  },
  optionsBarArea: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 70,
  },
});
