import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const ButtonFull = ({onPress,text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.loginBtn}>
        <LinearGradient
          colors={['#38B38B', '#04746E']}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.loginText}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
  )
}

export default ButtonFull

const styles = StyleSheet.create({
    loginBtn: {
        marginTop: 20,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        shadowColor: '#52006A',
      },
      loginText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
      },
})