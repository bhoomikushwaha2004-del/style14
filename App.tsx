import { NavigationContainer, DarkTheme as NavigationDarkTheme , DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import store from './src/redux/store'
import 'react-native-reanimated'

import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { setCart } from './src/redux/slice';
import { useEffect, useState } from 'react';
import { Provider as PaperProvider, MD2DarkTheme as PaperDarkTheme, DefaultTheme  as PaperDefaultTheme} from 'react-native-paper';

const AppContent = ()=> {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const dispatch = useDispatch()

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
    ...PaperDefaultTheme,
    colors:{
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,

    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors:{
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors
    }
  }

  const theme = isDarkTheme? CustomDarkTheme: CustomDefaultTheme

  return(
    <PaperProvider theme={theme} > 
    <NavigationContainer theme={theme}>
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
