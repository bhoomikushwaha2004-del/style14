import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import NoItem from '../components/NoItem'

const Checkout = () => {
  const navigation = useNavigation();

  const selector = useSelector((state)=> state.cart.items)
  console.log(selector,'selector on checkout');

      
  const placeordnvg=(item)=> {
    navigation.navigate('bag',{selector})
  }
  return (
    <>
    

      {/* flatlist */}
      {selector.length === 0 ? (
        <NoItem />
      ):(

        <>
        {/* Shopping List Txt */}
      <View style={styles.shoptxtCont}>
        <Text style={styles.shopTxt}>Shopping List</Text>
      </View>
      
        <FlatList
          data={selector}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item})=> <ItemList item={item} />} 
          
          />
          </>
      )}

      {/* btn */}
      {selector.length > 0 && (
        <View style={styles.bottomBtnContainer}>
          <TouchableOpacity onPress={placeordnvg} style={styles.bagstyle}>
            <Text style={styles.bagtxt}>View Order Details</Text>
          </TouchableOpacity>
        </View>
      )}

    </>
  )
}

const ItemList = ({ item }) => {
  return (
    <View style={styles.card}>

      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.img} />

        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.rating}>
            ⭐ {item.rating?.rate}
          </Text>

          <View style={styles.priceBox}>
            <Text style={styles.price}>
              ₹{item.price.toFixed(0)}
            </Text>
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
  );
};

export default Checkout

const styles = StyleSheet.create({
  shoptxtCont:{
    paddingTop:24,
    paddingLeft:22
  },
  shopTxt:{
    fontSize:14,
    fontWeight:'bold',

  },
  contentCont:{
    marginTop:10,
    marginHorizontal:22,
    backgroundColor:'#FFFFFF',
    paddingBottom:14,
    flexDirection:'row',
    justifyContent:'space-evenly'
    
  },
  imgCont:{
    paddingTop:10,
    paddingLeft:10,
    backgroundColor:'#FFFFFF',
    paddingBottom:56

  },
  img:{
    width:130,
    height:125
  },
  titleCont:{
    paddingTop:17,
    paddingLeft:8,
    paddingRight:20,
    backgroundColor:'#FFFFFF',
    paddingBottom:5,
    maxWidth:200
  },
  title:{
    fontSize:14,
    fontWeight:'bold',
    paddingRight:20,

  },
  rateCont:{
    paddingTop:7,
    paddingLeft:8
  },
  rate:{
    fontSize:12,
    fontWeight:'bold'
  },
  rating:{
    fontSize:12,
    paddingTop:7,
    fontWeight:'bold'
  },
  priceCont:{
    paddingTop:7,
    paddingLeft:8,
    paddingRight:98,
    // borderWidth:0.3,

  },
  priceOuter:{
    borderWidth:0.3,
    borderColor:'#CACACA',
    backgroundColor:'#FFFFFF',
    borderRadius:4
  },
  price:{
    paddingVertical:8,
    paddingHorizontal:10,
    fontSize:16,
    color:'#000000',

  },
  dividerCont:{
    paddingTop:147,
    paddingHorizontal:10,
    paddingBottom:44,
    borderWidth:1,
    height:1,
  width:311
  },
  card:{
  backgroundColor:'#FFFFFF',
  marginHorizontal:22,
  marginTop:12,
  borderRadius:8,
  padding:10,
  elevation:2 
},

row:{
  flexDirection:'row'
},

img:{
  width:100,
  height:100,
  borderRadius:6
},

info:{
  flex:1,
  paddingLeft:10,
  justifyContent:'space-between'
},

title:{
  fontSize:14,
  fontWeight:'bold'
},

rating:{
  fontSize:12,
  color:'#666'
},

priceBox:{
  borderWidth:1,
  borderColor:'#CACACA',
  borderRadius:4,
  alignSelf:'flex-start'
},

price:{
  paddingHorizontal:10,
  paddingVertical:6,
  fontSize:14,
  fontWeight:'bold'
},

divider:{
  height:1,
  backgroundColor:'#E5E5E5',
  marginVertical:10
},

totalRow:{
  flexDirection:'row',
  justifyContent:'space-between'
},

totalText:{
  fontSize:13,
  color:'#333'
},

totalPrice:{
  fontSize:14,
  fontWeight:'bold'
},
bottomBtnContainer:{
  position:'absolute',
  bottom:0,
  left:0,
  right:0,
  backgroundColor:'#fff',
  padding:15,
  borderTopWidth:1,
  borderColor:'#eee'
},

bagstyle:{
  backgroundColor:'#FF5F6D',
  borderRadius:6,
  alignItems:'center'
},

bagtxt:{
  color:'#fff',
  fontSize:16,
  fontWeight:'bold',
  paddingVertical:12
}

})