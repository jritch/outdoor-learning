import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  androidExtraSafeAreaPadding: {
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
});
