import * as React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import type {RootStackParamList} from '../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';
import type {InformationalElement} from '../../lesson_content/lessonTypes';
import ChatBubble from '../../components/ChatBubble';

const leftArrow = require('../../assets/images/left-arrow-3x.png');
const rightArrow = require('../../assets/images/right-arrow-3x.png');

type Props = {
  elementProps: InformationalElement;
  elementId: number;
  totalElements: number;
};

export default function InformationalComponent({
  navigation,
  elementProps,
  elementId,
  totalElements,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> & Props) {
  const windowHeight = Dimensions.get('window').height;

  const {imageFilenames, messages} = elementProps;

  const imageSource = imageFilenames?.[0];

  return (
    <View style={styles.mainContainer}>
      {imageSource != null && (
        <View style={styles.imageSection}>
          <ImageBackground
            source={imageSource}
            resizeMode="cover"
            style={{
              height: windowHeight * 0.4,
            }}
          />
        </View>
      )}
      <View style={styles.messageSection}>
        {messages.map((message, i) => (
          <ChatBubble
            key={i}
            alignment="left"
            view={<Text style={styles.bubbleText}>{message}</Text>}
            bubbleColor={'rgba(38, 38, 39, 1)'}
            backgroundColor={'#121212'}
          />
        ))}
      </View>
      <View style={styles.navigationSection}>
        <View style={styles.arrowContainer}>
          {elementId > 0 && (
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() =>
                navigation.navigate('LessonContentScreen', {
                  elementId: elementId - 1,
                })
              }
            >
              <Image source={leftArrow} style={styles.arrow} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.lessonNumberContainer}>
          <Text style={styles.lessonNumber}>{`${
            elementId + 1
          }/${totalElements}`}</Text>
        </View>
        <View style={styles.arrowContainer}>
          {elementId + 1 < totalElements && (
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() =>
                navigation.navigate('LessonContentScreen', {
                  elementId: elementId + 1,
                })
              }
            >
              <Image source={rightArrow} style={styles.arrow} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// TODO: Use colors from the theme instead of hardcoding
const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  messageSection: {
    display: 'flex',
    flexGrow: 1,
    margin: 12,
  },
  imageSection: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: 0,
  },
  navigationSection: {
    flexGrow: 0,
    marginBottom: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    // flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 10 + 50,
    height: 22 + 50,
  },
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 10 + 50,
    height: 22 + 50,
  },
  arrow: {
    width: 10,
    height: 22,
  },
  lessonNumber: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
    // TODO: is this font natively supported on both platforms?
    fontFamily: 'SF Pro Text',
    color: 'white',
  },
  lessonNumberContainer: {flexGrow: 1, textAlign: 'center'},
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
