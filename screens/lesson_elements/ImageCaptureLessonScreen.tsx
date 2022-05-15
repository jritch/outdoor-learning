import * as React from 'react';
import {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ImageCaptureElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import FeaturedCoverImage from '../../components/FeaturedCoverImage';
import TextVoiceInput from '../../components/TextVoiceInput';
import {
  Camera,
  CameraFacing,
  Image as PTLImage,
  ImageUtil,
} from 'react-native-pytorch-core';

type Props = {
  elementProps: ImageCaptureElement;
  elementId: number;
  totalElements: number;
};

export default function ImageCaptureLessonScreen({
  navigation,
  route,
  elementProps,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> &
  Props): JSX.Element {
  const [imageCaptured, setImageCaptured] = useState<Boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(true);
  const {imageSources, messages, afterCaptureMessages} = elementProps;
  const [imageFilePath, setImageFilePath] = useState<string>('');

  const imageSource = imageSources?.[0] ?? null;

  const cameraRef = React.useRef<Camera>(null);

  const messagesToDisplay = imageCaptured ? afterCaptureMessages : messages;

  async function handleCapture(image: PTLImage) {
    // TODO: Save captured image before releasing it.
    console.log('Picture taken!', image);
    setImageFilePath(await ImageUtil.toFile(image));
    console.log(imageFilePath);
    image.release();
    setImageCaptured(true);
  }

  function handleTakePicture() {
    const camera = cameraRef.current;
    if (camera != null) {
      camera.takePicture();
      console.log('Picture taken');
      // TODO: Remove this. Android emulator doesn't support the camera, so we need another way to advance
      setImageCaptured(true);
      setShowNavigation(false);
    }
  }

  function onSaveCallback() {
    // Navigate to the next screen
  }

  const topElement = imageCaptured ? (
    <FeaturedCoverImage imageSource={imageSource} />
  ) : (
    <Camera
      ref={cameraRef}
      onCapture={handleCapture}
      hideCaptureButton={true}
      hideFlipButton={true}
      style={StyleSheet.absoluteFill}
      targetResolution={{width: 480, height: 640}}
    />
  );

  const notesView = (
    <View style={{flex: 1, marginTop: 20}}>
      <TextVoiceInput
        placeHolderText="Ask a question"
        onSubmit={() => {}}
        onSave={onSaveCallback}
        isSaveEnabled={true}
        targetImage={imageFilePath}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
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
        showNavigation={showNavigation}
      >
        <ChatScrollViewContainer
          chatElements={messagesToDisplay.map((message, i) => (
            <ChatBubble
              key={i}
              alignment="left"
              view={<Text style={styles.bubbleText}>{message}</Text>}
              bubbleColor={'rgba(38, 38, 39, 1)'}
              backgroundColor={'#121212'}
            />
          ))}
        />
        {imageCaptured ? notesView : null}
      </LessonPrimaryLayout>
    </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
