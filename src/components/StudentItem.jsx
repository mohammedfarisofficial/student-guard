import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import * as turf from '@turf/turf';
import { collgePolygonInverted } from '../data/index';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const StudentItem = ({ student, headCoords }) => {
  const [dist, setDist] = useState(0);
  const [isOut, setIsOut] = useState(false);
  const { theme } = useSelector(state=>state.mode)

  useEffect(() => {
    //distance
    const headPoint = turf.point([headCoords.lng, headCoords.lat]);
    const studentPoint = turf.point([+student.lng, +student.lat]);
    const options = { units: 'meters' };
    
    const distanceBetweenHeadStudent = turf.distance(
      headPoint,
      studentPoint,
      options,
    );
    setDist(distanceBetweenHeadStudent.toFixed(2));

    //in or out
    const studentPointInverted = turf.point([+student.lat, +student.lng]);
    const polygon = turf.polygon(collgePolygonInverted);
    if (turf.booleanPointInPolygon(studentPointInverted, polygon)) {
      setIsOut(false);
    } else {
      setIsOut(true);
    }
  }, [dist, student, headCoords]);

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme === 'light' ? '#fff' : '#2d3427',
        },
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1 }}
            resizeMode="cover"
            source={{
              uri: 'https://www.preplounge.com/assets/images/account/no-profile-image-4.png',
              // uri:"https://api.multiavatar.com/Binx%20Bond.png"
            }}
          />
        </View>
        <View>
          <Text
            style={{ fontFamily: 'PlusJakartaSans-SemiBold', color: 'grey' }}
          >
            {student.name}
          </Text>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Medium',
              color:"grey"
            }}
          >
            {dist}m from you
          </Text>
        </View>
      </View>
      <View style={styles.status}>
        {isOut ? (
          <Text
            style={[
              styles.stautsText,
              { color: '#802000', fontFamily: 'PlusJakartaSans-SemiBold' },
            ]}
          >
            OUTSIDE
          </Text>
        ) : (
          <Text
            style={[
              styles.stautsText,
              { color: '#208000', fontFamily: 'PlusJakartaSans-SemiBold' },
            ]}
          >
            INSIDE
          </Text>
        )}
      </View>
    </View>
  );
};

export default StudentItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: '90%',
    shadowColor: '#959191',
    elevation: 2,
    height: 80,
    borderRadius: 20,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  status: {
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#b3b3b3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  stautsText: {
    fontWeight: '500',
    fontSize:11.5
  },
});
