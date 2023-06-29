import {
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Mapbox from '@rnmapbox/maps';
import AnnotationContent from './AnnotationContent';

const styleURL = 'mapbox://styles/mapbox/outdoors-v12';
const markerCoordinate = [76.14814461016903, 10.564417196053261]; // Example coordinate for ies

const SinglePersonMap = () => {
  // const requestLocationPermission = useCallback(async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message: 'Student Guard needs access to your location.',
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

  // const AnnotationContent = ({ student }) => (
  //   <TouchableOpacity
  //     // onPress={() => handlePresentPress(student)}
  //     style={styles.touchable}
  //   >
  //     <View
  //       style={{
  //         width: 40,
  //         height: 40,
  //         backgroundColor: 'white',
  //         borderRadius: 50,
  //         borderWidth: 1,
  //         borderColor: '#fff',
  //         overflow: 'hidden',
  //       }}
  //     >
  //       <Image
  //         style={{ width: '100%', height: '100%' }}
  //         resizeMode="cover"
  //         source={{
  //           uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-774909.jpg&fm=jpg',
  //         }}
  //       />
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerText}>Your Location</Text>
      <View style={styles.mapContainer}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={styleURL}
        attributionEnabled={false}
        pitchEnabled={true}
        logoEnabled={false}
        scaleBarEnabled={false}
      >
        <Mapbox.Camera
          zoomLevel={16.2}
          centerCoordinate={markerCoordinate}
          animationMode={'flyTo'}
          pitch={45}
          heading={35}
        />
<Mapbox.MarkerView
            coordinate={markerCoordinate}
            allowOverlap={true}
          >
            <AnnotationContent onPress={()=>{}} />
          </Mapbox.MarkerView>

      </Mapbox.MapView>
      </View>
    </View>
  )
}

export default SinglePersonMap

const styles = StyleSheet.create({
  rootContainer: {
    width: '90%',
    height: 430,
    marginVertical:10,
  },
  mapContainer: {
    flex:1,
    marginTop:10,
    overflow:"hidden",
    borderRadius: 20
  },
  map: {
    flex: 1,
  },
  headerText: {
    left: '6%',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
    color: 'black',
  },
})