import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import LessonOptionsBar from './LessonOptionsBar';
import NavigationButton from './NavigationButton';

const leftArrow = require('assets/images/left-arrow-3x.png');
const rightArrow = require('assets/images/right-arrow-3x.png');

type Props = {
  elementId: number;
  totalElements: number;
  topElement: React.ReactNode;
  bottomElement?: React.ReactNode;
  children: React.ReactNode;
  showNavigation?: boolean;
};

export default function LessonPrimaryLayout({
  navigation,
  elementId,
  totalElements,
  topElement,
  bottomElement,
  children,
  showNavigation = true,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> & Props) {
  const windowWidth = Dimensions.get('window').width;

  const showForwardArrow = elementId + 1 < totalElements;
  const showBackwardArrow = elementId > 0;

  return (
    <View style={styles.mainContainer}>
      <View style={(styles.topSection, {height: windowWidth})}>
        {topElement}
      </View>
      <View style={styles.body}>{children}</View>
      {showNavigation && (
        <View style={styles.navigationSection}>
          <NavigationButton
            source={leftArrow}
            hide={!showBackwardArrow}
            onPress={() =>
              navigation.navigate('LessonContentScreen', {
                elementId: elementId - 1,
              })
            }
          />

          <View style={styles.bottomCenterContainer}>
            {bottomElement != null ? (
              bottomElement
            ) : (
              <Text style={styles.lessonNumber}>{`${
                elementId + 1
              }/${totalElements}`}</Text>
            )}
          </View>

          <NavigationButton
            hide={!showForwardArrow}
            onPress={() =>
              navigation.navigate('LessonContentScreen', {
                elementId: elementId + 1,
              })
            }
            source={rightArrow}
          />
        </View>
      )}
      <View style={styles.optionBarWrapper}>
        <LessonOptionsBar
          displayQuestionAnswerScreen={false}
          onClose={() => navigation.navigate('LessonTabNavigator')}
          onQuestionMark={() => navigation.navigate('QuestionAnswerScreen')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    position: 'relative',
    backgroundColor: '#121212',
  },
  optionBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  body: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    height: '100%',
  },
  topSection: {
    flexGrow: 0,
    flexShrink: 0,
    position: 'relative',
  },
  navigationSection: {
    flexGrow: 0,
    flexShrink: 0,
    // The bottom of the arrows should be 90px above the bottom of the screen.
    // Because we have 24px of padding on the top and bottom of the buttons so that
    // there are good tap targets, subtract that padding here.
    marginBottom: 90 - 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonNumber: {
    fontSize: 11,
    fontWeight: '500',
    color: 'white',
  },
  bottomCenterContainer: {flexGrow: 1, display: 'flex', alignItems: 'center'},
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
