import {FontAwesome} from '@expo/vector-icons';
import {getExpoAssetPathWithoutSchema} from 'components/ModelCache';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useRef, useState} from 'react';

async function loadAssets(): Promise<any> {
  return Promise.all([
    // Load fonts
    Font.loadAsync({
      ...FontAwesome.font,
      'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    }),
    getExpoAssetPathWithoutSchema(
      require('../assets/models/classifier.ptl'),
      'classifier',
    ),
    getExpoAssetPathWithoutSchema(
      require('../assets/models/bert_qa.ptl'),
      'bert_qa',
    ),
    getExpoAssetPathWithoutSchema(
      require('../assets/models/wav2vec2.ptl'),
      'wav2vec2',
    ),
  ]);
}

export default function useCachedResources(setError: (e: unknown) => void) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const didAttemptAssetPreload = useRef<boolean>(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    SplashScreen.hideAsync();
    if (didAttemptAssetPreload.current === false) {
      didAttemptAssetPreload.current = true;

      async function loadResourcesAndDataAsync() {
        console.log('Preloading all expo assets');
        try {
          // SplashScreen.preventAutoHideAsync();

          await loadAssets();
        } catch (e) {
          // We might want to provide this error information to an error reporting service
          console.warn('Error while loading expo assets', e);
          setError(e);
        } finally {
          console.log('Expo asset loading complete!');
          setLoadingComplete(true);
        }
      }

      loadResourcesAndDataAsync();
    }
  }, [setError]);

  return isLoadingComplete;
}
