import {MobileModel} from 'react-native-pytorch-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import {Platform} from 'react-native';

const MODEL_URLS: {[key: string]: string} = {
  eucalyptusClassifier:
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/classifier.ptl',
  wav2vec:
    'https://github.com/pytorch/live/releases/download/v0.1.0/wav2vec2.ptl',
  bertQA:
    'https://github.com/pytorch/live/releases/download/v0.1.0/bert_qa.ptl',
};

const MODEL_PATH_KEY = 'model_path';

// ios and android don't support the same file scheme prefixes: https://docs.expo.dev/versions/latest/sdk/filesystem/#supported-uri-schemes-1
// const FILE_SCHEME = Platform.OS === 'android' ? 'file:///' : 'file://';
// TODO: Figure out why 'file:///' is the required prefix on both ios and android when the docs above say otherwise
const FILE_SCHEME = 'file:///';

function getPathWithScheme(path: string): string {
  if (path[0] === '/') {
    return FILE_SCHEME + path.slice(1);
  }
  return FILE_SCHEME + path;
}
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
      const modelPathInfo = await FileSystem.getInfoAsync(
        getPathWithScheme(cachedModelPath),
      );
      if (modelPathInfo.exists === true) {
        console.log(`Model ${modelKey} found in cache`);
        return cachedModelPath;
      }
      console.warn(
        'Model path found in async storage but no model at that path',
        {modelKey, modelPathKey, cachedModelPath, modelPathInfo},
      );
    }
    console.log(`Downloading ${modelKey} and adding to cache...`);
    const startTime = performance.now();
    const modelPath = await ModelCache.downloadModelFromURL(modelKey);
    console.log(
      `Model ${modelKey} downloaded in ${
        (performance.now() - startTime) / 1000
      } seconds`,
    );
    const modelPathInfo = await FileSystem.getInfoAsync(
      getPathWithScheme(modelPath),
    );
    console.log('Donwloaded model info:', modelPathInfo);
    await AsyncStorage.setItem(modelPathKey, modelPath);
    console.log(
      `Model with key ${modelKey} loaded into cache with path: ${modelPath}`,
    );
    return modelPath;
  }

  // Probably not needed for the app, only for dev purposes.
  static async clearModelCache(): Promise<void> {
    for (const [key, _] of Object.entries(MODEL_URLS)) {
      const modelPathKey = ModelCache.constructModelPathCacheKey(key);
      await AsyncStorage.removeItem(modelPathKey);
      console.log('Removed model path for ' + key + ' from cache.');
    }
  }

  static constructModelPathCacheKey(modelKey: string): string {
    // Cache based on path, so if the file path ever changes we treat it as a different model
    return MODEL_PATH_KEY + '_' + MODEL_URLS[modelKey];
  }
}

export default ModelCache;
