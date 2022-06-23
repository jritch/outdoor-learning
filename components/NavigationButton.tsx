import * as React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  hide: boolean;
  onPress: () => void;
  source: ImageSourcePropType;
};

export default function NavigationButton({
  hide,
  source,
  onPress,
}: Props): React.ReactElement {
  return (
    <TouchableOpacity
      style={[styles.arrowButton, hide && styles.hidden]}
      disabled={hide}
      onPress={onPress}
    >
      <Image
        source={source}
        style={styles.arrow}
        resizeMode="contain"
        fadeDuration={0}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arrowButton: {
    padding: 24,
  },
  arrow: {
    width: 12,
    flexGrow: 0,
    height: 24,
    overflow: 'visible',
  },
  hidden: {opacity: 0},
});
