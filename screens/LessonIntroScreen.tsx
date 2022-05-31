import * as React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function LessonIntroScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'LessonIntroScreen'>) {
  const headingTextContent = 'What makes eucalyptus trees so controversial?';
  const textContent =
    'Depending on who you ask, eucalyptus trees in the Bay Area are either a fire-prone blight on the landscape or an essential piece of California’s natural heritage. Let’s find out why! It will take approximately 10 mins to complete the lesson. Turn up the volume to listen to the narration through audio.';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingSection}>
        <Text style={styles.headingText}>{headingTextContent}</Text>
      </View>
      <View style={styles.normalTextSection}>
        <Text style={styles.normalText}>{textContent}</Text>
      </View>
      <View style={styles.imageSection}>
        <ImageBackground
          source={require('../assets/images/GettyImages-a0052-000570.jpeg')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.buttonPosition}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LessonTabNavigator')}
          style={styles.button}
        >
          <Text style={styles.startButtonText}>{'START'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headingText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  normalText: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  headingSection: {
    marginLeft: 24,
    marginRight: 24,
  },
  startButtonText: {
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
  buttonPosition: {
    position: 'absolute',
    bottom: 84,
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSection: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    flex: 1,
  },
  normalTextSection: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 10,
    marginLeft: 24,
    marginRight: 24,
  },
});
