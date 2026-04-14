// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useState } from "react";
// import {  Image, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
// import { Card } from "react-native-paper";
// import CartIcon from 'react-native-vector-icons/Ionicons' 
// import { useDispatch, useSelector } from "react-redux";
// import {addItems} from '../redux/slice'

// export default function ShopPage(){
//     const navigation = useNavigation()
//     const[cart,setCart] = useState([])
//     const dispatch = useDispatch()

//     const route = useRoute();
//     const { item } = route.params;
//     console.log(item, "item");

//     const selector= useSelector((state)=> state.cart.items)

    
//     const addToCart=(item)=>{
//         const updatedCart=[...cart,item]
//         setCart(updatedCart)

//         dispatch(addItems({...item, quantity:1}))

//         navigation.navigate('bottomTab',{
//             screen:'home',
//             params:{item,cart}})
//     }

//     const goToCart=(item)=>{
//         const updatedCart=[...cart,item]
//         setCart(updatedCart)

//         dispatch(addItems({...item, quantity:1}))

//         navigation.navigate('bottomTab',{
//             screen:'cart',
//             params:{item,cart}})
//     }


//     return(
//         <View style={{backgroundColor:'#F9F9F9',height:'100%'}}>
//         <View style={{margin:10}}>
//             <Image source={{ uri: item.image}} style={style.img} />
//         </View>

//         <View>
//             <Text style={style.titletxt}>{item.title} </Text>
//             <Text style={style.pricetxt}>₹{item.price} </Text>
//             <Text style={{fontWeight:'bold',marginLeft:10,marginTop:10,fontSize:14}}>Product Details</Text>

//             <Text style={{margin:10}}>{item.description} </Text>


// {/* button  */}
//             { selector.find(cartItem=> cartItem.id === item.id) ? (
//                 <TouchableOpacity style={style.addedbtn}  >
//                     <Image source={require('../assets/goToCart.png')} style={style.gotoCartimg}/>
//                 </TouchableOpacity>
//             ): (
//                 <View>
//                 <TouchableOpacity style={style.addcartbtn} onPress={()=>addToCart(item)}>
//                     <CartIcon name='cart-outline' size={24} color={'white'} style={{marginLeft:10,marginTop:5}} />
//                     <Text style={{color:'#FFFFFF',marginLeft:20,
//                         marginTop:5
//                     }}>Add to Cart</Text>
//                 </TouchableOpacity>
//             </View>
//             )
//         }
            
//         </View>
        

        
//         </View>
//     )
// }

// const style=StyleSheet.create({
//    img:{
//     height:250,
//     width:339,
//     // margin:10,
//     backgroundColor:'#F9F9F9',
//     resizeMode:'contain',
//     marginLeft:20
//    },
//    titletxt:{
//     fontSize:20,
//     fontWeight:'bold',
//     margin:10
//    },
//    pricetxt:{
//     fontSize:14,
//     fontWeight:'bold',
//     marginLeft:10
//    },
//    addcartbtn:{
//     borderWidth:1,
//     marginLeft:20,
//     width:136,
//     height:36,
//     backgroundColor:'#3F92FF',
//     borderColor:'#3F92FF',
//     borderRadius:5,
//     flexDirection:'row',
//     marginBottom:20,
//     borderBottomLeftRadius:18,
//     borderTopLeftRadius:18
//    },
//    addedbtn:{
//     borderWidth:1,
//     marginLeft:20,
//     width:136,
//     height:36,
//     backgroundColor:'#3F92FF',
//     borderColor:'#3F92FF',
//     borderRadius:5,
//     flexDirection:'row',
//     marginBottom:20,
//     borderBottomLeftRadius:18,
//     borderTopLeftRadius:18
//    },
//    gotoCartimg:{
//     height:40,
//     width:136
//    }
// })

import { Image, StyleSheet, Text, View } from 'react-native'
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
        const updatedCart=[...cart,item]
        setCart(updatedCart)

        dispatch(addItems({...item, quantity:1}))

        navigation.navigate('bottomTab',{
            screen:'cart',
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

    
})