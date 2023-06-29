import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';
import { serverURL } from '../utils/server.js';
//state management
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLogin } from '../state/reducers/authSlice';
//ui package
import SelectDropdown from 'react-native-select-dropdown';
//components
import Loading from '../components/Loading.jsx';
import ButtonFull from '../components/ButtonFull.jsx';
// display notification
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import { logo } from '../contants/images.js';
const roles = ['student', 'head'];

const { height, width } = Dimensions.get('window');


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [notificationToken, setNotificationToken] = useState('');

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  //firebase fcm
  const requestFCMPermission = async () => {
    const authResponse = await messaging().requestPermission();
    const enabled =
      authResponse === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      setNotificationToken(fcmToken);
    }
  };
  const onMessageHandler = async (remoteMessage) => {
    const { notification, data } = remoteMessage;
    console.log(notification, data);
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  useEffect(() => {
    requestFCMPermission();
    const unsubMessaging = messaging().onMessage(onMessageHandler);
    return () => {
      unsubMessaging();
    };
  }, []);

  //end firebase fcm

  const formData = {
    email,
    password,
    role,
    notificationToken,
  };

  useEffect(() => {
    setIsLoading(true);
    const checkAsyncStorage = async () => {
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      if (user && token) {
        dispatch(setLogin({ user: JSON.parse(user), token: token }));
        if (JSON.parse(user).role === 'student') {
          navigation.navigate('StudentHomeScreen');
          setIsLoading(false);
        } else {
          navigation.navigate('Home');
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    checkAsyncStorage();
  }, []);

  // basic form validation
  const checkFields = () => {
    if (email === '' && password === '') {
      console.log('you should fill the form');
      return false;
    }
    if (email !== '' && password === '') {
      console.log('password is empty');
      return false;
    }
    if (email === '' && password !== '') {
      console.log('email is empty');
      return false;
    }
    return true;
  };

  const loginHandler = async () => {
    if (checkFields()) {
      try {
        setIsLoading(true);
        const options = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.post(
          `${serverURL}/auth/login`,
          formData,
          options,
        );
        if (response.data) {
          console.log(response.data.user.role);
          dispatch(
            setLogin({ user: response.data.user, token: response.data.token }),
          );
          try {
            await AsyncStorage.setItem(
              'user',
              JSON.stringify(response.data.user),
            );
            await AsyncStorage.setItem('token', response.data.token);
          } catch (e) {
            console.log(e);
          }
          
          if (response.data.user.role === 'student') {
            navigation.navigate('StudentHomeScreen');
          }
          if (response.data.user.role === 'head') {
            navigation.navigate('Home');
          }
        }
      } catch (error) {
        console.error(error.message);
      }finally{
        setIsLoading(false);
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View
        style={{
          width: width,
          height: height / 7,
          marginVertical: 30,
          justifyContent: 'center',
          justifyContent:'center',
          alignItems:'center'
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
        <Text style={{ fontWeight: '400',color:"grey" }}>
          Welcome back 👋, you've been missed!
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Email Address</Text>
      </View>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#A7A7AF"
        placeholder="Enter your email"
        selectionColor={'#38B38B'}
        style={[styles.inputContainer, isEmailActive && styles.activeStyle]}
        onFocus={() => setIsEmailActive(true)}
        onBlur={() => setIsEmailActive(false)}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Password</Text>
      </View>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor="#A7A7AF"
        selectionColor={'#38B38B'}
        style={[styles.inputContainer, isPasswordActive && styles.activeStyle]}
        onFocus={() => setIsPasswordActive(true)}
        onBlur={() => setIsPasswordActive(false)}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Select</Text>
      </View>
      <SelectDropdown
        data={roles}
        defaultValueByIndex={0}
        onSelect={(selectedItem, index) => {
          setRole(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          if(selectedItem ==="head") {
            return "faculty"
          }
          return selectedItem
        }}
        rowTextForSelection={(item) => {
          if(item ==="head") {
            return "faculty"
          }
          return item
        }}
        dropdownStyle={{
          borderRadius: 10,
        }}
        buttonStyle={[styles.inputContainer, { width: '50%' }]}
        buttonTextStyle={{ fontSize: 15, fontWeight: '500' }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('TrackForm')} activeOpacity={.5}>
        <Text style={{ fontWeight: '600', color: 'grey' }}>
          Are you a parent? ‎
          <Text style={{ fontWeight: '500', color: '#04746E' }}>
            Tracker your child
          </Text>
        </Text>
      </TouchableOpacity>
      <ButtonFull onPress={loginHandler} text="Sign In"/>
      <Text style={{ marginTop: 100 }}>
        Don't have an account?{' '}
        <Text style={{ fontWeight: '500', color: '#04746E' }}>Sign Up</Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  activeStyle: {
    shadowColor: '#19907A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  }
});
