import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ImageCaptureElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import FeaturedCoverImage from '../../components/FeaturedCoverImage';
import TextVoiceInput from '../../components/TextVoiceInput';
import {Camera} from 'expo-camera';
import {navigationDelay} from '../../constants/navigationDelay';

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
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const [imageCaptured, setImageCaptured] = useState<Boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(true);
  const {messages, afterCaptureMessages} = elementProps;
  const [imageFilePath, setImageFilePath] = useState<string | null>(null);
  const [imageCaptureStarted, setImageCaptureStarted] =
    useState<boolean>(false);
  const navigationDelayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cameraRef = React.useRef<Camera>(null);

  const messagesToDisplay = imageCaptured ? afterCaptureMessages : messages;

  useEffect(() => {
    return () => {
      if (navigationDelayTimerRef.current) {
        clearTimeout(navigationDelayTimerRef.current);
      }
    };
  }, []);

  async function handleTakePicture() {
    setImageCaptureStarted(true);
    const camera = cameraRef.current;
    if (camera == null) {
      console.error('Camera is nullish when trying to take a picture');
      return;
    }
    const pictureObj = await camera.takePictureAsync();

    console.log('Picture taken!', pictureObj);
    setImageCaptured(true);
    setShowNavigation(false);

    try {
      console.log('Saving temporary file to permanent location');
      const newFilePath = `${
        FileSystem?.documentDirectory ?? ''
      }/${new Date().toJSON()}-image.jpg`;
      FileSystem.copyAsync({
        from: pictureObj.uri,
        to: newFilePath,
      });
      setImageFilePath(newFilePath);
    } catch (error) {
      console.error('Error when attempting to save image', error);
    }
  }

  function onSaveCallback() {
    navigationDelayTimerRef.current = setTimeout(() => {
      if (elementId < totalElements - 1) {
        navigation.navigate('LessonContentScreen', {elementId: elementId + 1});
      }
    }, navigationDelay);
  }

  let topElement = imageCaptured ? (
    imageFilePath != null && (
      <FeaturedCoverImage imageSource={{uri: imageFilePath}} />
    )
  ) : (
    <View style={styles.cameraContainer}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={'back'}
        onCameraReady={() => setCameraReady(true)}
      />
    </View>
  );

  if (hasPermission === null) {
    topElement = (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  if (hasPermission === false) {
    topElement = <Text>No access to camera</Text>;
  }

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LessonPrimaryLayout
        elementId={elementId}
        totalElements={totalElements}
        topElement={topElement}
        bottomElement={
          imageCaptured ? undefined : imageCaptureStarted ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity onPress={handleTakePicture}>
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
  cameraContainer: {
    // flex: 1,
    height: '100%',
    width: '100%',
    // backgroundColor: 'red',
  },
  camera: {flex: 1},
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
