import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
//connection check
import NetInfo from '@react-native-community/netinfo';
import socket from '../utils/socket.js';
//redux
import { useDispatch, useSelector } from 'react-redux';
//location and background
import Geolocation from 'react-native-geolocation-service';
import BackgroundService from 'react-native-background-actions';
import { collgePolygonInverted } from '../data/index';
import * as turf from '@turf/turf';

const ShareLocation = () => {
  const { _id: userId, name } = useSelector((state) => state.auth.user) || '';
  const [isEnabled, setIsEnabled] = useState(false);

  const polygon = turf.polygon(collgePolygonInverted);

  const sleep = (time) =>
    new Promise((resolve) => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            Geolocation.getCurrentPosition(
              (pos) => {
                const studentPointInverted = turf.point([
                  pos.coords.latitude,
                  pos.coords.longitude,
                ]);
                let status;
                if (turf.booleanPointInPolygon(studentPointInverted, polygon)) {
                  status = true;
                } else {
                  status = false;
                }
                console.log(i);
                const userData = {
                  status,
                  userId,
                  coords: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                  },
                };
                console.log(userData);
                socket.emit('user-location', userData);
                // console.log(name,userData.coords);
              },
              (error) => {
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true },
            );
          } else {
            const stop = async () => {
              console.log('stopping background track');
              await BackgroundService.stop();
            };
            stop();
          }
        });

        await sleep(delay);
      }
    });
  };

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
    if (!isEnabled) {
      runBackground();
    }
    if (isEnabled) {
      stopBackground();
    }
  };

  useEffect(() => {
    if (BackgroundService.isRunning()) {
      setIsEnabled(true);
    }
  }, []);

  const options = {
    taskName: 'background-location',
    taskTitle: 'Live Tracking',
    taskDesc: 'on',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      delay: 1000,
    },
  };

  //background run code
  const runBackground = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'New ExampleTask description',
    }); // Only Android,
  };
  const stopBackground = async () => {
    await BackgroundService.stop();
  };
  return (
    <View
      style={{
        width: '100%',
        height: 200,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: '100%',
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 20,
        }}
      >
        <View style={styles.toggleContainer}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'white',
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              // fontWeight: '600',
              color: '#fff',
              fontFamily: 'PlusJakartaSans-ExtraBold',
            }}
          >
            Share Location
          </Text>
          <Text style={{ color: '#fff' }}>{isEnabled ? 'ON' : 'OFF'}</Text>
          <Switch
            trackColor={{ false: 'grey', true: 'white' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
};

export default ShareLocation;

const styles = StyleSheet.create({
  toggleContainer: {
    width: '100%',
    paddingLeft: 25,
    backgroundColor: '#788D5D',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000000',
    elevation: 10,
  },
});
