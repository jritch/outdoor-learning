import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import 'expo-dev-client';
import Navigation from './navigation';
import React, {useEffect, useState} from 'react';
import * as ModelCache from './components/ModelCache';
import ModelURLs from './constants/ModelURLs';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

function checkForPytorchCoreLib(): boolean {
  try {
    const torch = require('react-native-pytorch-core').torch;
    const tensor = torch.rand([2, 3]);
    const isAvailable = tensor?.data != null;
    console.log(
      'react-native-pytorch-core available:',
      isAvailable,
      tensor?.data,
    );
    return isAvailable;
  } catch (e) {
    console.log('react-native-pytorch-core unavailable:', e);
    return false;
  }
}

checkForPytorchCoreLib();

export default function App() {
  const [isModelPreloadingComplete, setIsModelPreloadingComplete] =
    useState<boolean>(false);
  const [appError, setAppError] = useState<Error | unknown | null>(null);

  // Cache all models required by the app
  useEffect(() => {
    console.log('Preloading all models...');
    async function preloadModels() {
      await Promise.all(
        Object.values(ModelURLs).map(async url => ModelCache.preloadModel(url)),
      );
      setIsModelPreloadingComplete(true);
    }

    try {
      preloadModels();
    } catch (e) {
      console.error('Error when preloading models:', e);
      setAppError(e);
    }
  }, []);

  const isLoadingComplete = useCachedResources();
  // NOTE: We're hardcoding the dark theme here but in the future
  // we could support a light mode
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';

  if (appError != null) {
    return (
      <SafeAreaView style={styles.messageContainer}>
        <Text style={styles.messageText}>
          The app has encountered an error. Please try again.
        </Text>
      </SafeAreaView>
    );
  }

  if (!isLoadingComplete || !isModelPreloadingComplete) {
    return (
      <SafeAreaView style={styles.messageContainer}>
        <View style={styles.spinner}>
          <ActivityIndicator color="white" size="large" />
        </View>
        <Text style={styles.messageText}>Loading resources</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
  messageContainer: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  spinner: {
    margin: 16,
  },
});
