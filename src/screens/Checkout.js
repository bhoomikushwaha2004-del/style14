import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import NoItem from '../components/NoItem';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../styles';
import ItemList from '../components/ItemList'

const Checkout = () => {
  const navigation = useNavigation();

  const selector = useSelector((state)=> state.cart.items)
  console.log(selector,'selector on checkout');

  const products = useSelector(state => state.products.products)

      
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
          renderItem={({item})=> {

            const fullProduct = products.find( p => p.id === item.id)
            if(!fullProduct) return null

            return (
              <ItemList item={{...fullProduct,quantity: item.quantity}} />
            )
          
        } } 
          
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