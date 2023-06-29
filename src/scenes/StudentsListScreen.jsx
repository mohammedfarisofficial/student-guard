import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverURL } from '../utils/server.js';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from './../state/reducers/userSlice.js';
//comp
import StudentItem from '../components/StudentItem.jsx';
import ShareLocation from '../components/ShareLocation.jsx';
import Header from '../components/Header.jsx';
//navigation
import TopNavigator from '../navigation/TopNavigator.jsx';

const { width } = Dimensions.get('window');

const StudentsListScreen = ({ navigation }) => {
  const { students } = useSelector((state) => state.user);
  const { _id: userId, name } = useSelector((state) => state.auth.user) || '';
  const { theme } = useSelector((state) => state.mode);

  const dispatch = useDispatch();

  //check user logged
  useEffect(() => {
    const checkAsyncStorage = async () => {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        navigation.replace('Login');
      }
    };
    checkAsyncStorage();
  }, []);

  //fetch students
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get(`${serverURL}/user/students`);
        dispatch(setStudents(response?.data));
      } catch (error) {
        console.error(error);
      }
    };
    getStudents();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === 'light' ? '#fff' : '#3a4130',
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <ShareLocation />
        <View style={{ flex: 1,  }}>
          <TopNavigator />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StudentsListScreen;
