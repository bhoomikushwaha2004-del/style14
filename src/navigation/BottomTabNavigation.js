import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopPage from '../screens/ShopPage';
import HomePage from '../screens/HomePage';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/Feather';
import CartIcon from 'react-native-vector-icons/Ionicons' 
import BackIcon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkout from '../screens/Checkout';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color, size) => {
  let iconName;
  if (routeName === 'home') {
    iconName = 'home';
  } else if (routeName === 'checkout') {
    iconName = 'shopping-cart';
  } else if (routeName === 'search') {
    iconName = 'search';
  }
  return <Icon name={iconName} size={size} color={color} />;
};



export default function BottomTabNavigation() {
  const navigation=useNavigation()

  const selector = useSelector((state)=>state.cart.items)
  console.log(selector,'cart');
  
  const homenvg =() => {
    navigation.navigate('bottomTab',{
      screen:'home',
    })
  }
  
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route.name, focused, color, size),
          tabBarActiveTintColor: '#EB3030',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle:{
            height:76,
            paddingTop:10,
          }
        })}
      >
        <Tab.Screen
          name="home"
          component={HomePage}
          options={{ headerShown: false, title: 'Home' }}
        />
        {/* <Tab.Screen
          name="cart"
          component={ShopPage}
          options={{ title: 'Cart',
            headerShown:true,
            headerLeft:()=> (
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <BackIcon name='chevron-back' size={24} />
            </TouchableOpacity>
   ),
            headerRight:()=> (
            <TouchableOpacity >
                <CartIcon name='cart-outline' size={24}/>
            </TouchableOpacity>
   ),
   
   headerTitle:''
 }}
        /> */}
        <Tab.Screen
          name="checkout"
          component={Checkout}
          options={{ title: 'Cart',
            headerShown:true,
            tabBarBadge:selector.length,
            headerLeft:()=> (
            <TouchableOpacity onPress={homenvg}>
                <BackIcon name='chevron-back' size={24} />
            </TouchableOpacity>
   ),
            
   
   headerTitle:'                          Checkout'
           }}
          
        />
        <Tab.Screen
          name="search"
          component={SearchBar}
          options={{ title: 'Search' }}
          
        />
      </Tab.Navigator>
    </>
  );
}