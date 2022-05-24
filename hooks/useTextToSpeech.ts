import {useEffect, useRef, useState, useCallback} from 'react';
import React from 'react';
import * as Speech from 'expo-speech';

/**
 *
 * @param textToSpeak IMPORTANT: this array should only ever append new text -- it should never change existing text.
 * @param shouldSpeak
 */
export default function useTextToSpeech(
  textToSpeak: Array<string>,
  initialShouldSpeak: boolean,
) {
  // const [speechQueue, setSpeechQueue] = useState<Array<string>>([]);
  // const [currentlySpeakingIndex, setCurrentlySpeakingIndex] =
  //   useState<number>(0);
  const [lastCompletedIndex, setLastCompletedIndex] = useState<number>(-1);

  // @state shouldSpeak - whether or not the consumer of this hook wants us to be speaking
  const [shouldSpeak, setShouldSpeak] = useState<boolean>(initialShouldSpeak);

  // @state isSpeaking - whether or not the expo speech api is currently speaking
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // const textNotYetSpoken =
  //   currentlySpeakingIndex != null
  //     ? textToSpeak.slice(currentlySpeakingIndex)
  //     : textToSpeak;

  useEffect(() => {
    console.log('useTextToSpeech useEffect');
    if (
      shouldSpeak &&
      !isSpeaking &&
      lastCompletedIndex < textToSpeak.length - 1
    ) {
      console.log('should start speaking');
      const textToSpeakNextIndex = lastCompletedIndex + 1;
      Speech.speak(textToSpeak[textToSpeakNextIndex], {
        onDone: () => {
          console.log('speech block done!');
          setIsSpeaking(false);
          setLastCompletedIndex(textToSpeakNextIndex);
        },
        onError: () => {
          console.error('Error when attempting to speak', {
            textToSpeak,
            lastCompletedIndex,
            textToSpeakNextIndex,
            isSpeaking,
            shouldSpeak,
          });
        },
      });
    }
  }, [isSpeaking, lastCompletedIndex, shouldSpeak, textToSpeak]);

  useEffect(() => {
    return () => {
      // Stop speaking on unmount
      Speech.stop();
      setIsSpeaking(false);
    };
  }, []);

  const onStartSpeaking = useCallback(() => {
    setShouldSpeak(true);
  }, []);

  const onStopSpeaking = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
    setShouldSpeak(false);
  }, []);

  return {onStartSpeaking, onStopSpeaking};
}
