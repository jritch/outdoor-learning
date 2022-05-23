import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EucalyptusLesson} from '../lesson_content/EucalyptusLesson';
import InformationalComponent from './lesson_elements/InformationalComponent';
import ImageCaptureLessonScreen from './lesson_elements/ImageCaptureLessonScreen';
import LiveCameraWithAROverlayLessonScreen from './lesson_elements/LiveCameraWithAROverlayLessonScreen';
import QuizElementScreen from './lesson_elements/QuizElementScreen';

export default function LessonContentScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'>) {
  const elementId = route.params?.elementId ?? 0;
  const totalElements = EucalyptusLesson.elements.length;

  const element = EucalyptusLesson.elements[elementId];

  let reactElement = (
    <View style={styles.unableToRenderContainer}>
      <View>
        <Text
          style={styles.unableToRenderMessage}
        >{`Unable to render lesson content: No component for ${element.__type}`}</Text>
      </View>
    </View>
  );

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
  if (element.__type === 'ImageCaptureElement') {
    reactElement = (
      <ImageCaptureLessonScreen
        {...{navigation, route}}
        elementProps={element}
        elementId={elementId}
        totalElements={totalElements}
      />
    );
  }
  if (element.__type === 'LiveCameraWithAROverlayElement') {
    reactElement = (
      <LiveCameraWithAROverlayLessonScreen
        {...{navigation, route}}
        elementProps={element}
        elementId={elementId}
        totalElements={totalElements}
      />
    );
  }
  if (element.__type === 'QuizElement') {
    reactElement = (
      <QuizElementScreen
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
  unableToRenderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  unableToRenderMessage: {
    fontSize: 24,
    color: 'white',
  },
  mainContainer: {
    flex: 1,
  },
});
