import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <>
      <View style={styles.container}>
        

        {/* photo */}
        <View style={styles.picView}>
            <Image source={require('../assets/profile-picture.png')} height={98} width={103} />
        </View>
      </View>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    picView:{
        paddingTop:30,
        paddingHorizontal:135
    }
})