import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';
import { useNavigation } from '@react-navigation/native';
import {addItems,removeFromWishlist} from '../redux/slice'
import Cross from 'react-native-vector-icons/Entypo'

const WishList = () => {
  const selector = useSelector((state)=> state.cart.items)
  const wishlist = useSelector(state => state.cart.wishlist)
  const[cart,setCart] = useState([])
  const dispatch = useDispatch()

  const navigation = useNavigation()
  
  if (wishlist.length === 0) {
      return (
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold',flex:1, alignSelf:'center' }}>
            No items in WishList 🛒{' '}
          </Text>
        </View>
      );
    }

  const addToCart=(item)=>{
          const updatedCart=[...cart,item]
          setCart(updatedCart)
  
          dispatch(addItems({...item, quantity:1}))
  
          navigation.navigate('bottomTab',{
              screen:'home',
              params:{item,cart}})
      }
  return (
    
    <FlatList
    data={wishlist}
    renderItem={({item}) => (
      <WishlistItems item={item} addToCart={addToCart} dispatch={dispatch}/>
    )} 
    />
  )
}


const WishlistItems =({item,addToCart,dispatch})=> {
return(
  <>
   <View style={styles.card}>

    {/* cross btn */}
    <View style={styles.crossView} >
      <TouchableOpacity onPress={()=> dispatch(removeFromWishlist(item.id))}>
        <Cross name='cross' size={20} />
      </TouchableOpacity>
    </View>
  
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.img} />
  
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
  
           
  
            <View >
              <Text style={styles.priceTxt}>
                ₹{item.price.toFixed(2)}
              </Text>
            </View>


            {/* Add btn */}
            <View style={styles.addcartView}>
              <TouchableOpacity style={styles.addcartBtn} onPress={()=> addToCart(item)}>
                <Text style={styles.addcartTxt}>Add to Cart</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.buycartBtn}>
                <Text style={styles.addcartTxt}>Buy</Text>
              </TouchableOpacity>
            </View>

            


          </View>
        </View>
  
        {/* Divider */}
        <View style={styles.divider} />
  
        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Order (1):</Text>
          <Text style={styles.totalPrice}>₹{item.price}</Text>
        </View>
  
      </View>
  </>
)
}

export default WishList

const styles = StyleSheet.create({
  card: {
      backgroundColor: COLORS.white,
      marginHorizontal: 22,
      marginTop: 12,
      borderRadius: RADIUS.md,
      padding: SPACING.sm,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
    },
    img: {
      width: 100,
      height: 100,
      borderRadius: RADIUS.sm,
    },
    info: {
      flex: 1,
      paddingLeft: SPACING.sm,
      // justifyContent: 'space-between',
    },
    title: {
      fontSize: FONT_SIZE.m,
      fontWeight: 'bold',
    },
    
    priceBox: {
      borderWidth: 1,
      borderColor: COLORS.lightGray,
      borderRadius: RADIUS.sm,
      alignSelf: 'flex-start',
    },
    price: {
      paddingHorizontal: SPACING.sm,
      paddingVertical: 6,
      fontSize: FONT_SIZE.m,
      fontWeight: 'bold',
    },
    divider: {
      height: 1,
      backgroundColor: '#E5E5E5',
      marginVertical: SPACING.sm,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalText: {
      fontSize: 13,
      color: '#333',
    },
    totalPrice: {
      fontSize: FONT_SIZE.m,
      fontWeight: 'bold',
    },
    priceTxt:{
      fontWeight:'bold',
      paddingTop:10
    },
    addcartView:{
      paddingTop:20,
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    addcartBtn:{
      borderWidth:0.5,
      width:90,
      backgroundColor:'#0000FF',
      borderRadius:5
    },
    buycartBtn:{
      borderWidth:0.5,
      width:90,
      backgroundColor:'#00D100',
      borderRadius:5
    },
    addcartTxt:{
      color:'white',
      padding:5
    },
    crossView:{
      alignItems:'flex-end'
    }
})