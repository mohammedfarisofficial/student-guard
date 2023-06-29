import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

import StudentItem from './StudentItem';
import Loading from './Loading';

const Outside = () => {
  const [headCoords, setHeadCoords] = useState({
    lat: null,
    lng: null,
  });
  const [studentsOutside, setStudentsOutside] = useState(null);
  const { students } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.mode);

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
  }, [students]);

  useEffect(() => {
    setStudentsOutside(()=>students.filter(student=>student.status===false))
  }, [students]);

  return (
    <ScrollView
      style={{ backgroundColor: theme === 'light' ? '#fff' : '#2d3427' }}
    >
      <Text style={styles.headerText}>Outside College</Text>
      {studentsOutside && headCoords.lat !== null ? (
        <View style={styles.container}>
          {studentsOutside.map((student) => (
            <StudentItem
              key={student._id}
              student={student}
              headCoords={headCoords}
            />
          ))}
        </View>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

export default Outside;

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
