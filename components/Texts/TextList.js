import { FlatList, View, StyleSheet, Text } from 'react-native'
import React from 'react'
import TextItem from './TextItem'
import { Colors } from '../../constants/color'
import { useNavigation } from '@react-navigation/native'


export default function TextList({texts}) {
    const navigation = useNavigation();

    const selectTextHandler = (id) => {
        navigation.navigate('TextDetails', {
            textId: id
        })
    }

    if(!texts || texts.length === 0){
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No texts added yet- start adding some!</Text>
        </View>
    }

    return (
        <FlatList 
            style={styles.list} 
            data={texts}
            keyExtractor={(item) => {return item.id}}
            renderItem = {({item}) => <TextItem onSelect={selectTextHandler} text={item} />}
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