import { NavigationContainer, DarkTheme , DefaultTheme} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store'
import 'react-native-reanimated'

import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { setCart } from './src/redux/slice';
import { useEffect } from 'react';

const AppContent = ()=> {
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

  return(
    <NavigationContainer theme={DefaultTheme}>
      <StackNavigation />
    </NavigationContainer>
  )

}


function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
    
  );
}

export default App;
