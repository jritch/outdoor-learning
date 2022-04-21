import * as React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {useEffect, useState} from 'react';

type Props = {
  alignment: string; // position of the small arrow on the chat bubble, 'left' or 'right'
  bubbleColor: string; // the color of the chat bubble
  backgroundColor: string; // the background color of the view on which the bubble is rendered
  view: any; // the view to be rendered inside the bubble
};

export default function ChatBubble(props: Props) {
  const alignment = props.alignment;
  const backgroundColor = props.backgroundColor;
  const bubbleColor = props.bubbleColor;
  const viewToBeRendered = props.view;

  return (
    <View
      style={{
        backgroundColor: bubbleColor,
        padding: 13,
        borderRadius: 20,
        maxWidth: '75%',
      }}
    >
      {viewToBeRendered}
      {alignment === 'left' && (
        <>
          <View
            style={{
              position: 'absolute',
              backgroundColor: bubbleColor,
              width: 20,
              height: 25,
              bottom: 0,
              borderBottomRightRadius: 25,
              left: -10,
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: backgroundColor,
              width: 20,
              height: 35,
              bottom: -6,
              borderBottomRightRadius: 18,
              left: -20,
            }}
          />
        </>
      )}
      {alignment === 'right' && (
        <>
          <View
            style={{
              position: 'absolute',
              backgroundColor: bubbleColor,
              width: 20,
              height: 25,
              bottom: 0,
              borderBottomLeftRadius: 25,
              right: -10,
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: backgroundColor,
              width: 20,
              height: 35,
              bottom: -6,
              borderBottomLeftRadius: 18,
              right: -20,
            }}
          />
        </>
      )}
    </View>
  );
}
