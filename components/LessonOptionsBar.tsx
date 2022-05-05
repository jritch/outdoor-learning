import * as React from 'react';
import {Image, TouchableOpacity, View, StyleSheet, Text} from 'react-native';

//const closeIcon = require('../assets/images/close-icon.png');
const closeIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/close-icon.png';
const questionMarkUnselectedIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/question-mark.png';
const questionMarkSelectedIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/question-mark-selected.png';

/**
 * To use it as a header or at a fixed position, wrap it in a View with 'absolute' position.
 * <View style={{position: 'absolute', top: 0, width: '100%'}}>
 *    <LessonOptionsBar />
 * </View>
 */
type Props = {
  navigation: any;
  elementId: number;
  displayQuestionAnswerScreen: boolean;
  closeCallback: Function;
};

export default function LessonOptionsBar(props: Props) {
  const closeAction = props.closeCallback;
  const currentElementId = props.elementId;

  function openQAScreen() {
    props.navigation.navigate('QuestionAnswerScreen', {
      elementId: currentElementId,
    });
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.optionsBar}>
        <View style={styles.closeIcon}>
          <TouchableOpacity
            onPress={() => {
              closeAction();
            }}
          >
            <Image source={{uri: closeIcon}} style={{width: 40, height: 40}} />
          </TouchableOpacity>
        </View>
        <View style={styles.questionMarkIcon}>
          <TouchableOpacity
            onPress={() => {
              openQAScreen();
            }}
          >
            <Image
              source={{
                uri: props.displayQuestionAnswerScreen
                  ? questionMarkSelectedIcon
                  : questionMarkUnselectedIcon,
              }}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  closeIcon: {
    marginLeft: 24,
  },
  questionMarkIcon: {
    marginRight: 24,
  },
});
