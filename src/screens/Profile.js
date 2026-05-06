import {
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {  useEffect, useState } from 'react';
import { getUser } from '../services/authStorage';
import Location from 'react-native-vector-icons/FontAwesome';
import GeoLocation from 'react-native-geolocation-service';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locationData, setLocation] = useState({
    pincode: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    loadUser();
  },[]);

  const loadUser = async () => {
    const user = await getUser();

    if (user) {
      setEmail(user.username);
      setPassword(user.password);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const getCurrentLocation = async () => {
    const permission = await requestLocationPermission();

    if (!permission) {
      return;
    }

    GeoLocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude,longitude,'long,lat');
        

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const addr = data.address || {};

          setLocation({
            address: data.display_name || '',
            city: addr.city || addr.town || addr.village || '',
            state: addr.state || '',
            country: addr.country || '',
            pincode: addr.postcode || '',
          });
        } catch (err) {
          console.log(err, ' error in geolocation');
        }
      },

      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <ScrollView>
          {/* photo */}
          <View style={styles.picView}>
            <Image
              source={require('../assets/profile-picture.jpg')}
              style={styles.img}
            />
          </View>

          {/* Txt */}
          <View style={styles.txtCont}>
            <Text style={styles.personalTxt}>Personal Details</Text>

            <Text style={styles.emailTxt}>Email Address</Text>

            {/* email input */}
            <View style={styles.emailInputView}>
              <TextInput
                placeholder="Email"
                style={styles.emailinput}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <Text style={styles.pswTxt}>Password</Text>

            <View style={styles.pswInputView}>
              <TextInput
                placeholder="Password"
                style={styles.pswInput}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Text style={styles.changepswTxt}>Change Password</Text>

            {/* divider */}
            <View style={{ paddingTop: 35 }}>
              <View style={styles.divider} />
            </View>

            <Text style={styles.addInfoTxt}>Business Address Details</Text>

            {/* Use Current location */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignContent: 'space-evenly',
              }}
            >
              <Location
                name="location-arrow"
                size={20}
                style={styles.locIcon}
              />
              <Text style={styles.changepswTxt} onPress={getCurrentLocation}>
                Use Current Location
              </Text>
            </View>

            {/* Pincode */}
            <Text style={styles.pincodeTxt}>Pincode</Text>

            <View style={styles.pswInputView}>
              <TextInput
                placeholder="Pincode"
                style={styles.pswInput}
                value={locationData.pincode}
                onChangeText={text =>
                  setLocation({ ...locationData, pincode: text })
                }
              />
            </View>

            <Text style={styles.pincodeTxt}>Address</Text>

            <View style={styles.pswInputView}>
              <TextInput placeholder="Address" style={styles.pswInput}
              value={locationData.address}
                onChangeText={text =>
                  setLocation({ ...locationData, address: text })
                } 
              />
            </View>

            <Text style={styles.pincodeTxt}>City</Text>

            <View style={styles.pswInputView}>
              <TextInput placeholder="City" style={styles.pswInput}
              value={locationData.city}
                onChangeText={text =>
                  setLocation({ ...locationData, city: text })
                }
              />
            </View>

            <Text style={styles.pincodeTxt}>State</Text>

            <View style={styles.pswInputView}>
              <TextInput placeholder="State" style={styles.pswInput}
              value={locationData.state}
                onChangeText={text =>
                  setLocation({ ...locationData, state: text })
                }
              />
            </View>

            <Text style={styles.pincodeTxt}>Country</Text>

            <View style={styles.pswInputView}>
              <TextInput placeholder="Country" style={styles.pswInput}
              value={locationData.country}
                onChangeText={text =>
                  setLocation({ ...locationData, country: text })
                }
              />
            </View>

            {/* divider */}
            <View style={{ paddingTop: 35 }}>
              <View style={styles.divider} />
            </View>

            <Text style={styles.addInfoTxt}>Bank Account Details</Text>

            <Text style={styles.pincodeTxt}>Bank Account Number</Text>

            <View style={styles.pswInputView}>
              <TextInput placeholder="Account no" style={styles.pswInput} />
            </View>

            <Text style={styles.pincodeTxt}>Account Holder’s Name</Text>

            <View style={styles.pswInputView}>
              <TextInput placeholder="Account name" style={styles.pswInput} />
            </View>

            <Text style={styles.pincodeTxt}>IFSC Code</Text>

            <View style={styles.pswInputView}>
              <TextInput placeholder="IFSC Code" style={styles.pswInput} />
            </View>

            <View style={{ paddingTop: 34, paddingBottom: 57 }}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  picView: {
    paddingTop: 30,
    // paddingHorizontal:135,
    // height:95,
    // width:150,
    // alignContent:'center'
  },
  img: {
    // justifyContent:'center',
    height: 95,
    width: 95,
    resizeMode: 'contain',
    // alignItems:'center'
    // alignContent:'center'
    alignSelf: 'center',
  },
  personalTxt: {
    paddingTop: 28,
    fontWeight: 'bold',
  },
  txtCont: {
    paddingHorizontal: 24,
    fontSize: 18,
  },
  emailTxt: {
    fontSize: 12,
    paddingTop: 20,
    zIndex: 1,
  },
  emailinput: {
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 8,
    paddingVertical: 15,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  emailInputView: {
    paddingTop: 15,
  },
  pswTxt: {
    paddingTop: 28,
    fontSize: 12,
  },
  pswInputView: {
    paddingTop: 15,
  },
  pswInput: {
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 8,
    paddingVertical: 15,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  changepswTxt: {
    color: '#F83758',
    fontSize: 12,
    alignSelf: 'flex-end',

    // paddingLeft:247,
    paddingTop: 14,
    textDecorationLine: 'underline',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#C4C4C4',
    // paddingTop:35
  },
  addInfoTxt: {
    paddingTop: 34,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pincodeTxt: {
    paddingTop: 22,
    fontSize: 12,
  },
  btn: {
    // paddingTop:34,
    backgroundColor: '#F83758',
    borderRadius: 8,
  },
  btnTxt: {
    paddingVertical: 14,
    paddingHorizontal: 145,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  locIcon: {
    color: '#F83758',
    // justifyContent:'flex-end'
    alignSelf: 'flex-end',
    // fontSize:12,
    // paddingLeft:247,
    paddingTop: 14,
    // textDecorationLine:'underline'
  },
});
