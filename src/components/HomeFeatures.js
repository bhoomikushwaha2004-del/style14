import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeFeatures = ({handleCategory, handleSort}) => {
  const [sortedData,setSortedData] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  return (
    <View style={styles.container}>

      
      <View style={styles.topRow}>
        <Text style={styles.title}>All Featured</Text>

        <View style={styles.rightBtns}>
          
          {/* Sort */}
          <TouchableOpacity onPress={()=> setSortedData(!sortedData)}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sort</Text>
              <Image source={require('../assets/sort-icon.png')} />
            </View>
          </TouchableOpacity>
          {
          sortedData && (
            <View style={styles.sortBox}>
    <TouchableOpacity
      onPress={() => {
        handleSort('high');
        setSortedData(true);
      }}>
      <Text style={styles.sortItem}> Price: High to Low</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        handleSort('low');
        setSortedData(true);
      }}>
      <Text style={styles.sortItem}> Price: Low to High</Text>
    </TouchableOpacity>
  </View>
          )
        }

          {/* Filter */}
          <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Filter</Text>
              <Image source={require('../assets/flt-icon.png')} />
            </View>
          </TouchableOpacity>
          {showFilter && (
  <View style={styles.filterBox}>
    
    <TouchableOpacity
      onPress={() => {
        handleCategory("men's clothing");
        setShowFilter(false);
      }}>
      <Text style={styles.filterItem}> Mens</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        handleCategory("women's clothing");
        setShowFilter(false);
      }}>
      <Text style={styles.filterItem}> Womens</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        handleCategory("jewelery");
        setShowFilter(false);
      }}>
      <Text style={styles.filterItem}> Jewellery</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        handleCategory("electronics");
        setShowFilter(false);
      }}>
      <Text style={styles.filterItem}> Electronics</Text>
    </TouchableOpacity>

  </View>
)}

        </View>
      </View>

      {/* Category */}
      <View style={styles.categoryCont}>

        {/* Mens */}
        <TouchableOpacity onPress={()=> handleCategory("men's clothing")} style={styles.categoryItem}>
          <Image source={require('../assets/mens-img.png')} style={styles.categoryImg} />
          <Text style={styles.categoryText}>Mens</Text>
        </TouchableOpacity>

        {/* Womens */}
        <TouchableOpacity onPress={()=> handleCategory("women's clothing")} style={styles.categoryItem}>
          <Image source={require('../assets/womens-img.png')} style={styles.categoryImg} />
          <Text style={styles.categoryText}>Womens</Text>
        </TouchableOpacity>

        {/* Jewelry */}
        <TouchableOpacity onPress={()=> handleCategory("jewelery")} style={styles.categoryItem}>
          <Image source={require('../assets/jewels-icon.jpg')} style={styles.categoryImg} />
          <Text style={styles.categoryText}>Jewelry</Text>
        </TouchableOpacity>

        {/* Electronics */} 
        <TouchableOpacity onPress={()=> handleCategory("electronics")} style={styles.categoryItem} >
          <Image source={require('../assets/elect-icon.jpg')} style={styles.categoryImg} />
          <Text style={styles.categoryText}>Electronics</Text>
        </TouchableOpacity>
      </View>
      

    </View>
  );
};

export default HomeFeatures;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingBottom: 17,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  rightBtns: {
    flexDirection: 'row',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 3,
    marginLeft: 10,
  },

  btnText: {
    fontSize: 12,
    marginRight: 5,
    color: '#000',
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  categoryItem: {
    alignItems: 'center',
  },

  categoryImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    paddingLeft:16
  },

  categoryText: {
    marginTop: 6,
    fontSize: 13,
    color: '#555',
  },
  categoryCont:{
    padding: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sortItem: {
  paddingVertical: 8,
  fontSize: 14,
  color: '#333',
},
filterBox: {
  position: 'absolute',
  top: 150,
  right: 20, // thoda left shift so it doesn't overlap sort
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 10,
  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 5,
  width: 170,
  zIndex: 100,
},

filterItem: {
  paddingVertical: 10,
  fontSize: 14,
  color: '#333',
},
sortBox: {
  position: 'absolute',
  top: 50,
  right: 20,
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 10,
  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 5,
  width: 160,
  zIndex: 100,
},
});