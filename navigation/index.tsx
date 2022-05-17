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
import {ColorSchemeName} from 'react-native';

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
      }}
    >
      <Stack.Screen
        name="DevIntroScreen"
        component={DevIntroScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
        }}
      />
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
          tabBarIcon: ({color}) => (
            <Foundation name="play-video" size={30} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Homework"
        component={JournalScreen}
        options={{
          title: 'Homework',
          tabBarIcon: ({color}) => (
            <Ionicons name="newspaper-outline" size={30} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
