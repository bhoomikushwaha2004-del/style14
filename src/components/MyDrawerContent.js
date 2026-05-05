import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from 'react-native-vector-icons/Ionicons'
import About from 'react-native-vector-icons/Entypo'
import { useEffect, useState } from 'react';
import { changeTheme } from '../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logoutUser } from '../services/authStorage';
import { useNavigation } from '@react-navigation/native';

// import{ AuthContext } from '../components/context';

const MyDrawerContent = props => {
  const paperTheme = useTheme();
  // const navigation=useNavigation()
  const [email,setEmail] = useState('')

  
  const dispatch = useDispatch()

  // const { changeTheme } = 
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme)


  useEffect(()=> {
    userInfo()
  },[])
  
  const handleLogout = async ()=> {
    await logoutUser()
    Alert.alert('You Have been Logout')
    props.setIsLoggedIn(false)
    
    // navigation.replace('login')
  }

  const toggleTheme =()=> {
    dispatch(changeTheme())
  }

  const userInfo = async () => {
    const user = await getUser()

    if(user) {
      setEmail(user.username)
    }
  }

  
  
  return (
    <> 
      <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={require('../assets/profile-picture.jpg')}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{email} </Title>
                <Caption style={styles.caption}>@j_doe</Caption>
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}


          </View>

          <Drawer.Section style={styles.drawerSection}>

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              
              label="Home"
              onPress={() => {
                props.navigation.navigate('home');
              }}
              
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Chat name="chatbox-ellipses" color={color} size={size} />
              )}
              label="Help"
              onPress={() => {
                props.navigation.navigate('help');
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <About name="network" color={color} size={size} />
              )}
              label="About Us"
              onPress={() => {
                props.navigation.navigate('about');
              }}
            />

          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableOpacity
              onPress={toggleTheme}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme}  />
                </View>
              </View>
            </TouchableOpacity>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={handleLogout}
          // onPress={() => {signOut()}}
        />
      </Drawer.Section>
    </View>
    </>
    
  );
};

export default MyDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
