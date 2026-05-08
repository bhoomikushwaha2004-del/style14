import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Cross from 'react-native-vector-icons/Entypo';
import Coupon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import CartItems from '../components/CartItems';
import OrderDetails from '../components/OrderDetails';
import { handleQuantity, removeCart } from '../redux/slice';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../styles';

const PlaceOrder = () => {
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);


  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const products = useSelector(state => state.products.products)
  // console.log(cartItems, 'cartitems');

  const manageQuantity = (id, q) => {
    let quantity = q <= 1 ? 1 : q;

    dispatch(handleQuantity({ id, quantity }));
  };


  const finalCart = cartItems.map(cartItem => {
    const product = products.find(p => p.id === cartItem.id)

    return {...product, quantity:cartItem.quantity}

    
  })

  const totalPrice = finalCart.reduce((sum,item) => {
      const qty = item.quantity || 1;

      return sum + item.price * qty;
    },0)

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
        data={finalCart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CartItems
            item={item}
            manageQuantity={manageQuantity}
            dispatch={dispatch}
            removeCart={removeCart}
          />
        )}
        ListFooterComponent={
          <OrderDetails totalPrice={totalPrice} coupon={<Coupon />} />
        }
        contentContainerStyle={{ paddingBottom: 120 }}
        // ListEmptyComponent={}
      />

      {/* Payment Footer */}
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.footerPrice}>₹ {totalPrice.toFixed(2)}</Text>
            <Text style={styles.viewDetails}>View Details</Text>
          </View>

          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.payText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        


          
          <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={()=> setShowModal(false)} style={styles.close}>
            <Cross name='cross' size={20} color={'#000'} />
          </TouchableOpacity>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../assets/circle.jpg')}
              style={styles.image}
              resizeMode='contain'
            />
            <Image
              source={require('../assets/tick.png')}
              style={styles.tick}
              resizeMode='contain'
            />
          </View>
          <Text style={styles.text}>Payment done successfully.</Text>
        </View>
      </View>
        
      </Modal>
    </>
  );
};


export default PlaceOrder;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerPrice: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
  },
  viewDetails: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.s,
  },
  payBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
  },
  payText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:0,
    right:0,
    left:0,
    bottom:0,
  },
  modalContainer: {
    width: 310,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 6,
    elevation: 20,
    // position:'relative',
    height:201,
  },
  image:{
    height:100,
    width:100,
  },
  close:{
    position:'absolute',
    top:12,
    right:12,
    zIndex:10,
    padding:4,
  },
  tick:{
    position:'absolute',
    height:40,
    width:40,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text:{
    color:'#222222',
    fontSize:14,
    fontWeight:'600',
    padding:20,
    paddingLeft:50
  },
});
