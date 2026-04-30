import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EyeIcon from 'react-native-vector-icons/Feather';
import UserIcon from 'react-native-vector-icons/FontAwesome6';
import Lock from 'react-native-vector-icons/Fontisto';
import { getUser } from '../services/authStorage';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../styles';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signupnvg = () => {
    navigation.navigate('signup', { navigation });
  };

  const forgetnvg = () => {
    navigation.navigate('forgetpassword', { navigation });
  };

  const getstartednvg = () => {
    navigation.navigate('getstarted', { navigation });
  };

  const login = async ()=> {
    const user = await getUser();

    if(!user ) {
      Alert('No Account found');
      return ;
    }

    if(user.username === username && user.password === password) {
      navigation.navigate('bottomTab')
    } else {
      Alert('Invalid credentails')
    }


    navigation.navigate('getstarted', { navigation });
  }

  return (
    <SafeAreaView>
    <StatusBar />
    {/* Headline Txt */}
      <View style={styles.headlineTxt}>
        <Text style={styles.wlcTxt}>Welcome Back!</Text>
      </View>

      {/* First input */}
      <View style={styles.firstInputCont}>
          <UserIcon name={"user-large"} size={24} color={'#626262'} style={styles.usericonCont} />
        <TextInput placeholder='Username or Email' style={styles.firstinput} onChangeText={setUsername}  />
      </View>

      {/* second input */}
      <View style={styles.scdInputCont}>
          <Lock name="locked" size={20} color={'#626262'} style={styles.lockCont} />
        <TextInput placeholder='Password' style={styles.scntInput} onChangeText={setPassword} />
          <EyeIcon name="eye"
            size={20}
            color={'#626262'} style={styles.eyeCont} />
      </View>

      {/* forget password */}
      <View style={styles.frgtCont}>
        <Text style={styles.frgtTxt} onPress={forgetnvg} >Forgot Password? </Text>
      </View>

      {/* Login Btn */}
      <View style={styles.btnCont}  > 
      <TouchableOpacity style={styles.btnOuter} onPress={getstartednvg} >
        <Text style={styles.btnTxt}>Login</Text>
      </TouchableOpacity>
      </View>


      {/* container of google */}
      <View style={styles.ggleCont}>
        <View style={styles.continueWithCont}>
          <Text style={styles.continueWithTxt}>- OR Continue with -</Text>
        </View>

        <View style={styles.socialMediaCont}>
          <View style={styles.ggleOuter}>
            <Image source={require('../assets/ggle.png')} style={styles.ggleImg}/>
          </View>

          <View style={{paddingLeft:10}}>
            <View style={styles.appleCont}> 
            <Image source={require('../assets/apple-icon.png')} />
          </View>
          </View>

          <View style={{paddingLeft:10}}>
            <View style={styles.appleCont}>
              <Image source={require('../assets/facebook-icon.png')} />
            </View>

          </View>
        </View>

        <View style={styles.signupCont}>
          <Text style={styles.signupTxt}>Create An Account <Text style={{color:'#F83758',textDecorationLine:'underline',fontWeight:'bold' }} onPress={signupnvg}>Sign Up</Text> </Text>
        </View>

      </View>

    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  headlineTxt: {
    paddingTop: SPACING.l, // 20
    paddingLeft: SPACING.xl + 7, // 31 exact
    paddingRight: 158,
    // backgroundColor:'#212529'
  },
  wlcTxt: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    // color:'#dee2e6'
  },
  firstInputCont: {
    paddingTop: 35,
    paddingLeft: 32,
    paddingRight: 25,
  },
  firstinput: {
    borderWidth: 1,
    borderColor: '#A8A8A9',
    paddingLeft: 38,
    paddingVertical: 20,
    borderRadius: RADIUS.md, // 10
    fontSize: FONT_SIZE.s,
    fontWeight: 'bold',
  },
  scdInputCont: {
    paddingTop: 30,
    paddingLeft: 32,
    paddingRight: 25,
  },
  scntInput: {
    borderWidth: 1,
    borderColor: '#A8A8A9',
    paddingLeft: 40,
    paddingVertical: 20,
    borderRadius: RADIUS.md,
    fontSize: FONT_SIZE.s,
    fontWeight: 'bold',
  },
  frgtCont: {
    paddingTop: 10,
    paddingRight: 25,
    alignSelf: 'flex-end',
  },
  frgtTxt: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.s,
  },
  btnCont: {
    paddingTop: 52,
    paddingHorizontal: 30,
  },
  btnOuter: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
  },
  btnTxt: {
    paddingVertical: 15,
    paddingHorizontal: 130,
    color: COLORS.white,
    fontSize: FONT_SIZE.xxl, // 20
    fontWeight: 'bold',
  },
  ggleCont: {
    paddingTop: 75,
    paddingHorizontal: 90,
  },
  continueWithCont: {
    paddingHorizontal: 30,
  },
  continueWithTxt: {
    fontSize: FONT_SIZE.s,
    color: '#575757',
  },
  socialMediaCont: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  ggleOuter: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 50,
    backgroundColor: '#FCF3F6',
    padding: 15,
    width: 54,
  },
  appleCont: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#FCF3F6',
    width: 55,
    borderRadius: 50,
  },
  signupCont: {
    paddingTop: 28,
  },
  signupTxt: {
    color: '#575757',
    fontSize: FONT_SIZE.m,
  },
  usericonCont: {
    position: 'absolute',
    paddingLeft: 43,
    paddingTop: 52,
  },
  lockCont: {
    position: 'absolute',
    paddingLeft: 47,
    paddingTop: 48,
  },
  eyeCont: {
    position: 'absolute',
    right: 50,
    bottom: 18,
  },
  

});
