import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, removeCart } from '../redux/slice';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../styles';

const ShopPage = () => {
    const dispatch = useDispatch()

    const route = useRoute();
    const  item  = route.params?.item;
    // console.log(item, "item");

    const selector= useSelector((state)=> state.cart.items)

    const isAdded = selector.find(cartItem => cartItem.id === item.id)

    const addToCart=(item)=>{
    dispatch(addItems(item))
    }

    const removeFromCart = id => {
      dispatch(removeCart(id))
    }


    if(!item) {
      return <Text>No item found</Text>
    }
  return (
    <SafeAreaView>
    {/* image */}
      <View style={styles.imgCont}>
        <Image source={{uri: item.image}} style={styles.img} />
      </View>

      {/* title */}
      <View style={styles.titleCont}>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      


      {/* description container */}
      <View style={styles.detailsCont}>
        {/* price */}
        <View style={styles.priceCont}>
            <Text style={styles.price}> ₹{item.price} </Text>
        </View>

        {/* product details */}
      <View style={styles.priceCont}>
        <Text style={styles.proddtl}>Product Details</Text>
      </View>

        {/* description */}
        <View style={styles.descriptionCont}>
            <Text style={styles.description}>{item.description}</Text>
        </View>    
      </View>


      {/* Btn */}
      <View style={styles.btnCont}>
        { isAdded ? (
          <TouchableOpacity style={styles.removecartbtn} onPress={()=>removeFromCart(item.id)} >
                    <CartIcon name='cart-outline' size={24} color={'white'} style={styles.addtocartIcon}  />
                    <Text style={styles.addtoCartTxt}>Remove from cart</Text>
               </TouchableOpacity>
        ):(
          <TouchableOpacity style={styles.addcartbtn} onPress={()=>addToCart(item)}>
                   <CartIcon name='cart-outline' size={24} color={'white'} style={styles.addtocartIcon}  />
                    <Text style={styles.addtoCartTxt}>Add to Cart</Text>
                </TouchableOpacity>
        )}
        
      </View>


      
    </SafeAreaView>
  )
}

export default ShopPage

const styles = StyleSheet.create({
    imgCont: {
    padding: SPACING.m,
  },
  img: {
    height: 250,
    width: 339,
    resizeMode: 'contain',
  },
  titleCont: {
    paddingTop: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  title: {
    fontSize: FONT_SIZE.xxl, // 20
    fontWeight: 'bold',
  },
  detailsCont: {
    paddingTop: SPACING.s,
    paddingHorizontal: SPACING.m,
  },
  priceCont: {
    paddingTop: SPACING.s,
  },
  price: {
    fontSize: FONT_SIZE.m,
    fontWeight: 'bold',
  },
  proddtl: {
    fontSize: FONT_SIZE.m,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  descriptionCont: {
    paddingTop: SPACING.s,
  },
  description: {
    fontSize: FONT_SIZE.s,
    color: COLORS.black,
  },
  btnCont: {
    paddingTop: SPACING.s,
    paddingLeft: SPACING.m,
    flexDirection: 'row',
  },
  addedbtn: {},
  gotoCartimg: {
    height: 40,
    width: 136,
  },
  addcartbtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: RADIUS.sm,
    borderBottomRightRadius: RADIUS.sm,
    borderBottomLeftRadius: 20,
  },
  removecartbtn: {
    flexDirection: 'row',
    backgroundColor: 'red',
    borderTopLeftRadius: 20,
    borderTopRightRadius: RADIUS.sm,
    borderBottomRightRadius: RADIUS.sm,
    borderBottomLeftRadius: 20,
  },
  addtoCartTxt: {
    paddingVertical: SPACING.s,
    paddingLeft: SPACING.m,
    paddingRight: SPACING.s,
    color: COLORS.white,
  },
  addtocartIcon: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },

    
})