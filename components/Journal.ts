import {JournalEntry} from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_WIDE_JOURNAL_KEY = "outdoor_app_journal";

type StorageResponse = {
  success: boolean,
  errorMessage: string | null,
}

class JournalUtil {

  /**
   * Add an annotation to a lesson and save it for reference.
   */
  static async saveAnnotation(annotation: JournalEntry): Promise<StorageResponse> {
    const currentTimestampString = Date.now().toString();
    const savedAnnotationKeys = await JournalUtil.getList(APP_WIDE_JOURNAL_KEY);
    if (savedAnnotationKeys == null) {
      return {success: false, errorMessage: "Could not retrieve the annotations list for the app."};
    }
    savedAnnotationKeys.push(currentTimestampString); // This ensures keys to be sorted in ascending order

    // Add a record for the current annotation with current timestamp as the key.
    try {
      await JournalUtil.saveRecord(currentTimestampString, annotation);
    } catch (e) {
      return {success: false, errorMessage: 'Error encountered while updating annotations list.'};
    }

    // Add this annotation to the global list of annotations.
    try {
      await JournalUtil.saveRecord(APP_WIDE_JOURNAL_KEY, savedAnnotationKeys);
    } catch (e) {
      return {success: false, errorMessage: 'Error encountered while updating annotations list.'};
    }

    return {success: true, errorMessage: null};
  }

  /**
   * Retrieve the saved journal annotations for the user.
   */
  static async loadJournal(): Promise<Array<JournalEntry>> {
    const allAnnotations = await JournalUtil.getList(APP_WIDE_JOURNAL_KEY);
    if (allAnnotations == null || allAnnotations.length === 0) {
      return [];
    }
    const entries = await AsyncStorage.multiGet(allAnnotations);
    const result = [];
    for (let entry of entries) {
      const stringifiedValue = entry[1] ? entry[1] : "{}"; // To avoid crashes in client calls
      const objectValue = JSON.parse(stringifiedValue);
      result.push({timestamp: objectValue['timestamp'], images: objectValue['images'], audios: objectValue['audios'], texts: objectValue['texts']});
    }
    return result;
  }

  static async saveRecord(key: string, value: any): Promise<void> {
    const stringifiedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringifiedValue)
  }

  /**
   * Retrieve an object from the file system using a given key.
   */
  static async getList(key: string): Promise<Array<string> | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      return null;
    }
  }

  static async clearRecords(): Promise<void> {
    try {
      await AsyncStorage.setItem(APP_WIDE_JOURNAL_KEY, JSON.stringify([]));
    } catch (e) {
    }
  }
}

export default JournalUtil;
