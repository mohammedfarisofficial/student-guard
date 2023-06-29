import { View, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'

const AnnotationContent = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.touchable}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'white',
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#fff',
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
      </View>
    </TouchableOpacity>
  )
}

export default AnnotationContent

const styles = StyleSheet.create({
    touchable: {
        width: 90,
        height: 120,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
})