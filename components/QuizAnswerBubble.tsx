import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

type Props = {
  text: string; // text to be rendered in the bubble
  onSelect: Function; // callback to execute when selected
  disabled: boolean; // flag to disable selection of this component
};

export default function QuizAnswerBubble(props: Props) {
  const textToBeRendered = props.text;
  const onSelectCallback = props.onSelect;
  const disabled = props.disabled;

  const DEFAULT_BACKGROUND_COLOR = 'rgba(18, 18, 18, 1)';
  const SELECTED_BACKGROUND_COLOR = 'rgba(70, 140, 247, 1)';

  const [backgroundColor, setBackgroundColor] = useState<string>(
    DEFAULT_BACKGROUND_COLOR,
  );
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function select() {
    setIsSelected(true);
    setBackgroundColor(SELECTED_BACKGROUND_COLOR);
  }

  return (
    <Pressable
      onPress={() => {
        if (!disabled) {
          if (!isSelected) {
            select();
            if (onSelectCallback) {
              onSelectCallback();
            }
          }
        }
      }}
    >
      <View
        style={{
          height: 45,
          borderRadius: 25,
          alignItems: 'center',
          backgroundColor: backgroundColor,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 11,
          paddingBottom: 9,
          borderWidth: 1,
          borderColor: 'rgba(70, 140, 247, 1)',
        }}
      >
        <Text style={styles.bubbleText}>{textToBeRendered}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'background: rgba(18, 18, 18, 1)',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 11,
    paddingBottom: 9,
    borderWidth: 1,
    borderColor: 'rgba(70, 140, 247, 1)',
  },
  bubbleText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 2,
  },
});
