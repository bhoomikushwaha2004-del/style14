import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoItem = () => {
  return (
    <View style={{top:300, left:100}}> 
            <Text style={{fontSize:18,fontWeight:'bold'}}>No items in Cart 🛒 </Text>
          </View>
  )
}

export default NoItem

const styles = StyleSheet.create({})