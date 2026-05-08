import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Checkout from '../screens/Checkout';
import WishList from '../screens/WishList';
import DrawerNavigation from './DrawerNavigation';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color, size) => {
  return (
    <Icon
      name={
        routeName === 'home'
          ? 'home'
          : routeName === 'checkout'
          ? 'shopping-cart'
          : routeName === 'search'
          ? 'search'
          : routeName === 'wishlist'
          ? 'heart'
          : null
      }
      size={size}
      color={color}
    />
  );
};

export default function BottomTabNavigation(props) {
  // const navigation = useNavigation();

  const selector = useSelector(state => state.cart.items);
  // console.log(selector, 'cart');

  const wishlistSelector = useSelector(state => state.cart.wishlist);


  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route.name, focused, color, size),
          tabBarActiveTintColor: '#EB3030',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: {
            height: 76,
            paddingTop: 10,
          },
          // headerBackImage:()=> {
          //   <BackIcon name="chevron-back" size={24} />
          // }
          // headerBackButtonDisplayMode:'generic'
        })
        
      }
      

      >
        <Tab.Screen name="home"  options={{ headerShown: false, title: 'Home' }}>
          {(tabProps) => (
            <DrawerNavigation {...tabProps} setIsLoggedIn={props.setIsLoggedIn} />
          )}
          
        </Tab.Screen>

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
          name="wishlist"
          component={WishList}
          options={{ title: 'Wishlist', tabBarBadge: wishlistSelector.length }}
        />

        <Tab.Screen
          name="checkout"
          component={Checkout}
          options={{
            title: 'Cart',
            tabBarBadge: selector.length,
            headerShown:true,
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => {
            //     if(navigation.canGoBack()) {
            //       navigation.goBack()
            //     }
            //   }} style={{paddingLeft:10}}>
            //     <BackIcon name="chevron-back" size={24} />
            //   </TouchableOpacity>
            // ),
            
            headerTitleAlign: 'center',

            headerTitle: 'Checkout',
          }}
        />
        
      </Tab.Navigator>
    </>
  );
}
