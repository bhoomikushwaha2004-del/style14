import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from 'react-native-vector-icons/Fontisto';
import Mic from 'react-native-vector-icons/Feather';
//   import { border, borderRadius,flex, fontFamily, fontSizes, fontWeight, height, icons, letterSpacing, lineHeight, padding, paddingVertical, width } from '../../constants'
  import { micEvents, SpeechToText } from 'react-native-speech-convertor';
// import {useTheme} from '../../hooks/useTheme'

const Demo = () => {
    const[search,setSearch] = useState('')
    const [isListening, setIsListening] = useState(false); //for styling
    //Speech recognition
  useEffect(() => {

    // Listen for recognized speech results
    // onSpeechResult: Triggered when speech is recognized.
    const resultListener = micEvents.addListener('onSpeechResult', (data) => {
      setSearch(data);
    });



    // Listen for speech recognition errors
    // onSpeechError: Triggered when an error occurs.
    const errorListener = micEvents.addListener('onSpeechError', (err) => {
      console.log('Speech error:', err);
    });

    // Clean up listeners on unmount
    return () => {
      resultListener.remove();
      errorListener.remove();
    };
  }, []);


  console.log(search, 'text found ');
  
  return (
    <View>
      <TouchableOpacity
            onPress={() => {
              setIsListening(true);
              SpeechToText.startListening(); 
              setTimeout(() => {
                SpeechToText.stopListening();
                setIsListening(false);
              }, 4000);
            }}
            // style={isListening? styles.listening : null}
          >
            <Text>hey</Text>
            {/* <Mic name="mic" size={icons.mic} style={styles.micIcon} /> */}
          </TouchableOpacity>
    </View>
  )
}

export default Demo