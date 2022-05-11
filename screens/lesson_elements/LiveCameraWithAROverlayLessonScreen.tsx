import * as React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {LiveCameraWithAROverlay} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import {
  Camera,
  CameraFacing,
  Image as PTLImage,
} from 'react-native-pytorch-core';
import {useState, useCallback} from 'react';
import debounce from 'lodash.debounce';

type Props = {
  elementProps: LiveCameraWithAROverlay;
  elementId: number;
  totalElements: number;
};

const DEBOUNCE_WAIT = 1000;
const DEBOUNCE_MAX_WAIT = 1000;

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

  const handleImage = useCallback(async function handleImage(image: PTLImage) {
    // Clear out the
    setImageClass(null);
    // TODO: Save captured image before releasing it.
    console.log('Picture taken!', image);
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
    <Camera
      ref={cameraRef}
      onCapture={handleImage}
      hideCaptureButton={true}
      hideFlipButton={true}
      style={StyleSheet.absoluteFill}
      targetResolution={{width: 480, height: 640}}
    />
  );

  return (
    <LessonPrimaryLayout
      elementId={elementId}
      totalElements={totalElements}
      topElement={topElement}
      bottomElement={
        imageCaptured ? undefined : (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePicture}
          >
            <Image
              source={require('assets/TakePhoto3x.png')}
              style={styles.captureButtonImage}
            />
          </TouchableOpacity>
        )
      }
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
  captureButton: {},
  captureButtonImage: {width: 60, height: 60},
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
