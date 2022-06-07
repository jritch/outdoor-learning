import * as React from 'react';
import {useState} from 'react';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ImageCaptureElement} from '../../lesson_content/lessonTypes';
import ImageCaptureLessonComponent from './ImageCaptureLessonComponent';
import NoteTakingLessonComponent from './NoteTakingLessonComponent';

type Props = {
  elementProps: ImageCaptureElement;
  elementId: number;
  totalElements: number;
};

export default function ImageCaptureAndNoteTakingLessonScreen({
  navigation,
  route,
  elementProps,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> &
  Props): JSX.Element {
  const {messages, afterCaptureMessages} = elementProps;
  const [imageFilePath, setImageFilePath] = useState<string | null>(null);

  function onSaveCallback() {
    if (elementId < totalElements - 1) {
      navigation.navigate('LessonContentScreen', {elementId: elementId + 1});
    }
  }

  if (imageFilePath != null) {
    return (
      <NoteTakingLessonComponent
        messages={afterCaptureMessages}
        imageSource={{uri: imageFilePath ?? undefined}}
        onComplete={onSaveCallback}
        navigation={navigation}
        route={route}
        elementId={elementId}
        totalElements={totalElements}
      />
    );
  }

  return (
    <ImageCaptureLessonComponent
      onImageFilePath={setImageFilePath}
      navigation={navigation}
      route={route}
      elementId={elementId}
      totalElements={totalElements}
      messages={messages}
    />
  );
}
