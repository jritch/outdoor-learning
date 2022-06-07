import * as React from 'react';
import {useState, useEffect} from 'react';
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
import type {Messages} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import {Camera} from 'expo-camera';
import useTextToSpeech from '../../hooks/useTextToSpeech';

type Props = {
  messages: Messages;
  elementId: number;
  totalElements: number;
  onImageFilePath: (imageFilePath: string) => void;
};

export default function ImageCaptureLessonComponent({
  navigation,
  route,
  messages,
  elementId,
  totalElements,
  onImageFilePath,
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
  const [imageCaptureStarted, setImageCaptureStarted] =
    useState<boolean>(false);

  const cameraRef = React.useRef<Camera>(null);

  // The array of messages passed to this hook should never change, except by appending new messages to read.
  // So after image capture we still need to provide the original messages array to the hook.
  useTextToSpeech(messages, true);

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
      onImageFilePath(newFilePath);
    } catch (error) {
      console.error('Error when attempting to save image', error);
    }
  }

  let topElement = (
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
      <View style={styles.spinnerContainer}>
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  }

  if (hasPermission === false) {
    topElement = <Text>No access to camera</Text>;
  }

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
            <ActivityIndicator size="large" color="#FFF" />
          ) : (
            <TouchableOpacity
              onPress={handleTakePicture}
              disabled={!cameraReady}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
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
