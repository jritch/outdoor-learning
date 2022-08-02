import * as React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {LiveCameraWithAROverlayElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';
import LessonPrimaryLayout from '../../components/LessonPrimaryLayout';
import ChatScrollViewContainer from '../../components/ChatScrollViewContainer';
import {Camera, Image as PTLImage} from 'react-native-pytorch-core';
import {useState, useMemo} from 'react';
import classifyImage from '../../components/ImageClassifier';
import throttle from 'lodash.throttle';
import useTextToSpeech from '../../hooks/useTextToSpeech';

const flameGif = require('../../assets/images/fire-gif-2-GettyImages-906030022-cropped-compressed.gif');

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
  const {messages} = elementProps;

  const cameraRef = React.useRef<Camera>(null);

  useTextToSpeech(messages, true);

  const onFrameThrottled = useMemo(() => {
    const onFrame = async (image: PTLImage | null) => {
      frameRate.push(performance.now());
      frameRate = frameRate.slice(-20);
      if (frameRate.length > 2) {
        console.log(
          'Framerate:',
          (frameRate.length /
            (frameRate[frameRate.length - 1] - frameRate[0])) *
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
      } catch (error) {
        console.error(error);
      } finally {
        if (image != null) {
          image.release();
        }
      }
    };

    return throttle(onFrame, 250);
  }, []);

  const topElement = (
    <>
      <Camera
        ref={cameraRef}
        onFrame={onFrameThrottled}
        hideCaptureButton={true}
        hideFlipButton={true}
        style={StyleSheet.absoluteFill}
        targetResolution={{width: 480, height: 640}}
      />
      {imageClass != null && imageClass.indexOf('eucalyptus') !== -1 && (
        <Image
          source={flameGif}
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
