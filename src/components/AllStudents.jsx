import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

import StudentItem from './StudentItem';
import Loading from './Loading';

const AllStudents = () => {

  const [headCoords, setHeadCoords] = useState({
    lat: null,
    lng: null,
  });
  const { students } = useSelector((state) => state.user);
  const { theme } = useSelector(state=>state.mode)


  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setHeadCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true },
    );
    return Geolocation.clearWatch()

  }, [students]);
  
  console.log('rerendering')
  
  return (
    <ScrollView style={{backgroundColor:theme==="light"? '#fff':'#3a4130'}}>
      <Text style={styles.headerText}>All Students</Text>
      {students !==null && headCoords.lat !==null ? (
        <View style={styles.container}>
          {students.map((student) => (
            <StudentItem
              key={student._id}
              student={student}
              headCoords={headCoords}
            />
          ))}
        </View>
      ) : (
        <Loading/>
      )}
    </ScrollView>
  );
};

export default AllStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    left: '6%',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
    color: 'black',
  },
});
