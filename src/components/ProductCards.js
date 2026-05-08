import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {  HearOutline,  Heart } from 'react-native-vector-icons/FontAwesome';
import { addToWishlist, removeFromWishlist } from '../redux/slice';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../styles';

const ProductCards = ({ item, cartnvg, dispatch, wishlist }) => {
  const isHearted = wishlist.some(w => w.id === item.id);

  const handleHeart = () => {
    if (isHearted) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  return (
    <View>
        <TouchableOpacity style={styles.card} onPress={() => cartnvg(item)}>
      <View style={styles.hertView}>
        <TouchableOpacity onPress={handleHeart}>
          {!isHearted ? (
            <HearOutline name="heart-o" size={20} style={styles.hrtOutline} />
          ) : (
            <Heart
              name="heart"
              size={20}
              color={'red'}
              style={styles.hrtOutline}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* img */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {/* Description */}
        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>

        {/* price */}
        <Text style={styles.price}>₹{item.price}</Text>

        {/* Rate */}
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐⭐⭐⭐☆</Text>
          <Text style={styles.count}> {item.rating?.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>
    
  );
};

export default ProductCards;

const styles = StyleSheet.create({
    card: {
    width: '45%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    margin: SPACING.s,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    overflow: 'hidden',
    // left:10,
    // right:8
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: COLORS.bg,
    // borderRadius:5
  },
  content: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.l,
    fontWeight: '600',
    color: COLORS.black,
  },
  desc: {
    fontSize: FONT_SIZE.s,
    color: COLORS.gray,
    marginTop: 6,
  },
  price: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  star: {
    color: '#F5A623',
    fontSize: FONT_SIZE.s,
  },
  count: {
    color: '#999',
    fontSize: FONT_SIZE.s,
  },
  
  hertView: {
    zIndex: 1,

    width: 30,
    position: 'absolute',
    left: 5,
    top: 5,
  },
  hrtOutline: {
    padding: 5,
    // color:'black'
  },
  
})