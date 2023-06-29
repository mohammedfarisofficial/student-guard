import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverURL } from '../utils/server';
import { back, register } from '../contants/Icons';

import ButtonFull from '../components/ButtonFull'

const { width } = Dimensions.get('window');

const RegisterScreen = ({navigation}) => {
  const {_id, dept,lat,lng, } = useSelector(state=>state.auth.user)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isLoading,setIsLoading] = useState(false)


  const formData = {
    name,
    email,
    password,
    dept,
    lat, // just for default location
    lng,
    role: "student",
    headId: _id
  }

  const registerHandler = async () => {
    setIsLoading(true);
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        `${serverURL}/auth/register`,
        formData,
        options,
      );
      if (response.data) {
        console.log(response.data)
        Alert.alert(" New Student created!");
        navigation.goBack()
        setName("")
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      console.error(error.message);
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={()=>navigation.goBack()}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            left: 30,
          }}
        >
          <View
          style={{
            width: 44,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Image resizeMode="contain" style={{ width: 16 }} source={back} />
        </View>
        </TouchableOpacity>
        <Text style={styles.titleText}>Register</Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Student Name</Text>
        </View>
        <TextInput
          placeholderTextColor="#A7A7AF"
          placeholder="Enter student name"
          selectionColor={'#38B38B'}
          style={styles.inputContainer}
          onChangeText={(text)=>setName(text)}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Student Email</Text>
        </View>
        <TextInput
          placeholderTextColor="#A7A7AF"
          placeholder="Enter student email"
          selectionColor={'#38B38B'}
          style={styles.inputContainer}
          onChangeText={(text)=>setEmail(text)}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Student Password</Text>
        </View>
        <TextInput
          placeholderTextColor="#A7A7AF"
          placeholder="Enter student password"
          selectionColor={'#38B38B'}
          style={styles.inputContainer}
          onChangeText={(text)=>setPassword(text)}
        />
      <ButtonFull onPress={registerHandler} text={isLoading ? "loading" : "Register Student"}/>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
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
