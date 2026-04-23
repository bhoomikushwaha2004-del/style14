import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const WishList = () => {
  const wishlist = useSelector(state => state.cart.wishlist)
  return (
    <FlatList
    data={wishlist}
    renderItem={({item}) => (
      <Text>{item.title} </Text>
    )} 
    />
  )
}

export default WishList

const styles = StyleSheet.create({})