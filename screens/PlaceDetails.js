import React, {useEffect, useState} from 'react'
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native'
import OutlinedButton from '../components/UI/OutlinedButton'
import { Colors } from '../constants/color'
import { fetchPlaceDetails } from '../utls/database'

export default function PlaceDetails({route, navigation}) {
    const [fetchPlace, setfetchPlace] = useState()
    
    const showOnMapHandler = () => {
        navigation.navigate('Map',{
            initialLat: fetchPlace.location.lat,
            initialLng: fetchPlace.location.lng
        })
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(async() => {
        const place = await fetchPlaceDetails(selectedPlaceId)
        setfetchPlace(place)
        navigation.setOptions({
            title: place.title,

        })
    }, [selectedPlaceId])
    

    if (!fetchPlace){
        return <View style={styles.fallback}>
            <Text>Loading place data...</Text>
        </View>
    }


  return (
      <ScrollView >
          <Image source={{uri: fetchPlace.imageUri}} style={styles.image}/>
          <View style={styles.locationContainer}>
              <View style={styles.addressContainer}>
                  <Text style={styles.address}>{fetchPlace.address || 'Hai Minh, Hai Hau, Nam Dinh'}</Text>
              </View>
              <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
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