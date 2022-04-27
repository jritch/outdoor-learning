/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LessonContentScreen from './screens/LessonContentScreen';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  LessonIntroScreen: undefined;
  LessonContentScreen: {elementId: number} | undefined;
  LessonTabNavigator: NavigatorScreenParams<LessonTabParamList> | undefined;
  FindScanEucalyptusTreeScreen: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type LessonTabParamList = {
  Learn: undefined;
  Homework: undefined;
};

export type RootTabScreenProps<Screen extends keyof LessonTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<LessonTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type JournalEntry = {
  timestamp: number,
  images: Array<string>,
  audios: Array<string>,
  texts: Array<string>,
};
