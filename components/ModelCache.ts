import {MobileModel} from 'react-native-pytorch-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const MODEL_URLS: {[key: string]: string} = {
  eucalyptusClassifier:
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/classifier.ptl',
  wav2vec:
    'https://github.com/pytorch/live/releases/download/v0.1.0/wav2vec2.ptl',
  bertQA:
    'https://github.com/pytorch/live/releases/download/v0.1.0/bert_qa.ptl',
};

const MODEL_PATH_KEY = 'model_path';

class ModelCache {
  static async downloadModelFromURL(modelKey: string): Promise<string> {
    const modelURL = MODEL_URLS[modelKey];
    const modelPath = await MobileModel.download(modelURL);
    return modelPath;
  }

  static async downloadAllModels(): Promise<void> {
    await Promise.all(
      Object.keys(MODEL_URLS).map(async key => {
        console.log('Fetching model ' + key);
        await ModelCache.getModelPath(key);
      }),
    );
  }

  static async getModelPath(modelKey: string): Promise<string> {
    const modelPathKey = ModelCache.constructModelPathCacheKey(modelKey);
    const cachedModelPath = await AsyncStorage.getItem(modelPathKey);
    if (cachedModelPath != null) {
      const modelPathInfo = await FileSystem.getInfoAsync(cachedModelPath);
      if (modelPathInfo.exists === true) {
        console.log(`Getting ${modelKey} from cache`);
        return cachedModelPath;
      }
      console.warn(
        'Model path found in async storage but no model at that path',
        {modelKey, modelPathKey, cachedModelPath, modelPathInfo},
      );
    }
    console.log(`Downloading ${modelKey} and adding to cache...`);
    const modelPath = await ModelCache.downloadModelFromURL(modelKey);
    console.log(
      `Model with key ${modelKey} loaded into cache with path: ${modelPath}`,
    );
    await AsyncStorage.setItem(modelPathKey, modelPath);
    return modelPath;
  }

  // Probably not needed for the app, only for dev purposes.
  static async clearModelCache(): Promise<void> {
    for (const [key, _] of Object.entries(MODEL_URLS)) {
      const modelKey = ModelCache.constructModelPathCacheKey(key);
      await AsyncStorage.removeItem(modelKey);
      console.log('Removed model path for ' + key + ' from cache.');
    }
  }

  static constructModelPathCacheKey(modelKey: string): string {
    return MODEL_PATH_KEY + '_' + modelKey;
  }
}

export default ModelCache;
