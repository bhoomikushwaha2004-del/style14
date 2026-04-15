import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import CartIcon from 'react-native-vector-icons/Ionicons' 
import {addItems} from '../redux/slice'
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';

const ShopPage = () => {
    const navigation = useNavigation()
    const[cart,setCart] = useState([])
    const dispatch = useDispatch()

    const route = useRoute();
    const { item } = route.params;
    // console.log(item, "item");

    const selector= useSelector((state)=> state.cart.items)

    
    const addToCart=(item)=>{
        const updatedCart=[...cart,item]
        setCart(updatedCart)

        dispatch(addItems({...item, quantity:1}))

        navigation.navigate('bottomTab',{
            screen:'home',
            params:{item,cart}})
    }

    const goToCart=(item)=>{

        navigation.navigate('bottomTab',{
            screen:'checkout',
            params:{item,cart}})
    }
  return (
    <>
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
        { selector.find(cartItem => cartItem.id === item.id) ? (
            <TouchableOpacity style={styles.addedbtn} onPress={()=>goToCart(item)} >
                    <Image source={require('../assets/goToCart.png')} style={styles.gotoCartimg}/>
               </TouchableOpacity>
        ):(
            <TouchableOpacity style={styles.addcartbtn} onPress={()=>addToCart(item)}>
                   <CartIcon name='cart-outline' size={24} color={'white'} style={styles.addtocartIcon}  />
                    <Text style={styles.addtoCartTxt}>Add to Cart</Text>
                </TouchableOpacity>
        )}
        
      </View>


      
    </>
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