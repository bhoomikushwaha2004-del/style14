import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Card } from 'react-native-paper';
import Coupon from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import { removeCart, handleQuantity } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons'

const PlaceOrder = () => {
  const route = useRoute();

  const { selector } = route.params;

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.items)
  // console.log(cartItems, 'cartitems');
  

  const manageQuantity = (id, q) => {
    let quantity = q <=1 ? 1: q;

    dispatch(handleQuantity({id,quantity}))
    console.log(manageQuantity, 'managequantity' );
  };
    
  

  

  const totalPrice = cartItems.reduce((sum, item) => {
    const qty = item.quantity ? item.quantity : 1;
    return sum + item.price * qty;
  }, 0);


  if(cartItems.length === 0) {
    return(
      <View> 
        <Text style={{fontSize:18,fontWeight:'bold'}}>No items in Cart 🛒 </Text>
      </View>
    )
  }

  return (
    <>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <Text>{cartItems.length} items </Text>

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
        />

        {/* details */}
        <View style={{ margin: 15, backgroundColor: '#FFFFFF', padding: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.couponicon}>
              <Coupon name="ticket-alt" size={24} />
            </View>

            <Text style={styles.coupontxt}>Apply Coupons</Text>

            <Text style={styles.selectTxt}>Select</Text>
          </View>

          <View
            style={{
              height: 0,
              borderWidth: 1,
              borderColor: '#BBBBBB',
              margin: 5,
              marginTop: 20,
            }}
          />

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
              Order Payment Details
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text>Order Amounts</Text>
              <Text style={{ left: 200, fontWeight: 'bold' }}>₹{totalPrice}</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text>Convenience</Text>
              <Text style={{ color: '#F83758', fontWeight: 'bold' }}>
                {' '}
                Know more
              </Text>
              <Text style={{ left: 100, fontWeight: 'bold', color: '#F83758' }}>
                Apply Coupon
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 30 }}
            >
              <Text>Delivery Fee</Text>
              <Text style={{ left: 240, fontWeight: 'bold', color: '#F83758' }}>
                Free
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 0,
              borderWidth: 1,
              borderColor: '#BBBBBB',
              margin: 5,
              marginTop: 20,
            }}
          />

          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>Order Total</Text>
              <Text style={{ fontWeight: 'bold', left: 200 }}>
                ₹ {totalPrice}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text>EMI Available</Text>
              <Text style={{ color: '#F83758', left: 20, fontWeight: 'bold' }}>
                Details
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Payment Footer */}
      <View>
        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold', top: 40, left: 22, fontSize: 16 }}>
            ₹ {totalPrice}
          </Text>
          <Text
            style={{
              color: '#F83758',
              fontSize: 12,
              left: 21,
              top: 45,
              fontWeight: 'bold',
              
            }}
          >
            View Details{' '}
          </Text>

          <View>
            <TouchableOpacity style={styles.paymentbtn}>
              <Text style={{color:'#FFFFFF',textAlign:'center',fontSize:17,top:10}}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const CartItems = ({ item, manageQuantity, dispatch,removeCart }) => {
  return (
    <>
      <Card style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          <Card.Cover source={{ uri: item.image }} style={styles.img} />
          <Card.Content>
            <Text variant="titleLarge" style={{fontWeight:'bold', paddingTop:7,fontSize:16,paddingLeft:21,paddingRight:39,paddingBottom:8,width:188,height:23}} >{item.title} </Text>
            <Text variant="bodyMedium" ellipsizeMode="tail" numberOfLines={1} style={{paddingLeft:21,width:188}}>{item.description} </Text>


            <View style={{flexDirection:'row',alignItems:'center', marginTop:10}}>
              <Text>Quantity </Text>
              <TouchableOpacity style={{padding:5, borderWidth:1,}} onPress={()=> manageQuantity(item.id, (item.quantity || 1)-1)}>
                <Text>{'-'} </Text>
              </TouchableOpacity>
              <Text>{item.quantity || 1} </Text>

              <TouchableOpacity style={{padding:5, borderWidth:1,}} onPress={()=> manageQuantity(item.id, (item.quantity || 1)+1)}>
                <Text>{'+'} </Text>
              </TouchableOpacity>

            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', top:20}}>
              <Text>₹ {item.price * (item.quantity ||1 )}</Text>

            <TouchableOpacity onPress={()=> dispatch(removeCart(item.id))}>
              <DeleteIcon name='delete' size={24} color={'red'} />
            </TouchableOpacity>
            </View>

          </Card.Content>
        </View>
      </Card>
    </>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  card: {
    height: 154,
    margin: 15,
    backgroundColor: '#FFFFFF',
    // elevation:0
  },
  img: {
    height: 153,
    width: 123,
    marginLeft: 10,
    borderRadius: 4,
  },
  dropdown: {
    height: 30,
    width: 86,
    borderWidth: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    marginTop: 40,
  },
  couponicon: {
    color: '#231F20',
    height: 20,
    width: 31,
  },
  coupontxt: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  selectTxt: {
    color: '#F83758',
    fontSize: 14,
    marginLeft: 170,
    fontWeight: 'bold',
  },
  container: {
    height: 146,
    width: '100%',
    borderRadius: 24,
    borderWidth: 0.5,
    top: 145,
    borderColor: 'grey',
    // marginLeft:10
  },
  paymentbtn:{
    borderWidth:1,
    backgroundColor:'#F83758',
    borderColor:'#F83758',
    left:152,
    height:48,
    width:219,
    borderRadius:5
  },
  deletebtn:{
    borderWidth:1,
    height:30,
    width: 70,
    borderRadius:10,
    borderColor:'red'
  }
});