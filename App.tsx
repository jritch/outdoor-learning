import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import React, {useEffect} from 'react';

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
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
