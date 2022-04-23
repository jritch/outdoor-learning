import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type Props = {
  text: string; // text to be rendered in the bubble
};

export default function Bubble(props: Props) {
  const textToBeRendered = props.text;

  return (
    <View style={styles.bubble}>
      <Text style={styles.bubbleText}>
        {textToBeRendered}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  bubble: {
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background: rgba(18, 18, 18, 1)',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 11,
    paddingBottom: 9,
  },
  bubbleText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
});
