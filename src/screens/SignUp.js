import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import UserIcon from 'react-native-vector-icons/FontAwesome6'
import Lock from 'react-native-vector-icons/Fontisto'
import EyeIcon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';


const SignUp = () => {
  const navigation = useNavigation()
  const lgnnvg=()=> {
        navigation.navigate('login')
    }
  return (
    <>
      {/* Headline Txt */}
      <View style={styles.headlineCont}>
        <Text style={styles.headlineTxt}>Create an account</Text>
      </View>

      {/* username input */}
      <View style={styles.firstinputCont}>
          <UserIcon name='user-large' size={20} color={'#626262'} style={styles.userCont} />
        <TextInput placeholder='Username or Email'style={styles.firstinput} />
      </View>

          {/* Password input */}
      <View style={styles.scndinputCont}>
          <Lock name='locked' size={20} color={'#626262'} style={styles.lockCont} />
        <TextInput placeholder='Password' style={styles.scndinput} />
          <EyeIcon name='eye' size={20} color={'#626262'} style={styles.eyeCont} />
      </View>


          {/* confirm pass input */}
      <View style={styles.scndinputCont}>
          <Lock name='locked' size={20} color={'#626262'} style={styles.lockCont} />
        <TextInput placeholder='Confirm Password' style={styles.scndinput} />
          <EyeIcon name='eye' size={20} color={'#626262'} style={styles.eyeCont} />
      </View>



          {/* register text */}
      <View style={styles.registerCont}>
        <Text style={styles.registerTxt}>By clicking the <Text style={{color:'#FF4B26'}}>Register</Text> button, you agree to the public offer</Text>
      </View>


      {/* create act psw */}
      <View style={styles.btnCont}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* social media */}
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
                <Text style={styles.signupTxt}>I Already Have an Account <Text style={{color:'#F83758',textDecorationLine:'underline',fontWeight:'bold' }} onPress={lgnnvg}>Login</Text></Text>
              </View>
      
            </View>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  headlineCont:{
    paddingTop:20,
    paddingLeft:30,
    paddingRight:155
  },
  headlineTxt:{
    fontSize:36,
    fontWeight:'bold'
  },
  firstinputCont:{
    paddingTop:33,
    paddingHorizontal:30
  },
  firstinput:{
    borderWidth:1,
    borderColor:'#A8A8A9',
    borderRadius:10,
    fontSize:12,
    paddingVertical:20,
    paddingLeft:40,
    fontWeight:'bold'
  },
  userCont:{
    position:'absolute',
    paddingLeft:40,
    paddingTop:50
  },
  scndinputCont:{
    paddingTop:30,
    paddingHorizontal:30,
  },
  scndinput:{
    borderWidth:1,
    borderColor:'#A8A8A9',
    fontWeight:'bold',
    borderRadius:10,
    paddingVertical:20,
    paddingLeft:42,

  },
  lockCont:{
    position:'absolute',
    paddingLeft:44,
    paddingTop:48
  },
  eyeCont:{
    position:'absolute',
    // paddingLeft:310,
    // paddingRight:10,
    // paddingTop:50
    // paddingRight:45 
    right:50,
    bottom:18
  },
  registerCont:{
    paddingTop:20,
    paddingLeft:30,
    paddingRight:87
  },
  registerTxt:{
    color:'#676767',
    // fontSize:12,

  },
  btnCont:{
    paddingTop:38,
    paddingHorizontal:30
  },
  btn:{
    backgroundColor:'#F83758',
    borderRadius:4
    // pad
  },
  btnTxt:{
    paddingHorizontal:78,
    paddingVertical:15,
    color:'#FFFFFF',
    fontWeight:'bold',
    fontSize:20
  },
   ggleCont:{
    paddingTop:40,
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
});
