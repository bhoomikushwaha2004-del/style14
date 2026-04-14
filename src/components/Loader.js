import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import HomeHeader from './HomeHeader'

const Loader = () => {
  return (
    <View>
      <HomeHeader />
      <ActivityIndicator size={'large'} style={styles.loader}/>
      <Text style={styles.txt}>Please wait while your screen is being load!!!!!!</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loader:{
        justifyContent:'center',
        marginTop:300
    },
    txt:{
        marginLeft:50,
        marginTop:10
    }
})