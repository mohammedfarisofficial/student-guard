import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{flex: 1,justifyContent:'center',alignItems:"center"}}>
    <ActivityIndicator size="large" color="#788D5D" />
  </View>
  )
}

export default Loading