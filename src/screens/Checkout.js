import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import NoItem from '../components/NoItem'
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';

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
  shoptxtCont: {
    paddingTop: SPACING.xl, // 24
    paddingLeft: 22,
  },

  shopTxt: {
    fontSize: FONT_SIZE.m, // 14
    fontWeight: 'bold',
  },

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
    justifyContent: 'space-between',
  },

  title: {
    fontSize: FONT_SIZE.m,
    fontWeight: 'bold',
  },

  rating: {
    fontSize: FONT_SIZE.s,
    color: COLORS.gray,
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

  bottomBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  bagstyle: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },

  bagtxt: {
    color: COLORS.white,
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    paddingVertical: 12,
  },

})