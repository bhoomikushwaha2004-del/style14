import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import HomeFeatures from '../components/HomeFeatures'
import { getData } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import NoDataFound from '../components/NoDataFound'
import {  useSelector,useDispatch } from 'react-redux';
import { COLORS, SPACING, FONT_SIZE, RADIUS, } from '../styles';
import HearOutline from 'react-native-vector-icons/FontAwesome'
import Heart from 'react-native-vector-icons/FontAwesome'
import { addToWishlist, removeFromWishlist } from '../redux/slice';

const HomePage = () => {

  // const [data, setData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const[searchText, setSearchText] = useState('')
  const [ category, setCategory] = useState('')
  
  

  const navigation = useNavigation();


  const selector = useSelector(state => state.products.items);
  console.log(selector, 'selector on home');

  const dispatch = useDispatch();
  const wishlist=  useSelector(state => state.cart.wishlist)

  useEffect(() => {
    getProd();
  }, []);

  const getProd = async () => {
    setIsLoader(true);
    const result = await getData();
    // setData(result);

    setIsLoader(false);
    setFilteredData(result);
  };

  const cartnvg = item => {
    navigation.navigate('cart', { item });
  };

  const filterData = (text,cat) => {
    let filtered = filterData;

    if(text){
      filtered= filtered.filter(item => item.title.toLowerCase().includes(text.toLowerCase()))
    }

    if(cat) {
      filtered= filtered.filter(item => item.category.toLowerCase() === cat.toLowerCase())
    }

    setFilteredData(filtered)
  }

  if (isLoader) {
    return <Loader />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await getProd();
    setRefreshing(false);
  };

  const numColumn = 2;

  const handleCategory = cat=> {
    setCategory(cat)
    filterData(searchText,cat)
  }

  const handleSearch = text => {
    setSearchText(text)
    filterData(text,category)
  }

  const handleSort = type => {
    let sortedData = [...filteredData]

    if(type==='high'){
      sortedData.sort((a,b) => b.price - a.price)
    } else if(type=== 'low'){
      sortedData.sort((a,b) => a.price - b.price)
    }

    setFilteredData(sortedData)
    
  }
  return (
    <>
    <HomeHeader handleSearch={handleSearch}  />
    <HomeFeatures handleCategory={handleCategory} handleSort={handleSort}  />

    {/* count */}
       <View>
         <Text style={styles.noItems}>{filteredData.length} items </Text>
       </View>

    <View>
      {filteredData.length === 0 ? (
          <NoDataFound />
        ) : (
          <>
          
            <FlatList
              data={filteredData}
              numColumns={numColumn}
              onRefresh={onRefresh}
              refreshing={refreshing}
              contentContainerStyle={styles.mainContainer}
              columnWrapperStyle={styles.columns}
              renderItem={({ item }) => (
                <ProductCards item={item} cartnvg={cartnvg}  wishlist={wishlist}  dispatch={dispatch} />
              )}
            />
          </>
        )}
      </View>

    </>
  )
}

const ProductCards = ({ item, cartnvg, dispatch,wishlist }) => {

  const isHearted = wishlist.some(w => w.id === item.id)
  

  const handleHeart =() => {
    if(isHearted){
      dispatch(removeFromWishlist(item))
    } else {
      dispatch(addToWishlist(item))
    }
  }

  
  
  return (
    <TouchableOpacity style={styles.card} onPress={() => cartnvg(item)}>

      <View style={styles.hertView}>
        <TouchableOpacity onPress={handleHeart}>
          {
            !isHearted ? 
            <HearOutline name='heart-o' size={20} style={styles.hrtOutline} />
            : 
            <Heart name='heart' size={20} color={'red'} style={styles.hrtOutline}/>
          }
          
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
  );
};

export default HomePage

const styles = StyleSheet.create({
  countCont: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
  },
  countText: {
    fontSize: FONT_SIZE.m,
  },
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
  noItems:{
    fontWeight:'bold',
    left:20
  },
  hertView:{
    zIndex:1,
    
    
    width:30,
    position:'absolute',
    left:5,
    top:5
  },
  hrtOutline:{
    padding:5,
    // color:'black'
  },
  columns:{
    paddingBottom:16,
    gap:16,
  },
  mainContainer:{
    paddingHorizontal:16,
    // paddingTop:16
  }
})