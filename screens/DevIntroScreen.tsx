import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {RootStackParamList} from '../types';
import {EucalyptusLesson} from '../lesson_content/EucalyptusLesson';
import {clearModelCache} from 'components/ModelCache';

const ROUTES_TO_IGNORE = ['DevIntroScreen'];

export default function DevIntroScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Root'>) {
  const navState = navigation.getState();
  const routeNames = navState.routeNames.filter(
    name => !ROUTES_TO_IGNORE.includes(name),
  );
  const {elements} = EucalyptusLesson;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>[DEV] Flora Dev Screen</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LessonIntroScreen')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{'Start App'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.screensHeaderContainer}>
            <Text style={styles.screensHeader}>Screen Shortcuts</Text>
          </View>
          {elements.map((element, index) => {
            return (
              <View style={styles.buttonWrapper} key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('LessonContentScreen', {
                      elementId: index,
                    })
                  }
                  style={styles.button}
                >
                  <Text
                    style={styles.buttonText}
                  >{`Lesson ID: ${index} ${element.__type}`}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          {routeNames.map((routeName, index) => {
            return (
              <View style={styles.buttonWrapper} key={routeName ?? index}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(routeName)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{routeName}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={[styles.buttonWrapper, styles.extraButtonSpacing]}>
            <TouchableOpacity
              onPress={() => clearModelCache()}
              style={[styles.button, styles.orangeButton]}
            >
              <Text style={styles.buttonText}>Clear Model Cache</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center',
  },
  screensHeaderContainer: {marginTop: 40, marginBottom: 20},
  screensHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headingContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 22,
    marginBottom: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 24,
    marginRight: 24,
  },
  buttonWrapper: {
    // position: 'absolute',
    // bottom: 84,
    width: '100%',
    margin: 8,
  },
  imageSection: {
    marginTop: 50,
    width: '100%',
    height: 256,
    backgroundColor: '#ffffff',
  },
  orangeButton: {
    backgroundColor: '#ff6f00',
  },
  extraButtonSpacing: {
    marginTop: 24,
  },
});
