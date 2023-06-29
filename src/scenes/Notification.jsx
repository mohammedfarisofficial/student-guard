import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View style={{alignItems:"center",flex: 1,paddingTop:10}}>
    <View style={{ width: 60,height:7,backgroundColor:"lightgrey",marginBottom:30}}/>
      <Text style={{ color:"black" }}>No Notifications</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})