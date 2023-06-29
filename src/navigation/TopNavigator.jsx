import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Dimensions } from 'react-native';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

import AllStudents from '../components/AllStudents';
import NearYou from '../components/NearYou';
import Outside from '../components/Outside';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const TopBarNavigation = () => {
  const { theme } = useSelector(state=>state.mode)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          elevation: 0,
          marginLeft: 20,
          marginTop: 14,
          backgroundColor:theme==='light' ? "#fff" : "#3a4130" //dark mode
        },
        tabBarItemStyle: {
          width: width / 4.5,
          backgroundColor: 'rgba(152, 62, 130, 0)',
          height: 45,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#788D5D',
          height: 40,
          borderRadius: 20,
          shadowColor: '#000000',
          elevation: 10,
        },
        tabBarIndicatorContainerStyle: {
          height: 45,
        },
        tabBarPressColor: 'white',
      }}
    >
      <Tab.Screen
        options={{
          title: ({ focused }) => (
            <Text
              style={{
                color: focused ? 'white' : 'grey',
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'center',
                fontFamily: 'PlusJakartaSans-Bold',
              }}
            >
              All
            </Text>
          ),
        }}
        name="All"
        component={AllStudents}
      />
      <Tab.Screen
        options={{
          title: ({ focused }) => (
            <Text
              style={{
                color: focused ? 'white' : 'grey',
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'center',
                fontFamily: 'PlusJakartaSans-Bold',
              }}
            >
              Near
            </Text>
          ),
        }}
        name="Near"
        component={NearYou}
      />
      <Tab.Screen
        options={{
          title: ({ focused }) => (
            <Text
              style={{
                color: focused ? 'white' : 'grey',
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'center',
                fontFamily: 'PlusJakartaSans-Bold',
              }}
            >
              Outside
            </Text>
          ),
        }}
        name="Outside"
        component={Outside}
      />
    </Tab.Navigator>
  );
};

export default TopBarNavigation;
