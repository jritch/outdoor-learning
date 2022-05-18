import * as React from 'react';
import {
  Image,
  Keyboard,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Text,
  Platform,
  Pressable,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Audio, AudioUtil} from 'react-native-pytorch-core';
import RecordingMicrophone from './RecordingMicrophone';
import transcribe from './speechTranslation';
import JournalUtil from './Journal';
import {useIsFocused} from '@react-navigation/native';

// Globals for audio recording timer
var stopTimer: boolean = false;
var timerStartedTimestamp: number = Date.now();

type Props = {
  placeHolderText: string; // Text input place holder text
  onSubmit?: Function; // Callback when input is submitted from the keyboard
  onSave?: Function; // Callback when save function completes
  isSaveEnabled: boolean; // To display a 'Save' button to save notes to the File system
  targetImage: string | null; // The image for which notes are taken
};

/**
 * Sample usage with KeyboardAvoidingView:
 * NOTE: Set the keyboardVerticalOffset to an appropriate value to ensure that the text input is placed above the keyboard.
 *
 * <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={110}>
     <View style={styles.startButton} />
     <TextVoiceInput placeHolderText={'Add notes'} onSubmit={() => {}} />
   </KeyboardAvoidingView>
 */

export default function TextVoiceInput(props: Props) {
  // Props
  const onSubmitCallback = props.onSubmit;
  const isSaveEnabled = props.isSaveEnabled;

  // Constants
  const defaultTimerText = '00:00:00';
  const defaultPlaceHolderText = props.placeHolderText;
  const defaultPlaceHolderTextColor = 'rgba(235, 235, 245, 0.6)';
  const recordingPlaceHolderTextColor = 'rgba(222, 52, 18, 1);';
  const recordingPlaceHolderText = 'Listening...';
  const transcribingPlaceHolderText = 'Translating...';
  const recordButtonImageSource =
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/recordButton.png';

  // State variables
  const [showRecordingView, setShowRecordingView] = useState<boolean>(false);
  const [showSaveNotesView, setShowSaveNotesView] = useState<boolean>(false);
  const [isAudioRecording, setIsAudioRecording] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [placeHolderText, setPlaceHolderText] = useState(
    defaultPlaceHolderText,
  );
  const [placeHolderTextColor, setPlaceHolderTextColor] = useState(
    defaultPlaceHolderTextColor,
  );
  const [timerText, setTimerText] = useState(defaultTimerText);
  const [recordedAudio, setRecordedAudio] = useState<Audio | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Add this part when the component is used with a screen which uses navigation to
   * avoid keeping the mic recording audio even if the screen is not in focus.
   */
  const isFocused = useIsFocused();
  useEffect(() => {
    return () => {
      AudioUtil.isRecording().then(isRecording => {
        if (isRecording) {
          // Make sure we stop the current recording before we navigate
          console.log('Finishing ongoing recording..');
          AudioUtil.stopRecord();
          if (recordingTimerRef.current) {
            clearTimeout(recordingTimerRef.current);
          }
        }
      });
    };
  }, [isFocused]);

  async function stopAudioRecording() {
    const audio = await AudioUtil.stopRecord();
    setIsAudioRecording(false);
    closeAudioRecordingView();
    if (audio) {
      setTextInputValue(transcribingPlaceHolderText);
      const result = await transcribe(audio);
      setTextInputValue(textInputValue + result.text);
      setRecordedAudio(audio);
    }
    setTimerText(defaultTimerText);
    if (isSaveEnabled) {
      setShowSaveNotesView(true);
    }
  }

  function startAudioRecording() {
    openAudioRecordingView();
    setRecordedAudio(null);
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
    setShowSaveNotesView(false);
    timerStartedTimestamp = Date.now();
    startRecordingTimer();
  }

  function changePlaceHolderStyle(
    changedPlaceHolderText: string,
    changedPlaceHolderTextColor: string,
  ) {
    setPlaceHolderText(changedPlaceHolderText);
    setPlaceHolderTextColor(changedPlaceHolderTextColor);
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
    recordingTimerRef.current = setTimeout(function () {
      if (!stopTimer) {
        startRecordingTimer();
      }
      updateTimerText();
    }, 1000);
  }

  function submitInput() {
    Keyboard.dismiss();
    if (onSubmitCallback) {
      onSubmitCallback(textInputValue);
    }
    if (isSaveEnabled) {
      setShowSaveNotesView(true);
    }
  }

  function constructJournalRecord(audios: Array<string>, texts: Array<string>) {
    const targetImagePath = props.targetImage
      ? props.targetImage
      : 'https://reactjs.org/logo-og.png';
    return {
      timestamp: Date.now(),
      images: [targetImagePath],
      audios: audios,
      texts: texts,
    };
  }

  async function save() {
    var audioFilePath = null;
    if (recordedAudio) {
      audioFilePath = await AudioUtil.toFile(recordedAudio);
    }
    const journalRecord = constructJournalRecord(
      audioFilePath ? [audioFilePath] : [],
      [textInputValue],
    );
    const result = await JournalUtil.saveAnnotation(journalRecord);
    console.log('Record saved!');
    setShowSaveNotesView(false);
    if (props.onSave) {
      props.onSave();
    }
  }

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flex: 1,
          marginLeft: 24,
          marginRight: 24,
          bottom: showSaveNotesView ? 90 : 0,
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
      <View>
        {showSaveNotesView && (
          <View style={styles.saveButtonView}>
            <TouchableOpacity onPress={save} style={{width: '100%'}}>
              <View style={styles.saveButton}>
                <View>
                  <Text style={styles.saveButtonText}>SAVE</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
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
  saveButtonView: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: 120,
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
  saveButton: {
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 24,
    marginRight: 24,
  },
  saveButtonText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 14,
    alignContent: 'flex-end',
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
