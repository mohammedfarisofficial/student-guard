import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  LogBox,
  SafeAreaView,
  Button,
} from 'react-native';
import Mapbox from '@rnmapbox/maps';

import { IS_ANDROID } from './utils';
import config from './utils/config';
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// screens
import MapScreen from './scenes/MapScreen.jsx';
import LoginScreen from './scenes/LoginScreen.jsx';
import StudentsListScreen from './scenes/StudentsListScreen.jsx';
import AuthNavigator from './navigation/AuthNavigator';
// redux
import { Provider } from 'react-redux';
import store from './state/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//for release
LogBox.ignoreAllLogs()
LogBox.ignoreLogs([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

Mapbox.setAccessToken(config.get('accessToken'));

const Stack = createNativeStackNavigator();

const AppContainer = () => (
  <Provider store={store}>
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  </Provider>
);

const App = () => {
  const [isFetchingAndroidPermission, setIsFetchingAndroidPermission] =
    useState(IS_ANDROID);
  const [isAndroidPermissionGranted, setIsAndroidPermissionGranted] =
    useState(false);
  const activeExample = -1;

  // request for location permission 
  useEffect(() => {
    const permissionsGrand = async () => {
      if (IS_ANDROID) {
        const isGranted = await Mapbox.requestAndroidLocationPermissions();
        setIsAndroidPermissionGranted(isGranted);
        setIsFetchingAndroidPermission(false);
      }
    };
    permissionsGrand();
  }, []);

  if (IS_ANDROID && !isAndroidPermissionGranted) {
    if (isFetchingAndroidPermission) {
      return null;
    }

    // if location permission denied 
    return (
      <SafeAreaView
        style={[sheet.matchParent, { backgroundColor: colors.primary.blue }]}
        forceInset={{ top: 'always' }}
      >
        <View style={sheet.matchParent}>
          <Text style={styles.noPermissionsText}>
            You need to accept location permissions in order to use this example
            applications
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContainer />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  noPermissionsText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
