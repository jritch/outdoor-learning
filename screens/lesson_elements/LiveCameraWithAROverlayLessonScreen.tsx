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

  const onFrame = useCallback(async function handleImage(image: PTLImage) {
    // setImageClass(null);
    try {
      const result = await classifyImage(image);
      console.log('Image classification result:', result);
      setImageClass(result);
      image.release();
    } catch (error) {
      console.log(error);
    }
    image.release();
    setImageCaptured(true);
  }, []);

  // const handleImageDebounced = useCallback(
  //   debounce(handleImage, DEBOUNCE_WAIT, {maxWait: DEBOUNCE_MAX_WAIT}),
  //   [handleImage],
  // );

  function handleTakePicture() {
    const camera = cameraRef.current;
    if (camera != null) {
      camera.takePicture();
      // TODO: Remove this. Android emulator doesn't support the camera, so we need another way to advance
      setImageCaptured(true);
    }
  }

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
      <Image
        source={require('assets/images/fire-gif-2-GettyImages-906030022-cropped-compressed.gif')}
        style={[StyleSheet.absoluteFill, styles.flameGif]}
        opacity={0.5}
      />
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
    // zIndex: 10000000,
    height: '100%',
    width: '100%',
  },
  captureButton: {},
  captureButtonImage: {width: 60, height: 60},
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
