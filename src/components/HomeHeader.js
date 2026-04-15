import { Image,  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const HomeHeader = ({ handleSearch }) => {
  return (
    <>
    
      <View style={styles.container}>
      
      {/* hdr line */}
      <TouchableOpacity>
        <Image
          source={require('../assets/hdr-lines.png')}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* logo */}
      <View style={styles.center}>
        <Image
          source={require('../assets/stylish-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Stylish</Text>
      </View>

      {/* Profile */}
      <TouchableOpacity>
        <Image
          source={require('../assets/profile-picture.png')}
          style={styles.profile}
        />
      </TouchableOpacity>

    </View>

    {/* SearchBox */}
    <View style={styles.searchBoxCont}>
      <TextInput placeholder='Search any Product..' style={styles.searchinput} onChangeText={handleSearch} />
    </View>
    </>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4392F9',
    marginLeft: 6,
    fontFamily: 'libreCaslonText',
  },

  profile: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  searchBoxCont:{
    padding:16
  },
  searchinput:{
    borderColor:'#FFFFFF',
    borderWidth:1,
    borderRadius:6,
    backgroundColor:'#FFFFFF',
    paddingLeft:46,
    color:'#BBBBBB',
  }
})