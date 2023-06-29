import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from '../scenes/Settings'
import RegisterScreen from '../scenes/RegisterScreen';
const Stack = createNativeStackNavigator();

function RegisterNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="SettingsMenu" component={Settings} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default RegisterNavigation