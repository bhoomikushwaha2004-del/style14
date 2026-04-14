import { StyleSheet, Text, View , Button, FlatList} from 'react-native'
import React from 'react'
import { Avatar,  Card } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import NoItem from '../components/NoItem'


const Checkout = () => {

  const navigation = useNavigation();

  const selector = useSelector((state)=> state.cart.items)
  console.log(selector,'selector on checkout');

      
  const placeordnvg=(item)=> {
    navigation.navigate('bag',{selector})
  }

  return (
    <View>
      {selector.length === 0 ? (
        <NoItem />
      ):(<> 
        <Text style={styles.shptxt}>Shopping List</Text>
      
      
          <FlatList
          data={selector}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item})=> <ItemList item={item} />} 
          
          />
           <Button onPress={()=>placeordnvg(selector)} title='bag'/>
          </>
      )}
      

 
    </View>
    
  )
}

const ItemList =({item}) => {
return(
  <Card style={styles.card} >

        <View style={{flexDirection:'row'}}>
        
    <Card.Cover source={{ uri: item.image }} style={styles.img}/>
    <Card.Content>
      <Text variant="titleLarge">{item.title}</Text>
      <Text variant="bodyMedium">Card content</Text>
      <View style={styles.pricebox}>
        <Text style={styles.pricetxt} >₹{item.price} </Text>
      </View>
    </Card.Content>
     </View>

     <View style={{height:0,borderWidth:1,borderColor:'#BBBBBB',margin:10,marginTop:20}}/>

     <View style={{flexDirection:'row'}}>
      <Text style={{marginLeft:10}}>Total Order(1)   :</Text>
      <Text style={{marginLeft:200}}>₹{item.price} </Text>
     </View>
  </Card>
)
}

export default Checkout

const styles = StyleSheet.create({
    shptxt:{
        fontSize:14,
        fontWeight:'bold',
        width:100,
        height:22,
        marginLeft:22,
        marginTop:20
    },
    card:{
      backgroundColor:'#FFFFFF',
      marginLeft: '22',
      marginRight:22,
      height:191,
      marginBottom:10
    },
    img:{
      height:125,
      width:130.53,
      left:10,
      top:10,
      resizeMode:'contain'
    },
    pricebox:{
      borderWidth:1,
      height:40,
      width:84,
      borderRadius:4,
      borderColor:'#CACACA',
      top:50
    },
    pricetxt:{
      marginLeft:10,
      marginTop:8,
      fontWeight:'bold',
      fontSize:16
    }
})