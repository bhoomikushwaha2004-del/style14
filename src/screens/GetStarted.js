import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function GetStarted() {
    
  const navigation = useNavigation();
  const homepagenvg = (item) => {
    navigation.navigate('bottomTab',{
        screen:'home' ,
        params: {
          item: item,

        }
    });
  };
  return (
    <>
      <View >
        <Image
          source={require('../assets/getstartedimg.jpg')}
          style={styles.img}
        />

        {/* <View style={{  opacity: 0.5, backgroundColor:'black',position:'absolute',height:500 }}> */}
        <Text style={styles.firsttxt}>
          You want         Authentic, here       you go!</Text>

           
        <Text style={styles.secondtxt}>              Find it here, buy it now!</Text>
        

        <TouchableOpacity style={styles.btn} onPress={homepagenvg}>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              textAlign: 'center',
              fontSize: 23,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
        </View>
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
  },
  firsttxt: {
    position: 'absolute',
    color: '#FFFFFF',
    height: 123,
    width: 315,
    fontSize: 34,
    marginTop: 552,
    fontWeight: 'bold',
    marginLeft: 40,
    textAlign:'center'
  },
  secondtxt: {
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    height: 22,
    marginTop: 680,
    marginLeft: 77,
    textAlign:'center'
  },
  btn: {
    borderWidth: 1,
    position: 'absolute',
    height: 55,
    width: 279,
    backgroundColor: '#F83758',
    borderColor: '#F83758',
    marginTop: 755,
    marginLeft: 55,
    borderRadius: 5,
  },
});