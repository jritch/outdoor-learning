import {Platform} from 'react-native';

export default function getAppropriateFilePath(filePath: string): string {
  return `${Platform.OS === 'android' ? 'file://' : ''}${filePath}`;
}
