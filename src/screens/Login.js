import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import UserIcon from 'react-native-vector-icons/FontAwesome6';
import Lock from 'react-native-vector-icons/Fontisto';
import EyeIcon from 'react-native-vector-icons/Feather';

const Login = () => {
  const navigation = useNavigation();

  const signupnvg = () => {
    navigation.navigate('signup', { navigation });
  };

  const forgetnvg = () => {
    navigation.navigate('forgetpassword', { navigation });
  };

  const getstartednvg = () => {
    navigation.navigate('getstarted', { navigation });
  };

  return (
    <>
    <StatusBar />
    {/* Headline Txt */}
      <View style={styles.headlineTxt}>
        <Text style={styles.wlcTxt}>Welcome Back!</Text>
      </View>

      {/* First input */}
      <View style={styles.firstInputCont}>
          <UserIcon name={"user-large"} size={24} color={'#626262'} style={styles.usericonCont} />
        <TextInput placeholder='Username or Email' style={styles.firstinput}/>
      </View>

      {/* second input */}
      <View style={styles.scdInputCont}>
          <Lock name="locked" size={20} color={'#626262'} style={styles.lockCont} />
        <TextInput placeholder='Password' style={styles.scntInput} />
          <EyeIcon name="eye"
            size={20}
            color={'#626262'} style={styles.eyeCont} />
      </View>

      {/* forget password */}
      <View style={styles.frgtCont}>
        <Text style={styles.frgtTxt} onPress={forgetnvg} >Forgot Password? </Text>
      </View>

      {/* Login Btn */}
      <View style={styles.btnCont} > 
      <TouchableOpacity style={styles.btnOuter} onPress={getstartednvg}>
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

    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  headlineTxt:{
    paddingTop:20,
    paddingLeft:31,
    paddingRight:158,
    
  },
  wlcTxt:{
    fontSize:36,
    fontWeight:'bold',
    fontFamily:'Montserrat-Bold'
  },
  firstInputCont:{
    paddingTop:35,
    paddingLeft:32,
    paddingRight:25,
    // flexDirection:''
    // borderWidth:1
  },
  firstinput:{
    borderWidth:1,
    borderColor:'#A8A8A9',
    paddingLeft:38,
    paddingVertical:20,
    borderRadius:10,
    fontSize:12,
    fontWeight:'bold'
  },
  scdInputCont:{
    paddingTop:30,
    paddingLeft:32,
    paddingRight:25
  },
  scntInput:{
    borderWidth:1,
    borderColor:'#A8A8A9',
    paddingLeft:40,
    paddingVertical:20,
    borderRadius:10,
    fontSize:12,
    fontWeight:'bold'
  },
  frgtCont:{
    paddingTop:10,
    paddingRight:25,
    alignSelf:'flex-end'
  },
  frgtTxt:{
    color:'#F83758',
    fontSize:12,
  },
  btnCont:{
    paddingTop:52,
    paddingHorizontal:30,
    // backgroundColor:'#F83758',
  },
  btnOuter:{
    backgroundColor:'#F83758',
    borderRadius:4
  },
  btnTxt:{
    paddingVertical:15,
    paddingHorizontal:130,
    color:'#FFFFFF',
    fontSize:20,
    fontWeight:'bold'
  },
  ggleCont:{
    paddingTop:75,
    paddingHorizontal:90,
    
  },
  continueWithCont:{
    paddingHorizontal:30
  },
  continueWithTxt:{
    fontSize:12,
    color:'#575757'
  },
  socialMediaCont:{
    paddingTop:20,
    flexDirection:'row'
  },
  ggleOuter:{
    borderWidth:1,
    borderColor:'#F83758',
    borderRadius:50,
    backgroundColor:'#FCF3F6',
    padding:15,
    width:54,
  },
  appleCont:{
    padding:15,
    borderWidth:1,
    borderColor:'#F83758',
    backgroundColor:'#FCF3F6',
    width:55,
    borderRadius:50

  },
  signupCont:{
    paddingTop:28
  },
  signupTxt:{
    color:'#575757',
    fontSize:14
  },
  usericonCont:{
    // paddingVertical:15,
    // paddingLeft:10,
    position:'absolute',
    paddingLeft:43,
    paddingTop:52
  },
  usericon:{
    // paddingVertical:15,
    // paddingLeft:10
  },
  lockCont:{
    position:'absolute',
    paddingLeft:47,
    paddingTop:48
  },
  eyeCont:{
    // paddingLeft:313,
    position:'absolute',
    right:50,
    bottom:18
    // paddingTop:49,
    // alignSelf:''
  },
  
});