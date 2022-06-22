import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {ImageBackground, Text, View, StyleSheet} from 'react-native';
import CloseButton from '../components/CloseButton';
import {RootStackParamList} from '../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../constants/globalStyles';

export default function SampleEucalyptusTreesScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SampleEucalyptusTreesScreen'>) {
  return (
    <SafeAreaView
      style={[styles.wrapper, globalStyles.androidExtraSafeAreaPadding]}
    >
      <View style={styles.closeIconContainer}>
        <CloseButton onClick={() => navigation.goBack()} />
      </View>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.textSection}>
            Try using the shape of the leaves to help you identify eucalyptus.
          </Text>
        </View>
        <View style={styles.imageSection}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            source={require('../assets/images/sample-eucalyptus-image-leaves.png')}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.textSection}>
          <Text style={styles.textSection}>
            You might also notice that eucalyptus has a distinctive bark
            pattern.
          </Text>
        </View>
        <View style={styles.imageSection}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            source={require('../assets/images/sample-eucalyptus-image-bark.png')}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#121212',
  },
  closeIconContainer: {
    marginLeft: 24,
    marginBottom: 20,
  },
  closeIconButton: {
    backgroundColor: '#262627',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  closeIconStyle: {
    width: 14,
    height: 14,
  },
  mainContainer: {
    marginLeft: 24,
    marginRight: 24,
  },
  textSection: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSection: {
    width: '100%',
    height: 230,
    marginTop: 16,
  },
});
