import * as React from 'react';
import {ImageBackground, View, StyleSheet, Text} from 'react-native';
import PlayAudioButton from '../components/PlayAudioButton';
import TimestampUtils from '../components/TimestampUtils';

import {JournalEntry} from '../types';

type Props = {
  entry: JournalEntry;
};

/**
 * Currently, assumes only a single entry for images, audios and texts.
 */
export default function JournalRecordScreen(props: Props) {
  const {images} = props.entry;
  // For now we're only using the first image
  // Because images used to be strings we're adding in this check so that previous journal entries still display
  const imageSource =
    typeof images[0] === 'string' ? {uri: images[0]} : images[0];

  const dateText = calculateDateText(props.entry.timestamp);
  const timeText = calculateTimeText(props.entry.timestamp);
  const notesText = props.entry.texts[0];

  const audioSource =
    props.entry.audios.length > 0 ? props.entry.audios[0] : undefined;

  function calculateDateText(timestamp: number) {
    return TimestampUtils.getDateString(timestamp);
  }

  function calculateTimeText(timestamp: number) {
    return TimestampUtils.getTimeString(timestamp);
  }

  const handleError = (e: any) => {
    console.log(e.nativeEvent.error);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageSection}>
          {imageSource == null ? (
            <View style={styles.imageNotProvidedWrapper}>
              <Text style={styles.imageNotProvidedText}>
                {'No image provided'}
              </Text>
            </View>
          ) : (
            <ImageBackground
              source={imageSource}
              resizeMode="cover"
              style={styles.image}
              onError={handleError}
            />
          )}
        </View>
        <View style={styles.timestampTextView}>
          <Text style={styles.timestampText}>{dateText}</Text>
          <Text style={styles.timestampText}>{timeText}</Text>
        </View>
        <View style={styles.notesTextView}>
          <Text style={styles.notesText}>{notesText}</Text>
        </View>
        {audioSource && (
          <View style={styles.playAudioButtonView}>
            <PlayAudioButton source={audioSource} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  timestampText: {
    color: 'white',
    fontSize: 13,
  },
  imageNotProvidedText: {
    color: 'white',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  imageNotProvidedWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  notesText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  playAudioButtonView: {
    marginLeft: 24,
    marginRight: 24,
  },
  timestampTextView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginRight: 24,
  },
  notesTextView: {
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
    height: '32%',
  },
  imageSection: {
    height: '50%',
  },
});
