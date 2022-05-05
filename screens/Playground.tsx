import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import JournalUtil from '../components/Journal';

import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import TextVoiceInput from '../components/TextVoiceInput';

async function addRecord() {
  const record = getRecord();
  console.log(record);
  const result = await JournalUtil.saveAnnotation(record);
  console.log('Record saved!');
}

async function getAllRecords() {
  console.log(await JournalUtil.loadJournal());
}

function getRecord() {
  const localIOSImagePath =
    '/var/mobile/Containers/Data/Application/C570D932-9312-48F3-AED3-46F72ABBEB1B/Documents/9A603E24-8EED-408A-976A-1589D854E604.png';
  const localIOSAudioPath =
    '/private/var/mobile/Containers/Data/Application/C570D932-9312-48F3-AED3-46F72ABBEB1B/tmp/audioB0DDBC94-5D8B-450B-8994-10192FB36943.wav';
  const localAndroidImagePath =
    '/data/user/0/org.pytorch.live.master/cache/image1886804156286229366.png';
  const localAndroidAudioPath =
    '/data/user/0/org.pytorch.live.master/cache/audio5051772467563316905.wav';

  return {
    timestamp: Date.now(),
    images: [
      Platform.OS == 'ios' ? localIOSImagePath : localAndroidImagePath,
      localIOSImagePath,
      'https://reactjs.org/logo-og.png',
    ],
    audios: [Platform.OS == 'ios' ? localIOSAudioPath : localAndroidAudioPath],
    texts: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    ],
  };
}

export default function Playground({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Playground'>) {
  const localIOSImagePath =
    '/var/mobile/Containers/Data/Application/C570D932-9312-48F3-AED3-46F72ABBEB1B/Documents/9A603E24-8EED-408A-976A-1589D854E604.png';
  const localIOSAudioPath =
    '/private/var/mobile/Containers/Data/Application/C570D932-9312-48F3-AED3-46F72ABBEB1B/tmp/audioB0DDBC94-5D8B-450B-8994-10192FB36943.wav';
  const localAndroidImagePath =
    '/data/user/0/org.pytorch.live.master/cache/image1886804156286229366.png';
  const localAndroidAudioPath =
    '/data/user/0/org.pytorch.live.master/cache/audio5051772467563316905.wav';
  const record = {
    timestamp: 0,
    images: [
      Platform.OS == 'ios' ? localIOSImagePath : localAndroidImagePath,
      localIOSImagePath,
      'https://reactjs.org/logo-og.png',
    ],
    audios: [Platform.OS == 'ios' ? localIOSAudioPath : localAndroidAudioPath],
    texts: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    ],
  };

  const [showSaveView, setShowSaveView] = useState<boolean>(true);

  /*useEffect(() => {
    const addData = async () => {
      await addRecord();
      //await JournalUtil.clearRecords();
    }
    addData();
  });*/

  async function displaySaveView() {}

  async function clearRecords() {
    await JournalUtil.clearRecords();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <View style={styles.startButton} />
      <TextVoiceInput
        placeHolderText={'Add notes'}
        isSaveEnabled={true}
        onSubmit={() => {}}
        targetImage={null}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  startButton: {
    height: '80%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4c2c',
  },
  saveButtonView: {
    backgroundColor: 'red',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: 100,
    alignItems: 'center',
  },
});
