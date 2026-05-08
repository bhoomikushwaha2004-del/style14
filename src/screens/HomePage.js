import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeFeatures from '../components/HomeFeatures';
import HomeHeader from '../components/HomeHeader';
import Loader from '../components/Loader';
import NoDataFound from '../components/NoDataFound';
import ProductCards from '../components/ProductCards';
import { fetchProducts } from '../redux/productSlice';

const HomePage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: '',
  });

  const navigation = useNavigation();

  const selector = useSelector(state => state.products.products);
  // console.log(selector, 'prodselector');

  const isLoader = useSelector(state => state.products.loading);
  // const selector = useSelector(state => state.products.items);
  console.log(selector, 'selector on home');

  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.cart.wishlist);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    filterData(filters)
  }, [selector]);

  // const getProd = async () => {
  //   setIsLoader(true);
  //   const result = await getData();
  //   setData(result);

  //   setIsLoader(false);
  //   setFilteredData(result);
  // };

  const cartnvg = item => {
    navigation.navigate('cart', { item });
  };

  const filterData = updatedFilter => {
    let filtered = [...selector];

    if (updatedFilter.search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(updatedFilter.search.toLowerCase()),
      );
    }

    if (updatedFilter.category) {
      filtered = filtered.filter(item =>
        item.category.toLowerCase()=== updatedFilter.category.toLowerCase(),
      );
    }

    if (updatedFilter.sort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }  
    if (updatedFilter.sort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    }
    setFilteredData(filtered);
  };

  if (isLoader) {
    return <Loader />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const numColumn = 2;

  const handleCategory = cat => {
    const updatedFilter = {...filters, category:cat || ''}

    setFilters(updatedFilter);
    filterData(updatedFilter);
  };

  const handleSearch = text => {
    const updatedFilter = {...filters, search:text}

    setFilters(updatedFilter);
    filterData(updatedFilter);
  };

  const handleSort = type => {
    const updatedFilter = {...filters, sort:type || ''}

    setFilters(updatedFilter);
    filterData(updatedFilter);
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <HomeHeader handleSearch={handleSearch} />
      <HomeFeatures handleCategory={handleCategory} handleSort={handleSort} />

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
                <ProductCards
                  item={item}
                  cartnvg={cartnvg}
                  wishlist={wishlist}
                  dispatch={dispatch}
                />
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};



export default HomePage;

const styles = StyleSheet.create({
  
  columns: {
    paddingBottom: 16,
    gap: 16,
  },
  mainContainer: {
    paddingHorizontal: 16,
    // paddingTop:16
  },
  noItems: {
    fontWeight: 'bold',
    left: 20,
  },
  
});
