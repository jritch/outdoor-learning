import * as React from 'react';
import {Image, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import CloseButton from './CloseButton';

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
  displayQuestionAnswerScreen: boolean;
  onClose: () => void;
  onQuestionMark: () => void;
};

export default function LessonOptionsBar({
  onClose,
  displayQuestionAnswerScreen,
  onQuestionMark,
}: Props) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.optionsBar}>
        <View style={styles.closeIcon}>
          <CloseButton onClick={onClose} />
        </View>
        <View style={styles.questionMarkIcon}>
          <TouchableOpacity onPress={onQuestionMark}>
            <Image
              source={{
                uri: displayQuestionAnswerScreen
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
    marginTop: 40,
  },
  closeIcon: {
    marginLeft: 24,
  },
  questionMarkIcon: {
    marginRight: 24,
  },
});
