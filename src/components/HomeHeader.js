import { Image,  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';

const HomeHeader = ({ handleSearch }) => {
  return (
    <>
    
      <View style={styles.container}>
      
      {/* LEFT MENU */}
      <TouchableOpacity>
        <Image
          source={require('../assets/hdr-lines.png')}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* CENTER LOGO */}
      <View style={styles.center}>
        <Image
          source={require('../assets/stylish-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Stylish</Text>
      </View>

      {/* RIGHT PROFILE */}
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
    paddingHorizontal: SPACING.m, // 16
    backgroundColor: COLORS.white,
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
    fontSize: FONT_SIZE.l, // 18
    fontWeight: 'bold',
    color: COLORS.secondary, // #4392F9
    marginLeft: SPACING.s, // 6 approx (closest match)
    fontFamily: 'libreCaslonText',
  },

  profile: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  searchBoxCont: {
    padding: SPACING.m,
  },

  searchinput: {
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: RADIUS.sm, // 6
    backgroundColor: COLORS.white,
    paddingLeft: 46,
    color: '#BBBBBB',
  },
})