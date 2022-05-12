import * as React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {LiveCameraWithAROverlayElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import {
  Camera,
  CameraFacing,
  Image as PTLImage,
} from 'react-native-pytorch-core';
import {useState, useCallback} from 'react';
import classifyImage from '../../components/ImageClassifier';

type Props = {
  elementProps: LiveCameraWithAROverlayElement;
  elementId: number;
  totalElements: number;
};

let frameRate: Array<number> = [];

export default function LiveCameraWithAROverlayLessonScreen({
  navigation,
  route,
  elementProps,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> &
  Props): JSX.Element {
  const [imageClass, setImageClass] = useState<string | null>(null);
  const [imageCaptured, setImageCaptured] = useState(false);
  const {messages} = elementProps;

  const cameraRef = React.useRef<Camera>(null);

  const onFrame = useCallback(async function handleImage(
    image: PTLImage | null,
  ) {
    frameRate.push(performance.now());
    frameRate = frameRate.slice(-20);
    if (frameRate.length > 2) {
      console.log(
        'Framerate:',
        (frameRate.length / (frameRate[frameRate.length - 1] - frameRate[0])) *
          1000,
      );
    }

    if (image == null) {
      console.warn('Image returned from PTL camera is null');
      return;
    }
    try {
      const result = await classifyImage(image);
      console.log('Image classification result:', result);

      setImageClass(result);
      image.release();
    } catch (error) {
      console.log(error);
    }
    // This doesn't seem to have an effect when used in an emulator
    image.release();
    // console.time('[LiveCameraWithAROverlayLessonScreen] onFrame');
    // setImageCaptured(true);
  },
  []);

  const topElement = (
    <>
      <Camera
        ref={cameraRef}
        onFrame={onFrame}
        hideCaptureButton={true}
        hideFlipButton={true}
        style={StyleSheet.absoluteFill}
        targetResolution={{width: 480, height: 640}}
      />
      {imageClass?.indexOf('eucalyptus') !== -1 && (
        <Image
          source={require('assets/images/fire-gif-2-GettyImages-906030022-cropped-compressed.gif')}
          style={[StyleSheet.absoluteFill, styles.flameGif]}
        />
      )}
    </>
  );

  return (
    <LessonPrimaryLayout
      elementId={elementId}
      totalElements={totalElements}
      topElement={topElement}
      navigation={navigation}
      route={route}
    >
      <ChatScrollViewContainer
        chatElements={messages.map((message, i) => (
          <ChatBubble
            key={i}
            alignment="left"
            view={<Text style={styles.bubbleText}>{message}</Text>}
            bubbleColor={'rgba(38, 38, 39, 1)'}
            backgroundColor={'#121212'}
          />
        ))}
      />
    </LessonPrimaryLayout>
  );
}

// TODO: Use colors from the theme instead of hardcoding
const styles = StyleSheet.create({
  arContainer: {
    position: 'relative',
  },
  flameGif: {
    height: '100%',
    width: '100%',
    opacity: 0.5,
  },
  captureButton: {},
  captureButtonImage: {width: 60, height: 60},
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
