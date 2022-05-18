import * as React from 'react';
import {useState} from 'react';
import {ImageBackground, Platform, View, StyleSheet, Text} from 'react-native';
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
  const dateText = calculateDateText(props.entry.timestamp);
  const timeText = calculateTimeText(props.entry.timestamp);
  const notesText = props.entry.texts[0];
  const imageSource =
    Platform.OS == 'ios'
      ? props.entry.images[0]
      : 'file://' + props.entry.images[0]; // android expects the 'file://' for local file paths.
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
          <ImageBackground
            source={{uri: imageSource}}
            resizeMode="cover"
            style={styles.image}
            onError={handleError}
          />
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
