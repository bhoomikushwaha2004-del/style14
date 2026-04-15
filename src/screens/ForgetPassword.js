import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MailIcon from 'react-native-vector-icons/Ionicons'
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';

const ForgetPassword = () => {
  return (
    <>
    {/* headline Txt */}
      <View style={styles.headlineCont}>
        <Text style={styles.headlineTxt}>Forgot password?</Text>
      </View>

      {/* input */}
      <View style={styles.inputCont}>
        <MailIcon name='mail' size={24} color={'#626262'} style={styles.mail} />
        <TextInput placeholder='Enter your email address' style={styles.input} />
      </View>

      <View style={styles.txtCont}>
        <Text style={{color:'#FF4B26'}}>*<Text style={styles.txt}> We will send you a message to set or reset your new password</Text></Text>
      </View>


      <View style={styles.btnCont}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  headlineCont: {
    paddingTop: SPACING.l, // 20
    paddingLeft: 30,
    paddingRight: 142,
  },

  headlineTxt: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  inputCont: {
    paddingTop: 32,
    paddingHorizontal: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#A8A8A9',
    paddingLeft: 44,
    paddingVertical: 20,
    borderRadius: RADIUS.md,
  },

  mail: {
    position: 'absolute',
    paddingLeft: 42,
    paddingTop: 50,
  },

  txtCont: {
    paddingTop: 25,
    paddingLeft: 30,
    paddingRight: 63,
  },

  txt: {
    fontSize: FONT_SIZE.s,
    color: '#676767',
  },

  btnCont: {
    paddingHorizontal: 30,
    paddingTop: 25,
  },

  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
  },

  btnTxt: {
    color: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 120,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xxl,
  },
});