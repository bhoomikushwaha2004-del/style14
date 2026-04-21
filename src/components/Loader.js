import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import HomeHeader from './HomeHeader'
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';

const Loader = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ActivityIndicator size={'large'} style={styles.loader}/>
      <Text style={styles.txt}>Please wait while your screen is being load!!!!!!</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loader: {
    justifyContent: 'center',
    marginTop: 300,
  },
  txt: {
    marginLeft: 50,
    marginTop: SPACING.s,
    fontSize: FONT_SIZE.s,
    color: COLORS.gray,
  },
})