/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {Foundation} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Image} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList, LessonTabParamList} from '../types';
import LessonIntroScreen from '../screens/LessonIntroScreen';
import LessonContentScreen from '../screens/LessonContentScreen';
import FindScanEucalyptusTreeScreen from '../screens/FindScanEucalyptusTreeScreen';
import TipsToFindEucalyptusTreesScreen from '../screens/TipsToFindEucalyptusTreesScreen';
import QuestionAnswerScreen from '../screens/QuestionAnswerScreen';
import JournalScreen from '../screens/JournalScreen';
import SampleEucalyptusTreesScreen from '../screens/SampleEucalyptusTreesScreen';
import appName from '../constants/appName';
import DevIntroScreen from '../screens/DevIntroScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        title: appName,
        headerBackButtonMenuEnabled: false,
        headerBackTitleVisible: false,
      }}
    >
      {__DEV__ && (
        <Stack.Screen
          name="DevIntroScreen"
          component={DevIntroScreen}
          options={{
            headerShown: true,
            headerBackVisible: true,
          }}
        />
      )}
      <Stack.Screen
        name="LessonIntroScreen"
        component={LessonIntroScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="LessonTabNavigator"
        component={LessonTabNavigator}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="FindScanEucalyptusTreeScreen"
        component={FindScanEucalyptusTreeScreen}
      />
      <Stack.Screen
        name="TipsToFindEucalyptusTreesScreen"
        component={TipsToFindEucalyptusTreesScreen}
      />
      <Stack.Screen
        name="LessonContentScreen"
        component={LessonContentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QuestionAnswerScreen"
        component={QuestionAnswerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
        <Stack.Screen
          name="SampleEucalyptusTreesScreen"
          component={SampleEucalyptusTreesScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<LessonTabParamList>();
const learnSelectedIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/learn-selected-icon.png';
const learnUnselectedIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/learn-unselected-icon.png';
const journalSelectedIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/journal-selected-icon.png';
const journalUnselectedIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/journal-unselected-icon.png';

function LessonTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Learn"
      screenOptions={{headerShown: false}}
    >
      <BottomTab.Screen
        name="Learn"
        component={FindScanEucalyptusTreeScreen}
        options={() => ({
          title: 'Learn',
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused ? learnSelectedIcon : learnUnselectedIcon,
              }}
              style={{width: 30, height: 30}}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          title: 'Journal',
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused ? journalSelectedIcon : journalUnselectedIcon,
              }}
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
