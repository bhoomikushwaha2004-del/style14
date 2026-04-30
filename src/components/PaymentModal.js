import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PaymentModal = () => {
  return (
    <Modal transparent={true} animationType="fade" statusBarTranslucent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Icon name="x" size={20} color={'#000'} />
          </TouchableOpacity>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../assets/circle.jpg')}
              style={styles.image}
              resizeMode='contain'
            />
            <Image
              source={require('../assets/tick.jpg')}
              style={styles.tick}
              resizeMode='contain'
            />
          </View>
          <Text style={styles.text}>Payment done successfully.</Text>
        </View>
      </View>
      </Modal>
  )
}

export default PaymentModal

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:0,
    right:0,
    left:0,
    bottom:0,
  },
  modalContainer: {
    width: 310,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 6,
    elevation: 20,
    position:'relative',
    height:201,
  },
  image:{
    height:100,
    width:100,
  },
  close:{
    position:'absolute',
    top:12,
    right:12,
    zIndex:10,
    padding:4,
  },
  tick:{
    position:'absolute',
    height:40,
    width:40,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text:{
    color:'#222222',
    fontSize:14,
    fontWeight:'600',
    padding:20,
    paddingLeft:50
  },
})