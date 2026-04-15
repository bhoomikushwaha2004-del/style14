import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const PaymentFooter = () => {
    const route = useRoute()
    const cartItems = route.params;
    const {totalPrice} = route.params;
  return (
    <View>
      <View style={styles.container}>
        <Text>₹{totalPrice} </Text>
      </View>
    </View>
  )
}

export default PaymentFooter

const styles = StyleSheet.create({
    container:{
        height:146,
        width:393,
        borderRadius:24
    }
})