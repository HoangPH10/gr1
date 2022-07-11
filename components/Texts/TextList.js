import { FlatList, View, StyleSheet, Text } from 'react-native'
import React from 'react'
import PlaceItem from './TextItem'
import { Colors } from '../../constants/color'
import { useNavigation } from '@react-navigation/native'


export default function TextList({places}) {
    const navigation = useNavigation();

    const selectPlaceHandler = (id) => {
        navigation.navigate('PlaceDetails', {
            placeId: id
        })
    }

    if(!places || places.length === 0){
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added yet- start adding some!</Text>
        </View>
    }

    return (
        <FlatList 
            style={styles.list} 
            data={places}
            keyExtractor={(item) => {return item.id}}
            renderItem = {({item}) => <PlaceItem onSelect={selectPlaceHandler} place={item} />}
        />
    )
}


const styles = StyleSheet.create({
    list:{
        margin: 24
    },
    fallbackContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText:{
        fontSize: 14,
        color: Colors.primary200
    }
})