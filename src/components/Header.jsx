import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { notification } from '../contants/Icons.js';

const Header = () => {
  const { name } = useSelector((state) => state.auth.user) || '';
  const { theme } = useSelector(state=> state.mode)
  const { push } = useNavigation();
  
  return (
    <View
      style={{
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '7%',
        backgroundColor:theme==="light"? '#fff':'#3a4130',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            overflow: 'hidden',
          }}
        >
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            source={{
              uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-774909.jpg&fm=jpg',
            }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ marginBottom: -3, color: 'grey' }}>Welcome Back</Text>
          <Text style={{ fontSize: 17, fontWeight: '500', color: 'black' }}>
            {name ? name : ''}!🤟
          </Text>
        </View>
      </View>
      <TouchableOpacity
      onPress={()=>push('Notification')}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f6f6f6',
        }}
      >
        <Image
          resizeMode="contain"
          style={{ width: 23, height: 23 }}
          source={notification}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
