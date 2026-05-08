import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, COMMON } from '../styles';
import Cross from 'react-native-vector-icons/Entypo'

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
              <Text>₹ {(item.price * (item.quantity || 1)).toFixed(2)}</Text>

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

export default CartItems

const styles = StyleSheet.create({
    contentCont: {
    paddingTop: 37,
    paddingHorizontal: 17,
    backgroundColor: COLORS.white,
    elevation: 20,
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: 153,
    width: 123,
    borderRadius: RADIUS.sm,
    resizeMode: 'contain',
  },
  infoCont: {
    paddingLeft: 21,
    paddingTop: 7,
    paddingBottom: 16,
    paddingRight: 40,
  },
  title: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    width: 200,
  },
  desc: {
    paddingTop: 10,
    fontSize: FONT_SIZE.m,
    width: 200,
  },
  qty: {
    top: 8,
    flexDirection: 'row',
    width: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: RADIUS.sm,
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

  
})