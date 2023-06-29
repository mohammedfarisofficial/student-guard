import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import {
  home,
  homeSolid,
  bitEmoji,
  user,
  direction,
  streetView,
  streetViewHide,
} from '../contants/Icons';

import { setStudents } from '../state/reducers/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../utils/socket';
import { serverURL } from '../utils/server.js';
import { collgePolygon,mainBlock } from '../data/index';
import axios from 'axios';

import StudentModal from '../components/StudentModal';
import AnnotationContent from '../components/AnnotationContent'

// packages
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-community/clipboard';
import Mapbox from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import { point, distance } from '@turf/turf';

const { width, height } = Dimensions.get('window');
const markerCoordinate = [76.14814461016903, 10.564417196053261]; // Example coordinate for ies

const MapScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.mode);
  const { students } = useSelector((state) => state.user);
  const [prevStudent, setPrevStudent] = useState({
    __v: 0,
    _id: '647484fc2bca46e3cfc001dc',
    dept: 'CSE',
    email: 'ranna@email.com',
    headId: '6458e0b0dab6882420b8c738',
    lat: '10.564694599479678',
    lng: '76.14793239052409',
    name: 'Fathima Ranna',
    password: '$2b$10$zjCYqAzmB7F2sKygh7OMs.CLtwhX/mXzKQj3SBEJ9rHyDxmiUbCX2',
    role: 'student',
  });
  
  //ref
  const bottomRef = useRef(null);
  const camera = useRef(null);

  const dispatch = useDispatch();

  // style url for mapbox ( for dark and light modes )
  const styleURL =
    theme === 'light'
      ? 'mapbox://styles/mapbox/outdoors-v12'
      : 'mapbox://styles/mohammedfarisofficial1/clfgrkcas000801qxj8qp9reg';

  

  //check user not login and return to login page
  useEffect(() => {
    const checkAsyncStorage = async () => {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        navigation.replace('Login');
      }
    };
    checkAsyncStorage();
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get(`${serverURL}/user/students`);
        if (response.data) {
          dispatch(setStudents(response.data));

          const newMarkers = students.map((student) => {
            return (
              <Mapbox.MarkerView
                key={student._id}
                coordinate={[student.lng, student.lat]}
                allowOverlap={true}
              >
                <AnnotationContent onPress={() => handlePresentPress(student)} />
              </Mapbox.MarkerView>
            );
          });
          setMarkers(newMarkers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getStudents();
  }, []);

  const isFirstRender = useRef(true);

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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (currentStudent) {
        if (prevStudent._id === currentStudent._id) {
          console.log('same person');
          setIsOpen(false);
        } else {
          console.log('diffrent person');
          setPrevStudent(currentStudent);
          setIsOpen(true);
        }
      }
    }
  }, [isActive]);

  const handlePresentPress = (student) => {
    bottomRef.current.present();
    setCurrentStudent(student);
  };
  const handleClose = () => bottomRef.current.dismiss();

  useEffect(() => {
    socket.on('positionUpdate', (data) => {
      let studentsArr = [...students];
      const student = studentsArr.filter(
        (student) => student._id === data.fullDocument._id,
      );
      student[0].lat = data.fullDocument.lat;
      student[0].lat = data.fullDocument.lat;

      const newStudents = studentsArr.map((student) => {
        if (student._id === data.fullDocument._id) {
          return student;
        }
        return student;
      });
      dispatch(setStudents(newStudents));
      const newMarkers = newStudents.map((student) => {
        return (
          <Mapbox.MarkerView
            key={student._id}
            coordinate={[student.lng, student.lat]}
            allowOverlap={true}
          >
            <AnnotationContent onPress={() => handlePresentPress(student)} />
          </Mapbox.MarkerView>
        );
      });

      setMarkers(newMarkers);
    });
  }, [markers]);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '25%'], []);

  // renders

  const resumeLocation = () => {
    camera.current.setCamera({
      centerCoordinate: markerCoordinate,
      zoomLevel: 16.2,
      animationDuration: 2000, // Animation duration in milliseconds
    });
  };

  console.log('map render');
  return (
    <View style={styles.page}>
      <TouchableOpacity
        onPress={() => setIsLive(!isLive)}
        style={{ position: 'absolute', top: 65, right: 10, zIndex: 99 }}
        activeOpacity={0.5}
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
          {isLive ? (
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
        onPress={resumeLocation}
        style={{ position: 'absolute', top: 125, right: 10, zIndex: 99 }}
        activeOpacity={0.5}
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
          <Image
            style={{ width: 25 }}
            resizeMode="contain"
            source={direction}
          />
        </View>
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          styleURL={styleURL}
          attributionEnabled={false}
          pitchEnabled={true}
          logoEnabled={false}
          compassEnabled={true}
          scaleBarEnabled={false}
          compassPosition={{ top: 30, right: 10 }}
          onDidFinishLoadingMap={() => setIsMapLoaded(true)}
        >
          <Mapbox.Camera
            ref={camera}
            zoomLevel={16.2}
            centerCoordinate={markerCoordinate}
            animationMode={'flyTo'}
            pitch={45}
            heading={35}
          />

          {isLive && markers}
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

          <Mapbox.ShapeSource
            id="myShapeSource1"
            shape={{ type: 'Polygon', coordinates: [mainBlock] }}
          >
            <Mapbox.FillLayer
              id="myFillLayer1"
              style={{
                fillColor: '#788D5D',
                fillOpacity: 1,
                fillOutlineColor: 'red',
              }}
            />
          </Mapbox.ShapeSource>



        </Mapbox.MapView>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{ borderRadius: 40 }}
            handleIndicatorStyle={{
              width: 38,
              height: 6,
              backgroundColor: 'lightgrey',
            }}
          >
            <View style={styles.bottomSheetContainer}>
              <View style={styles.profileContainer}>
                <View
                  style={{
                    width: '85%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                      source={{
                        uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-774909.jpg&fm=jpg',
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 23,
                        fontWeight: '600',
                        color: 'black',
                      }}
                    >
                      {currentStudent?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        console.log(Clipboard.setString(currentStudent?._id))
                      }
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: 'grey',
                        }}
                      >
                        STUDENT ID:{currentStudent?._id}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={handleClose}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                      backgroundColor: 'lightgrey',
                    }}
                  ></TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 0.1,
                  backgroundColor: 'lightgrey',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{ color: 'grey', fontWeight: '500', fontSize: 14 }}
                >
                  Distance from you
                </Text>
                <View style={{ paddingTop: 15 }}>
                  <Text
                    style={{ color: 'black', fontWeight: '500', fontSize: 20 }}
                  >
                    30m.
                  </Text>
                </View>
              </View>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height,
    width,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  touchableText: {
    color: 'white',
    fontWeight: '500',
  },
  polygonStyle: {
    fillColor: 'rgba(0, 0, 255, 0.5)',
    fillOutlineColor: 'blue',
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  profileContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 10,
  },
});
