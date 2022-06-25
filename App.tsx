import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import 'expo-dev-client';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import React, {useEffect} from 'react';
import ModelCache from './components/ModelCache';

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
  // Cache all models required by the app
  useEffect(() => {
    async function preloadModels() {
      await ModelCache.clearModelCache();
      await ModelCache.downloadAllModels().catch(console.error);
    }
    preloadModels();
  }, []);

  const isLoadingComplete = useCachedResources();
  // NOTE: We're hardcoding the dark theme here but in the future
  // we could support a light mode
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
