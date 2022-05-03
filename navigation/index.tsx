/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {Foundation} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DevIntroScreen from '../screens/DevIntroScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import {
  RootStackParamList,
  LessonTabParamList,
  RootTabScreenProps,
} from '../types';
import LessonIntroScreen from '../screens/LessonIntroScreen';
import LessonContentScreen from '../screens/LessonContentScreen';
import LearnScreen from '../screens/LearnScreen';
import HomeworkScreen from '../screens/HomeworkScreen';
import FindScanEucalyptusTreeScreen from '../screens/FindScanEucalyptusTreeScreen';
import TipsToFindEucalyptusTreesScreen from '../screens/TipsToFindEucalyptusTreesScreen';

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
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DevIntroScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: '[DEV] Intro Screen',
        }}
      />
      <Stack.Screen
        name="LessonIntroScreen"
        component={LessonIntroScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: 'Stanford Nature',
        }}
      />
      <Stack.Screen
        name="LessonTabNavigator"
        component={LessonTabNavigator}
        options={{headerShown: true, headerTitle: 'Stanford Nature'}}
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
          headerShown: true,
          headerBackVisible: true,
          title: 'Stanford Nature',
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={ModalScreen} />
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
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Learn"
      screenOptions={{headerShown: false}}
    >
      <BottomTab.Screen
        name="Learn"
        component={LearnScreen}
        options={({navigation}: RootTabScreenProps<'Learn'>) => ({
          title: 'Learn',
          tabBarIcon: ({color}) => (
            <Foundation name="play-video" size={30} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{marginRight: 15}}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Homework"
        component={HomeworkScreen}
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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
