import { Image,  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';
import Search from 'react-native-vector-icons/Fontisto'
import Mic from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { micEvents,SpeechToText } from 'react-native-speech-convertor'

const HomeHeader = ({ handleSearch }) => {
  const navigation = useNavigation()
  const [text, setText] = useState('');
  const [ isListening, setIsListening] = useState(false)



  const drawernvg =()=> {
    navigation.openDrawer()
  }

  

    useEffect(() => {
        const resultListener = micEvents.addListener('onSpeechResult', setText);
        const errorListener = micEvents.addListener('onSpeechError', console.error);

        return () => {
            resultListener.remove();
            errorListener.remove();
        };
    }, []);

  
  return (
    <>
    
      <View style={styles.container}>
      
      {/* hdr line */}
      <TouchableOpacity onPress={drawernvg} >
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
      <TouchableOpacity onPress={()=> navigation.navigate('profile')}>
        <Image
          source={require('../assets/profile-picture.jpg')}
          style={styles.profile}
        />
      </TouchableOpacity>

    </View>

    {/* SearchBox */}
    <View style={styles.searchBoxCont}>
      <Search name='search' size={20} style={styles.srchicon}  />
      <TextInput placeholder='Search any Product..' style={styles.searchinput} onChangeText={handleSearch} />
      
      {/* Mic */}
      <TouchableOpacity
      style={isListening ? styles.micStyling : null } 
      onPress={()=> { setIsListening(true)
        setTimeout(() => {
          SpeechToText.startListening()
        }, 5000);
        setIsListening(false)
        SpeechToText.stopListening() }
      }
       
      >
        <Mic name='mic-none' size={24} style={styles.micIcon} />
      </TouchableOpacity>
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
    top:20
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
  srchicon:{
    position:'absolute',
    zIndex:1,
    left:32,
    top:26,
    color:COLORS.grey4
  },
  micIcon:{
    // left:320,
    position:'absolute',
    top:24,
    alignSelf:'flex-end',
    right:32,
    color:COLORS.grey4
  }
})