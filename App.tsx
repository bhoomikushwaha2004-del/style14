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

const AppContent = ()=> {
  
  const dispatch = useDispatch()

  // const isDarkTheme = useSelector((state)=> state.theme.darkTheme)

  useEffect(()=> {
    loadCart()
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

  const CustomDefaultTheme={
    ...NavigationDefaultTheme,
    ...MD3LightTheme,
    colors:{
      ...NavigationDefaultTheme.colors,
      ...MD3LightTheme.colors,

    }
  }

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
    <PaperProvider  > 
    <NavigationContainer >
      <StackNavigation />
    </NavigationContainer>
    </PaperProvider>
  )

}
2

function App() {
  return (
    <ReduxProvider store={store}>
      <AppContent />
    </ReduxProvider>
    
  );
}

export default App;
