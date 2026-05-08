import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../styles';


const OrderDetails = ({ totalPrice, coupon }) => {
  return (
    <SafeAreaView style={styles.detailsCard}>
      {/* Coupon */}
      <View style={styles.rowBetween}>
        <Text>{coupon}</Text>
        <Text style={styles.bold}>Apply Coupons</Text>
        <Text style={styles.red}>Select</Text>
      </View>

      <View style={styles.divider} />

      {/* Payment Details */}
      <Text style={styles.heading}>Order Payment Details</Text>

      <View style={styles.rowBetween}>
        <Text>Order Amounts</Text>
        <Text style={styles.bold}>₹{totalPrice.toFixed(2)}</Text>
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
        <Text style={styles.bold}>₹{totalPrice.toFixed(2)}</Text>
      </View>

      <Text style={styles.redSmall}>EMI Available</Text>
    </SafeAreaView>
  );
};

export default OrderDetails

const styles = StyleSheet.create({
  detailsCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.m,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  heading: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  red: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  redSmall: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.s,
    paddingTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: SPACING.sm,
  },
})