import * as React from 'react';
import { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import TextVoiceInput from '../components/TextVoiceInput';
import ChatBubble from '../components/ChatBubble';
import findAnswer from '../components/questionAnswerModelInference';

export default function QuestionAnswerScreen() {

  const chatBubbles: Array<any> = [];
  const [data, setData] = useState(chatBubbles);
  const textBlurb = "Eucalyptus trees can grow upto 33 meters in height. Eucalyptus trees are originally found in Australia and the islands surrounding it. Famously, these trees are home to some animals like koalas in Australia. The diet of koalas consists almost solely of eucalyptus leaves! You might also notice that eucalyptus has a distinctive bark pattern. You’ll notice that there’s a huge concentration of eucalyptus trees in California specifically.";


  async function submitQuestion(question: string) {
    if (question) {
      const chatBubble = getChatBubbleForQuestion(question);
      setData(oldArray => [...oldArray, chatBubble]);
      await getAnswer(question);
    }
  }

  async function getAnswer(question: string) {
    const result = await findAnswer(textBlurb, question);
    console.log(result);
    const chatBubble = getChatBubbleForAnswer(result.text);
    setData(oldArray => [...oldArray, chatBubble]);
  }

  function getChatBubbleForAnswer(answer: string) {
    const text = answer ? answer : "Sorry, I don't know the answer to that question";
    const textView = (
      <Text style={styles.bubbleText}>{text}</Text>
    )
    return (
      <View style={styles.answer}>
        <ChatBubble alignment={'left'} view={textView} bubbleColor={'rgba(38, 38, 39, 1)'} backgroundColor={'#121212'}/>
      </View>
    );
  }

  function getChatBubbleForQuestion(question: string) {
    const textView = (
      <Text style={styles.bubbleText}>{question}</Text>
    )
    return (
      <View style={styles.question}>
        <ChatBubble alignment={'right'} view={textView} bubbleColor={'#468CF7'} backgroundColor={'#121212'}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '65%'}}>
        <ScrollView style={styles.scrollView}>
          {data}
        </ScrollView>
      </View>
      <TextVoiceInput placeHolderText="Ask a question" onSubmit={(text: string) => submitQuestion(text)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 25
  },
  answer: {
    flexDirection: 'row',
    marginLeft: 19,
    marginTop: 25
  }
});
