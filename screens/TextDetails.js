import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native'
import { Colors } from '../constants/color'
import { fetchTextDetail } from '../utils/database'

export default function TextDetails({route, navigation}) {
    const [fetchText, setfetchText] = useState()
    const [predictedText, setPredictedText] = useState('');
    console.log(fetchText);


    const getPredict = async() => {
        let headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
    
        }



        console.log(fetchText.base64[1])
        const response =  await axios.post('http://10.0.206.58:5000/predict', {
            base64 : fetchText.base64
        }, headers)
        setPredictedText(response.data.predicted)
        
    }




        
    
    

    const selectedTextId = route.params.textId;

    const getTextDetail = async() => {
        const text = await fetchTextDetail(selectedTextId)
        setfetchText(text)
        navigation.setOptions({
            title: text.title,

        })
    }

    useEffect(() => {
        getTextDetail();
    }, [selectedTextId])

    useEffect(() => {
        if (fetchText && fetchText.base64){
            try{
               getPredict();
            }catch(err){
                console.log(err)
            }
        }
    }, [fetchText])
    

    if (!fetchText){
        return <View style={styles.fallback}>
            <Text>Loading place data...</Text>
        </View>
    }


  return (
      <ScrollView >
          <Image source={{uri: fetchText.imageUri }} style={styles.image}/>
          <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>Predicted : { predictedText}</Text>
            </View>
          </View>
      </ScrollView>
  )
}


const styles = StyleSheet.create({
    fallback:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen:{
        alignItems: 'center'
    },
    image:{
        height: '35%',
        minHeight: 300,
        width: '100%',
    },
    locationContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20
    },
    address :{
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
})