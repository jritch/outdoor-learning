import {useEffect, useState, useCallback} from 'react';
import React from 'react';

// Define a fallback no-op Speech object if the expo-speech module is not available.
// @ts-ignore
let Speech = {speak: (..._args) => {}, stop: (..._args) => {}};

try {
  Speech = require('expo-speech');
} catch (e) {
  console.warn(
    'expo-speech module not available. text-to-speech functionality will not work.',
  );
}

/**
 *
 * @param textToSpeak IMPORTANT: this array should only ever append new text -- it should never change existing text.
 * @param shouldSpeak
 */
export default function useTextToSpeech(
  textToSpeak: Array<string>,
  initialShouldSpeak: boolean,
): {onStartSpeaking: () => void; onStopSpeaking: () => void} {
  const [lastCompletedIndex, setLastCompletedIndex] = useState<number>(-1);

  // @state shouldSpeak - whether or not the consumer of this hook wants us to be speaking
  const [shouldSpeak, setShouldSpeak] = useState<boolean>(initialShouldSpeak);

  // @state isSpeaking - whether or not the expo speech api is currently speaking
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (
      Speech != null &&
      shouldSpeak &&
      !isSpeaking &&
      lastCompletedIndex < textToSpeak.length - 1
    ) {
      const textToSpeakNextIndex = lastCompletedIndex + 1;
      Speech.speak(textToSpeak[textToSpeakNextIndex], {
        onDone: () => {
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
      if (Speech != null) {
        Speech.stop();
      }

      setIsSpeaking(false);
    };
  }, []);

  const onStartSpeaking = useCallback(() => {
    setShouldSpeak(true);
  }, []);

  const onStopSpeaking = useCallback(() => {
    if (Speech != null) {
      Speech.stop();
    }
    setIsSpeaking(false);
    setShouldSpeak(false);
  }, []);

  return {onStartSpeaking, onStopSpeaking};
}
