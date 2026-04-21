import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';
import GetStarted from '../screens/GetStarted';
import BottomTabNavigation from '../navigation/BottomTabNavigation';
import Checkout from '../screens/Checkout';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import PlaceOrder from '../screens/PlaceOrder';
import ShopPage from '../screens/ShopPage';
import CartIcon from 'react-native-vector-icons/Ionicons';
import DrawerNavigation from './DrawerNavigation'

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const navigation = useNavigation();

  const cartnvg = () => {
    navigation.navigate('cart');
  };

  const checkoutnvg = () => {
    navigation.navigate('bottomTab', {
      screen: 'checkout',
    });
  };

  return (
    <>
      {/* <NavigationContainer> */}
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="forgetpassword"
          component={ForgetPassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="getstarted"
          component={GetStarted}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="bottomTab"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="checkout"
          component={Checkout}
          options={{
            headerShown: true,
            headerTitle: '                  Checkout',
            headerLeft: () => (
              <TouchableOpacity onPress={cartnvg}>
                <BackIcon name="chevron-back" size={24} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="cart"
          component={ShopPage}
          options={{
            title: 'Cart',
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackIcon name="chevron-back" size={24} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity>
                <CartIcon name="cart-outline" size={24} />
              </TouchableOpacity>
            ),

            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="bag"
          component={PlaceOrder}
          options={{
            headerShown: true,
            headerTitle: '                  Shopping Bag',
            headerLeft: () => (
              <TouchableOpacity onPress={checkoutnvg}>
                <BackIcon name="chevron-back" size={24} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen 
        name='drawer'
        component={DrawerNavigation}
        options={{
          headerShown:false
        }}
        />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </>
  );
}
