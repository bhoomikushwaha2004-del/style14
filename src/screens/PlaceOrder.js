import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Coupon from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import { removeCart, handleQuantity } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';

const PlaceOrder = () => {
  const route = useRoute();

  const { selector } = route.params;

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  // console.log(cartItems, 'cartitems');

  const manageQuantity = (id, q) => {
    let quantity = q <= 1 ? 1 : q;

    dispatch(handleQuantity({ id, quantity }));
    console.log(manageQuantity, 'managequantity');
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const qty = item.quantity ? item.quantity : 1;
    return sum + item.price * qty;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          No items in Cart 🛒{' '}
        </Text>
      </View>
    );
  }
  return (
    <>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CartItems
            item={item}
            selector={selector}
            cartItems={cartItems}
            manageQuantity={manageQuantity}
            dispatch={dispatch}
            removeCart={removeCart}
          />
        )}

        ListFooterComponent={<OrderDetails totalPrice={totalPrice} Coupon={<Coupon />}/>}
        contentContainerStyle={{paddingBottom:120}}
      />

      

      {/* Payment Footer */}
        <View style={styles.footer}>
    <View style={styles.footerRow}>
      <View>
        <Text style={styles.footerPrice}>₹ {totalPrice.toFixed(0)}</Text>
        <Text style={styles.viewDetails}>View Details</Text>
      </View>

      <TouchableOpacity style={styles.payBtn}>
        <Text style={styles.payText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  </View>
    </>
  );
};

const CartItems = ({ item, manageQuantity, dispatch, removeCart }) => {
  return (
    <>
      <View style={styles.contentCont}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.img} />

          <View style={styles.infoCont}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>

            <Text style={styles.desc} numberOfLines={1}>
              {item.description}
            </Text>

            <View style={styles.qty}>
              <TouchableOpacity
                onPress={() =>
                  manageQuantity(item.id, (item.quantity || 1) - 1)
                }
                style={styles.plsbtn}
              >
                <Text>{'-'}</Text>
              </TouchableOpacity>

              <Text style={styles.qtyNo}>{item.quantity || 1}</Text>

              <TouchableOpacity
                onPress={() =>
                  manageQuantity(item.id, (item.quantity || 1) + 1)
                }
                style={styles.plsbtn}
              >
                <Text>{'+'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceCont}>
              <Text>₹ {(item.price * (item.quantity || 1)).toFixed(0)}</Text>

              <TouchableOpacity onPress={() => dispatch(removeCart(item.id))}>
                <DeleteIcon name="delete" size={24} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const OrderDetails = ({ totalPrice }) => {
  return (
    <View style={styles.detailsCard}>

      {/* Coupon */}
      <View style={styles.rowBetween}>
        <Text style={styles.bold}>Apply Coupons</Text>
        <Text style={styles.red}>Select</Text>
      </View>

      <View style={styles.divider} />

      {/* Payment Details */}
      <Text style={styles.heading}>Order Payment Details</Text>

      <View style={styles.rowBetween}>
        <Text>Order Amounts</Text>
        <Text style={styles.bold}>₹{totalPrice.toFixed(0)}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text>Convenience</Text>
        <Text style={styles.red}>Apply Coupon</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text>Delivery Fee</Text>
        <Text style={styles.red}>Free</Text>
      </View>

      <View style={styles.divider} />

      {/* Total */}
      <View style={styles.rowBetween}>
        <Text style={styles.bold}>Order Total</Text>
        <Text style={styles.bold}>₹{totalPrice.toFixed(0)}</Text>
      </View>

      <Text style={styles.redSmall}>EMI Available</Text>

    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  contentCont: {
    paddingTop: 37,
    paddingHorizontal: 17,
    backgroundColor: '#FFFFFF',
    elevation: 20,
    // bottom:20
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: 153,
    width: 123,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  infoCont: {
    paddingLeft: 21,
    paddingTop: 7,
    paddingBottom: 16,
    paddingRight: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // paddingRight:40,
    width: 200,
  },
  desc: {
    paddingTop: 10,
    fontSize: 13,
    width: 200,
  },
  qty: {
    top: 8,
    flexDirection: 'row',
    // borderWidth:1,
    width: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
  },
  plsbtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  qtyNo: {
    paddingTop: 5,
  },
  priceCont: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsCard:{
  backgroundColor:'#fff',
  padding:16
},

rowBetween:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  paddingVertical:6
},

heading:{
  fontSize:16,
  fontWeight:'bold',
  paddingVertical:10
},

bold:{
  fontWeight:'bold'
},

red:{
  color:'#F83758',
  fontWeight:'bold'
},

redSmall:{
  color:'#F83758',
  fontSize:12,
  paddingTop:4
},

divider:{
  height:1,
  backgroundColor:'#eee',
  marginVertical:10
},


footer:{
  position:'absolute',
  bottom:0,
  left:0,
  right:0,
  backgroundColor:'#fff',
  padding:16,
  borderTopWidth:1,
  borderColor:'#eee'
},

footerRow:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
},

footerPrice:{
  fontSize:16,
  fontWeight:'bold'
},

viewDetails:{
  color:'#F83758',
  fontSize:12
},

payBtn:{
  backgroundColor:'#F83758',
  paddingVertical:12,
  paddingHorizontal:20,
  borderRadius:6
},

payText:{
  color:'#fff',
  fontWeight:'bold'
}
});
