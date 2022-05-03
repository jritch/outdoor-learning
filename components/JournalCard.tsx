import * as React from 'react';
import {ImageBackground, Pressable, View, StyleSheet, Text} from 'react-native';

type Props = {
  thumbnailImage: string;
  timestamp: number;
  onClick: Function;
};

export default function JournalCard(props: Props) {
  const dateString = calculateDateString(props.timestamp);
  const timeString = calculateTimeString(props.timestamp);

  function calculateDateString(timestamp: number) {
    return '04/22/2022'; // TODO: Add function to parse the date string from timestamp.
  }

  function calculateTimeString(timestamp: number) {
    return '2:22 PM'; // TODO: Add function to parse the time string from timestamp.
  }

  function handleOnPressCallback() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <View style={{width: '45%'}}>
      <Pressable onPress={handleOnPressCallback} style={{flex: 1}}>
        <View style={styles.imageSection}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>{dateString}</Text>
          <Text style={styles.text}>{timeString}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 13,
  },
  textView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageSection: {
    height: 155,
    marginTop: 16,
  },
});
