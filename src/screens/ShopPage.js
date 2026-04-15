import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import CartIcon from 'react-native-vector-icons/Ionicons' 
import {addItems} from '../redux/slice'

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
    imgCont:{
        padding:16
    },
    img:{
        height:250,
        width:339,
        resizeMode:'contain'
    },
    titleCont:{
        paddingTop:16,
        paddingHorizontal:16
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    detailsCont:{
        paddingTop:8,
        paddingHorizontal:16
    },
    priceCont:{
        paddingTop:8
    },
    price:{
        fontSize:14,
        fontWeight:'bold'
    },
    descriptionCont:{
        paddingTop:8
    
    },
    description:{
        fontSize:12,
        color:'#000000'
    },
    proddtl:{
        fontSize:14,
        fontWeight:'bold',
        color:'#000000'
    },
    btnCont:{
        paddingTop:12,
        paddingLeft:16,
        flexDirection:'row'
    },
    addedbtn:{
    // borderWidth:1,

   },
   gotoCartimg:{
    height:40,
    width:136,
    // borderWidth:1,
   },
   addcartbtn:{
    flexDirection:'row',
    backgroundColor:'#3F92FF',
    borderTopLeftRadius:20,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    borderBottomLeftRadius:20,
    
   },
   addtoCartTxt:{
    paddingVertical:8,
    paddingLeft:16,
    paddingRight:8,
    color:'#FFFFFF'
   },
   addtocartIcon:{
    paddingVertical:10,
    paddingHorizontal:10
   }

    
})