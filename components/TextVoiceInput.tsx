import * as React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Platform,
  Pressable,
} from 'react-native';
import {useEffect, useState} from 'react';
import {AudioUtil} from 'react-native-pytorch-core';
import RecordingMicrophone from './RecordingMicrophone';
import transcribe from './speechTranslation';

// Globals for audio recording timer
var stopTimer: boolean = false;
var timerStartedTimestamp: number = Date.now();

type Props = {
  placeHolderText: string;
  onSubmit: Function;
};

export default function TextVoiceInput(props: Props) {
  // Constants
  const defaultTimerText = '00:00:00';
  const defaultPlaceHolderText = props.placeHolderText;
  const defaultPlaceHolderTextColor = 'rgba(235, 235, 245, 0.6)';
  const recordingPlaceHolderTextColor = 'rgba(222, 52, 18, 1);';
  const recordingPlaceHolderText = 'Listening...';
  const transcribingPlaceHolderText = 'Translating...';
  const recordButtonImageSource =
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/recordButton.png';

  const [showRecordingView, setShowRecordingView] = useState<boolean>(false);
  const [isAudioRecording, setIsAudioRecording] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [placeHolderText, setPlaceHolderText] = useState(
    defaultPlaceHolderText,
  );
  const [placeHolderTextColor, setPlaceHolderTextColor] = useState(
    defaultPlaceHolderTextColor,
  );
  const [timerText, setTimerText] = useState(defaultTimerText);

  const onSubmitCallback = props.onSubmit;

  /**
   * Add this part when the component is used with a screen which uses navigation to
   * avoid keeping the mic recording audio even if the screen is not in focus.
   *
   * const isFocused = useIsFocused();
   * useEffect(() => {
   *    return () => {
   *        AudioUtil.isRecording().then(isRecording => {
   *            if (isRecording) {
   *                // Make sure we stop the current recording before we navigate
   *                console.log('Finishing ongoing recording..');
   *                AudioUtil.stopRecord();
   *            }
   *        });
   *    };
   * }, [isFocused]);
   */

  async function stopAudioRecording() {
    const audio = await AudioUtil.stopRecord();
    setIsAudioRecording(false);
    closeAudioRecordingView();
    if (audio) {
      setTextInputValue(transcribingPlaceHolderText);
      const result = await transcribe(audio);
      setTextInputValue(textInputValue + result.text);
    }
    setTimerText(defaultTimerText);
  }

  function startAudioRecording() {
    openAudioRecordingView();
    AudioUtil.startRecord();
    setIsAudioRecording(true);
  }

  function openAudioRecordingView() {
    stopTimer = false;
    changePlaceHolderStyle(
      recordingPlaceHolderText,
      recordingPlaceHolderTextColor,
    );
    setShowRecordingView(true);
    timerStartedTimestamp = Date.now();
    startRecordingTimer();
  }

  function changePlaceHolderStyle(
    placeHolderText: string,
    placeHolderTextColor: string,
  ) {
    setPlaceHolderText(placeHolderText);
    setPlaceHolderTextColor(placeHolderTextColor);
  }

  function closeAudioRecordingView() {
    stopTimer = true;
    setShowRecordingView(false);
    changePlaceHolderStyle(defaultPlaceHolderText, defaultPlaceHolderTextColor);
  }

  function updateTimerText() {
    const msElapsed = Date.now() - timerStartedTimestamp;
    const secs = Math.floor(msElapsed / 1000);
    const mins = Math.floor(secs / 60);
    const hrs = Math.floor(mins / 60);

    setTimerText(
      padZero(hrs) + ':' + padZero(mins % 60) + ':' + padZero(secs % 60),
    );
  }

  function padZero(val: number) {
    return val % 60 < 10 ? '0' + (val % 60) : val % 60;
  }

  function startRecordingTimer() {
    setTimeout(
      function () {
        if (!stopTimer) {
          startRecordingTimer();
        }
        updateTimerText();
        // @ts-ignore TODO: revisit need for .bind(this)
      }.bind(this),
      1000,
    );
  }

  function submitInput() {
    Keyboard.dismiss();
    if (onSubmitCallback) {
      onSubmitCallback(textInputValue);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginLeft: 24,
          marginRight: 24,
          bottom: showRecordingView ? 250 : 60,
        }}
      >
        <TextInput
          style={{
            width: '100%',
            borderRadius: 18,
            backgroundColor: '#262627',
            fontSize: 17,
            paddingLeft: 19,
            paddingRight: 45,
            paddingTop: Platform.OS === 'ios' ? 12 : 7,
            paddingBottom: 10,
            color: '#EBEBF5',
            maxHeight: 100,
            minHeight: 45,
          }}
          value={textInputValue}
          onChangeText={text => {
            setTextInputValue(text);
          }}
          placeholder={placeHolderText}
          placeholderTextColor={placeHolderTextColor}
          multiline={true}
          keyboardType="default"
          blurOnSubmit={true}
          onSubmitEditing={submitInput}
        />
        <View style={{alignItems: 'flex-end'}}>
          <Pressable
            style={{height: 50, width: 40, bottom: 35}}
            onPress={
              isAudioRecording ? stopAudioRecording : startAudioRecording
            }
          >
            <View style={{flex: 1}}>
              <RecordingMicrophone isActive={isAudioRecording} />
            </View>
          </Pressable>
        </View>
      </View>
      <View>
        {showRecordingView && (
          <View style={styles.recordingView}>
            <Text style={styles.timer}>{timerText}</Text>
            <Pressable
              style={{flex: 1}}
              onPress={() => {
                stopAudioRecording();
              }}
            >
              <Image
                style={styles.recordingImage}
                source={{uri: recordButtonImageSource}}
              />
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  recordingView: {
    backgroundColor: 'rgba(38, 38, 39, 1)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: 280,
    alignItems: 'center',
  },
  timer: {
    top: 69,
    color: 'rgba(235, 235, 245, 0.6)',
    fontWeight: 'bold',
    fontSize: 36,
  },
  recordingImage: {
    top: 90,
    width: 56,
    height: 56,
  },
});
