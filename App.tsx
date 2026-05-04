import { NavigationContainer, DarkTheme as NavigationDarkTheme , DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store'
// import 'react-native-reanimated/plugin'

import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { setCart } from './src/redux/slice';
import { useEffect, useState } from 'react';
import { Provider as PaperProvider, MD3DarkTheme , MD3LightTheme  } from 'react-native-paper';
import { changeTheme } from './src/redux/themeSlice';
import { getUser, getLogin } from './src/services/authStorage';

const AppContent = ()=> {
  
  const dispatch = useDispatch()
  // const isDarkTheme = useSelector((state)=> state.theme.isDarkTheme)
  
  // const[isLoggedIn, setIsLoggedIn] = useState(null)
  const [isLoggedIn,setIsLoggedIn] = useState<boolean | null >(null)

  // const dispatch = useDispatch()
  

  

  useEffect(()=> {
    loadCart()
    checkLogin()
  }, [])

  const loadCart =async ()=> {
    try{
      const data = await AsyncStorage.getItem('cart');
      if(data) {
        dispatch(setCart(JSON.parse(data)))
      }
    }
    catch(e){
      console.log('load error',e);
      
    }
  }

  const checkLogin = async () => {
    const status = await getLogin()
    setIsLoggedIn(status);
  }

  // const checkUser = async ()=>{
  //   const user = await getUser()

  //   if(user) {
  //     setIsLoggedIn(true)
  //   }
  // }

  if( isLoggedIn === null) return null ;



  const CustomDefaultTheme={
    ...NavigationDefaultTheme,
    ...MD3LightTheme,
    colors:{
      ...NavigationDefaultTheme.colors,
      ...MD3LightTheme.colors,

    }
  }

  console.log(CustomDefaultTheme , 'custom default theme');
  

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...MD3DarkTheme,
    colors:{
      ...NavigationDarkTheme.colors,
      ...MD3DarkTheme.colors
    }
  }

  // const theme = isDarkTheme? CustomDarkTheme: CustomDefaultTheme

  return(
    <PaperProvider   > 
    <NavigationContainer  >
      <StackNavigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
    </PaperProvider>
  )

}


function App() {
  return (
    <ReduxProvider store={store}>
      <AppContent />
    </ReduxProvider>
    
  );
}

export default App;
