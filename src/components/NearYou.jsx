import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

import StudentItem from './StudentItem';
import Loading from './Loading';

const NearYou = () => {
  const { students } = useSelector((state) => state.user);
  const [studentInside,setStudentsInside] = useState(null)
  const { theme } = useSelector(state=>state.mode)

  const [headCoords, setHeadCoords] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setHeadCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true },
    );
  }, [students]);

  useEffect(() => {
    setStudentsInside(()=>students.filter(student=>student.status===true))
  }, [students])
  

  return (
    <ScrollView style={{backgroundColor:theme==="light"? '#fff':'#2d3427'}}>
      <Text style={styles.haederText}>Near you</Text>
      {studentInside && headCoords.lat !== null  ? (
        <View style={styles.container}>
          {studentInside.map((student) => (
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

export default NearYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  haederText: {
    left: '6%',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
    color: 'black',
  },
});
