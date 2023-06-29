import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
// import { TransitionPresets } from '@react-navigation/native-stack';
import LoginScreen from '../scenes/LoginScreen';
import MapScreen from '../scenes/MapScreen';
import Notification from '../scenes/Notification';
//student
import StudentHomeScreen from '../scenes/StudentHomeScreen';
import TabNavigator from '../navigation/TabNavigator';
import StudentTabNavigator from '../navigation/StudentTabNavigator'
import TrackChildren from '../scenes/TrackChildren';
import TrackForm from '../scenes/TrackForm';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="StudentHomeScreen" component={StudentTabNavigator} />
      <Stack.Screen name="TrackChildren" component={TrackChildren} />
      <Stack.Screen name="TrackForm" component={TrackForm} />
      <Stack.Screen
        name="Notification"
        options={{
          gestureEnabled: true,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
        component={Notification}
      />
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
