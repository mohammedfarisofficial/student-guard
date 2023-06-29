import { View, Text, Button,StyleSheet } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../state/reducers/authSlice';

import Header from '../components/Header';
import ShareLocation from '../components/ShareLocation';
import SinglePersonMap from '../components/SinglePersonMap'

const StudentHomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      await dispatch(logoutUser());
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.rootContainer}>
      <Header/>
      <ShareLocation/>
      <SinglePersonMap/>
    </View>
  );
};

export default StudentHomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems:"center"
  }
})
