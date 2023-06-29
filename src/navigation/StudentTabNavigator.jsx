import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentsListScreen from '../scenes/StudentsListScreen';
import Settings from '../scenes/Settings';
import MapScreen from '../scenes/MapScreen';
import CreateStudent from '../scenes/Settings';
import {
  homeSolid,
  home,
  userBlack,
  user,
  locationBlack,
  location,
} from '../contants/Icons.js';
import RegisterNavigation from '../navigation/RegisterNavigation';
import { useSelector } from 'react-redux';
import StudentHomeScreen from '../scenes/StudentHomeScreen';

const Tab = createBottomTabNavigator();

function StudentTabNavigator() {
  const { theme } = useSelector(state=>state.mode)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        
        tabBarStyle: {
          backgroundColor:theme==="light"? '#fff':'#3a4130',
        }
      }}
    >
      <Tab.Screen
        name="StudentsList"
        component={StudentHomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 20, height: 20, marginLeft: 10 }}
              resizeMode="contain"
              source={focused ? homeSolid : home}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={RegisterNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 20, height: 20, marginLeft: 10 }}
              resizeMode="contain"
              source={focused ? userBlack : user}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default StudentTabNavigator;
