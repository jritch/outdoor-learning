import type {ModelResultMetrics} from 'react-native-pytorch-core';

import * as React from 'react';
import {Audio, AudioUtil, MobileModel} from 'react-native-pytorch-core';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useCallback, useState} from 'react';
import translate from '../components/speechTranslation';

export default function SpeechTranslationTest() {
  const [recording, setRecording] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [metrics, setMetrics] = useState<ModelResultMetrics | null>();

  function startRecording() {
    setRecording(true);
    AudioUtil.startRecord();
  }

  async function stopRecording() {
    const audio = await AudioUtil.stopRecord();
    setRecording(false);
    // TODO: Implement better null/error handling here
    if (audio == null) {
      throw new Error('audio should not be null in stopRecording');
    }
    const result = await translate(audio);
    setTranslatedText(result.text);
    setMetrics(result.metrics ?? null);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {recording ? 'Stop Record' : 'Start Record'}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.small}>{'Translated Text: ' + translatedText}</Text>
        {metrics && (
          <Text style={styles.small}>
            Time taken: {metrics?.totalTime}ms (p={metrics?.packTime}/i=
            {metrics?.inferenceTime}/u={metrics?.unpackTime}
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4c2c',
  },
  small: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 20,
    width: 260,
    fontFamily: 'Courier New',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
  },
});
