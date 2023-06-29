import {
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Mapbox from '@rnmapbox/maps';
import { back, refresh, streetView, streetViewHide } from '../contants/Icons';
import { collgePolygon } from '../data/index';
import { serverURL } from '../utils/server';
import axios from 'axios';

import AnnotationContent from '../components/AnnotationContent';

const markerCoordinate = [76.14814461016903, 10.564417196053261];
const styleURL = 'mapbox://styles/mapbox/outdoors-v12';

const TrackChildren = ({ navigation, route }) => {
  const [student, setStudent] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);


  //initial fetch
  useEffect(() => {
    setStudent(route.params.student);
  }, [route.params]);

  const refreshHandler = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(
        `${serverURL}/user/student/${student._id}`,
      );
      console.log('fetch triggered');
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // const requestLocationPermission = useCallback(async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message: 'App needs access to your location.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Location permission granted');
  //     } else {
  //       console.log('Location permission denied');
  //     }
  //   } catch (error) {
  //     console.log('Error requesting location permission:', error);
  //   }
  // }, []);

  // // Usage in a component
  // useEffect(() => {
  //   requestLocationPermission();
  // }, [requestLocationPermission]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.5}
        style={{ position: 'absolute', top: 33, left: 10, zIndex: 99 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            backgroundColor: 'white',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Image resizeMode="contain" style={{ width: 16 }} source={back} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setIsVisible(!isVisible)}
        style={{ position: 'absolute', top: 100, right: 10, zIndex: 99 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            backgroundColor: '#788D5D',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {isVisible ? (
            <Image
              style={{ width: 22 }}
              resizeMode="contain"
              source={streetViewHide}
            />
          ) : (
            <Image
              style={{ width: 22 }}
              resizeMode="contain"
              source={streetView}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={refreshHandler}
        style={{ position: 'absolute', top: 170, right: 10, zIndex: 99 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            backgroundColor: 'white',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {!isRefreshing && (
            <Image
              resizeMode="contain"
              style={{ width: 16 }}
              source={refresh}
            />
          )}
        </View>
      </TouchableOpacity>
      {
        student && (
          <Mapbox.MapView
        style={styles.rootContainer}
        styleURL={styleURL}
        attributionEnabled={false}
        pitchEnabled={true}
        logoEnabled={false}
        compassEnabled={true}
        scaleBarEnabled={false}
        compassPosition={{ top: 30, right: 10 }}
      >
        <Mapbox.Camera
          zoomLevel={16.2}
          centerCoordinate={[student.lng,student.lat]}
          animationMode={'flyTo'}
          pitch={45}
          heading={35}
        />

        {student !== null && isVisible && (
          <Mapbox.MarkerView
            key={student._id}
            coordinate={[student.lng, student.lat]}
            allowOverlap={true}
          >
            <AnnotationContent onPress={()=>{}} />
          </Mapbox.MarkerView>
        )}

        <Mapbox.ShapeSource
          id="myShapeSource"
          shape={{ type: 'Polygon', coordinates: [collgePolygon] }}
        >
          <Mapbox.FillLayer
            id="myFillLayer"
            style={{
              fillColor: '#788D5D',
              fillOpacity: 0.5,
              fillOutlineColor: 'red',
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
        )
      }
    </SafeAreaView>
  );
};

export default TrackChildren;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
