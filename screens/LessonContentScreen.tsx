import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EucalyptusLesson} from '../lesson_content/EucalyptusLesson';
import InformationalComponent from './lesson_elements/InformationalComponent';

export default function LessonContentScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'>) {
  const elementId = route.params?.elementId ?? 0;
  const totalElements = EucalyptusLesson.elements.length;

  const element = EucalyptusLesson.elements[elementId];

  let reactElement = null;

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

  return <View style={styles.mainContainer}>{reactElement}</View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headingText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headingSection: {
    marginLeft: 24,
    marginRight: 24,
  },
  startButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 24,
    marginRight: 24,
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 84,
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSection: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});
