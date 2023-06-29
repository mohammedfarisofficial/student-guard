import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLogin } from '../state/reducers/authSlice';
import axios from 'axios';
import { serverURL } from '../utils/server';
import { logo } from '../contants/images';
import ButtonFull from '../components/ButtonFull';

const { height, width } = Dimensions.get('window');

const roles = ['student', 'head'];

const TrackForm = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [trackId, setTrackId] = useState('');

  const trackHandler = async () => {
    console.log(trackId);
    try {
      const response = await axios.get(`${serverURL}/user/student/${trackId}`);
      if (response.data) {
        console.log(response.data.name + "'s details found");
        Alert.alert('Your Child found!', response.data.name, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () =>  navigation.navigate("TrackChildren",{student:response.data})},
        ]);
      } else {
        console.log('Student not found');

      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.log('Student not found');
          Alert.alert('Student not found!', "Please double check your child' ID", [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        } else if (error.response.status === 400) {
          console.log('Invalid student ID');
          Alert.alert('Invalid student ID', "please enter valid child' ID", [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
          
        } else {
          console.log(error.message);
        }
      } else {
        console.log(error.message);
      }
    }
  };

  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          marginVertical: 30,
          justifyContent: 'center',
          alignItems:"center",
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{ width: 230, height: 100 }}
            resizeMode="contain"
            source={logo}
          />
        </View>
        <Text style={{ fontWeight: '400',color:'grey' }}>
          You can enter your child's student id and track!
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Student ID</Text>
      </View>
      <TextInput
        onChangeText={(text) => setTrackId(text)}
        placeholderTextColor="#A7A7AF"
        placeholder="Enter student id"
        selectionColor={'#38B38B'}
        style={[styles.inputContainer]}
      />
      <ButtonFull onPress={trackHandler} text="Track Student"/>
    </View>
  );
};

export default TrackForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    color: '#262626',
    marginVertical: 6,
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#D9D9E2',
  },
  labelContainer: {
    width: '100%',
  },
  labelText: {
    marginLeft: '7%',
    fontWeight: '500',
    color: 'black',
  },
});
