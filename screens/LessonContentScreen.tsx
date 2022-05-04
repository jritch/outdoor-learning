import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EucalyptusLesson} from '../lesson_content/EucalyptusLesson';
import InformationalComponent from './lesson_elements/InformationalComponent';
import LessonOptionsBar from '../components/LessonOptionsBar';

export default function LessonContentScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'>) {
  const elementId = route.params?.elementId ?? 0;
  const totalElements = EucalyptusLesson.elements.length;

  const element = EucalyptusLesson.elements[elementId];

  let reactElement = null;
  let optionsBar = null;

  if (element.__type === 'InformationalElement') {
    reactElement = (
      <InformationalComponent
        {...{navigation, route}}
        elementProps={element}
        elementId={elementId}
        totalElements={totalElements}
      />
    );
  }

  if (element.__type === 'InformationalElement') {
    optionsBar = (
      <View style={styles.optionsBarArea}>
        <LessonOptionsBar />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {reactElement}
      {optionsBar}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  optionsBarArea: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
});
