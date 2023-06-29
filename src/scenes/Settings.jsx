import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../state/reducers/authSlice';
import { clearStudent } from '../state/reducers/userSlice';
import { setTheme } from '../state/reducers/modeSlice';

//comp
import HorizontalLine from '../components/HorizontalLine';
import SettingsItem from '../components/SettingsItem';
import Loading from '../components/Loading';

import axios from 'axios';
import { serverURL } from '../utils/server';
import { register, dark, light, logout } from '../contants/Icons';

const { width } = Dimensions.get('window');

const Settings = ({ navigation }) => {

  const { theme } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        navigation.replace('Login');
      }
    };
    checkAsyncStorage();
  }, []);

  const logOut = async () => {
    setIsLoading(true);
    try {
      await dispatch(logoutUser());
      await dispatch(clearStudent());
      const response = await axios.get(`${serverURL}/auth/logout/${user._id}`);
      console.log(response.data);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  // theme switcher 
  const switchMode = () => {
    let mode;
    if (theme === 'light') {
      mode = 'dark';
    } else {
      mode = 'light';
    }
    dispatch(setTheme(mode));
  };


  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Settings</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: '95%', height: '95%', borderRadius: 50 }}
            resizeMode="cover"
            source={{
              uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-774909.jpg&fm=jpg',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            fontWeight: '500',
            color: '#000',
          }}
        >
          {user?.name}
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginTop: -1,
            fontWeight: '400',
            color: 'grey',
          }}
        >
          ID: {user?._id.toUpperCase()}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 200,
            height: 50,
            backgroundColor: '#788D5D',
            marginVertical: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 15,
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
      <HorizontalLine />
      { 
        user?.role === "head" && (
          <SettingsItem
        title="Register Student"
        icon={register}
        onPress={() => navigation.navigate('Register')}
        navControl
      />
        )
      }
      
      <SettingsItem
        title="Dark Mode"
        icon={theme === 'light' ? light : dark}
        navControl
        onPress={switchMode}
      />
      <SettingsItem title="Change Password" icon={register} onPress={() => {}} />
      <SettingsItem title="Logout" icon={logout} onPress={logOut} />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
  profileContainer: {
    width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#788D5D',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
