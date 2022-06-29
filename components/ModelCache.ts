import {MobileModel} from 'react-native-pytorch-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import nullthrows from 'nullthrows';

type DownloadStatus = 'in-progress' | 'complete' | 'error';

const ASYNC_STORAGE_MODEL_PATH_PREFIX = 'model_path_';

// ios and android don't support the same file scheme prefixes: https://docs.expo.dev/versions/latest/sdk/filesystem/#supported-uri-schemes-1
// const FILE_SCHEME = Platform.OS === 'android' ? 'file:///' : 'file://';
// TODO: Figure out why 'file:///' is the required prefix on both ios and android when the docs above say otherwise
const FILE_SCHEME = 'file:///';

const modelDownloadInfo: {
  [url: string]: {
    status: DownloadStatus;
    downloadPromise: Promise<string>;
  };
} = {};

function getPathWithScheme(path: string): string {
  if (path[0] === '/') {
    return FILE_SCHEME + path.slice(1);
  }
  return FILE_SCHEME + path;
}

export async function downloadModelFromURL(url: string): Promise<string> {
  try {
    const downloadPromise = MobileModel.download(url);
    modelDownloadInfo[url] = {status: 'in-progress', downloadPromise};

    const modelPath = await downloadPromise;
    modelDownloadInfo[url].status = 'complete';
    return modelPath;
  } catch (e) {
    console.error(`Download failed for ${url}:`, e);
    modelDownloadInfo[url].status = 'error';
    throw e;
  }
}

/**
 *
 * @param url
 * @returns the path, or null if the model is not cached
 */
async function getCachedModelPath(url: string): Promise<string | null> {
  const asyncStorageKey = getAsyncStorageKeyForModel(url);
  const cachedModelPath = await AsyncStorage.getItem(asyncStorageKey);

  if (cachedModelPath == null) {
    return null;
  }

  const modelPathInfo = await FileSystem.getInfoAsync(
    getPathWithScheme(cachedModelPath),
  );
  if (modelPathInfo.exists === true) {
    // TODO: Consider having a TTL for cached models (7 days? 180 days?) after which we invalidate the cache and re-download
    console.log(`Model ${url} found in cache`);
    return cachedModelPath;
  }

  console.warn('Model path found in async storage but no model at that path', {
    modelKey: url,
    modelPathKey: asyncStorageKey,
    cachedModelPath,
    modelPathInfo,
  });
  return null;
}

export function getModelStatus(url: string): DownloadStatus | null {
  return modelDownloadInfo[url]?.status ?? null;
}

// Probably not needed for the app, only for dev purposes.
export async function clearModelCache(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  await Promise.all(
    keys
      .filter(key => key.startsWith(ASYNC_STORAGE_MODEL_PATH_PREFIX))
      .map(async key => {
        const cachedModelPath = await AsyncStorage.getItem(key);
        if (cachedModelPath != null) {
          try {
            console.log(`Deleting cached file ${cachedModelPath}...`);
            await FileSystem.deleteAsync(getPathWithScheme(cachedModelPath));
          } catch (e) {
            console.log(`Unable to delete file ${cachedModelPath}:`, e);
          }
        }
        try {
          await AsyncStorage.removeItem(key);
        } catch (e) {
          console.log(`Unable to remove async storage key ${key}`);
        }
      }),
  );
}

export function getAsyncStorageKeyForModel(url: string): string {
  // Cache based on url, so if the url ever changes we treat it as a different model
  return ASYNC_STORAGE_MODEL_PATH_PREFIX + url;
}

export async function preloadModel(url: string): Promise<void> {
  await getModelPath(url);
}

export async function getModelPath(url: string): Promise<string> {
  const cachedModelPath = await getCachedModelPath(url);
  // TODO: Do a md5 hash check on the model to ensure its the one that's intended. would require passing the hash of the intended model
  if (cachedModelPath != null) {
    return cachedModelPath;
  }

  let modelPath: string | null = null;
  if (
    modelDownloadInfo[url] != null &&
    modelDownloadInfo[url].status === 'in-progress'
  ) {
    console.log(
      `Download of ${url} is already in progress. Awaiting its completion...`,
    );
    modelPath = await modelDownloadInfo[url].downloadPromise;
  } else {
    console.log(`Downloading ${url} and adding to cache...`);

    const startTime = performance.now();
    modelPath = await downloadModelFromURL(url);
    console.log(
      `Model ${url} downloaded in ${Number(
        (performance.now() - startTime) / 1000,
      ).toFixed(2)} seconds`,
    );
  }

  nullthrows(modelPath, 'modelPath cannot be nullish in getModelPath');

  // Double check that the file is actually there.
  const modelPathInfo = await FileSystem.getInfoAsync(
    getPathWithScheme(modelPath),
  );
  console.log('Downloaded model info:', modelPathInfo);

  // Store the path to async storage so we can persist the cache betwen app loads
  const modelPathKey = getAsyncStorageKeyForModel(url);
  await AsyncStorage.setItem(modelPathKey, modelPath);
  console.log(`Model ${url} loaded into cache with path: ${modelPath}`);

  return modelPath;
}
