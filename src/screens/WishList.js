import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    FlatList,
    Text,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WishlistItems from '../components/WishlistItems';
import { addItems } from '../redux/slice';

const WishList = () => {
  const selector = useSelector(state => state.cart.items);
  const wishlist = useSelector(state => state.cart.wishlist);
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const addToCart = item => {
    dispatch(addItems(item));

    navigation.navigate('bottomTab', {
      screen: 'home',
    });
  };
  return (
    <FlatList
      data={wishlist}
      renderItem={({ item }) => {
        const  fullProduct = products.find(p => p.id === item.id)

        if(!fullProduct) return null;

        
        return (
          <WishlistItems
            item={item}
            addToCart={addToCart}
            dispatch={dispatch}
            wishlist={wishlist}
            navigation={navigation}
            selector={selector}
          />
        );
      }}
      ListEmptyComponent={() => (
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}
          >
            Empty WishList 🛒
          </Text>
        </View>
      )}
    />
  );
};



export default WishList;