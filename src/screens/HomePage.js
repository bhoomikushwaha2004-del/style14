import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import HomeFeatures from '../components/HomeFeatures'
import { getData } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import NoDataFound from '../components/NoDataFound'
import {  useSelector } from 'react-redux';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const[searchText, setSearchText] = useState('')
  const [ category, setCategory] = useState('')

  const navigation = useNavigation();


  const selector = useSelector(state => state.products.items);
  console.log(selector, 'selector on home');

  useEffect(() => {
    getProd();
  }, []);

  const getProd = async () => {
    setIsLoader(true);
    const result = await getData();
    setData(result);

    setIsLoader(false);
    setFilteredData(result);
  };

  const cartnvg = item => {
    navigation.navigate('cart', { item });
  };

  const filterData = (text,cat) => {
    let filtered = data;

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
    <HomeFeatures handleCategory={handleCategory} handleSort={handleSort} />

    {/* count */}
       <View>
         <Text>{filteredData.length} items </Text>
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
              renderItem={({ item }) => (
                <ProductCards item={item} cartnvg={cartnvg} />
              )}
            />
          </>
        )}
      </View>

    </>
  )
}

const ProductCards = ({ item, cartnvg }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => cartnvg(item)}>
      
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
  card: {
  width: '45%',
  backgroundColor: '#fff',
  borderRadius: 12,
  margin: 8,
  elevation: 2, 
  overflow: 'hidden', 
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
},

  image: {
  width: '100%',
  height: 150,
  resizeMode: 'contain', 
  backgroundColor: '#F5F5F5',
},

  content: {
  padding: 12, 
},

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  desc: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },

  price: {
    fontSize: 16,
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
    fontSize: 12,
  },

  count: {
    color: '#999',
    fontSize: 12,
  },
})