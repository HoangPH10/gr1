import React, {useState} from 'react'
import {ScrollView, View, Text, TextInput, StyleSheet} from 'react-native'
import { Colors } from '../../constants/color';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import {TextModel} from '../../models/text'

export default function TextForm({onCreateText}) {
    const [enteredTitle, setenteredTitle] = useState('')

    const [selectedIamge, setselectedIamge] = useState()

    const changeTitleHandler = text => {
        setenteredTitle(text);
    }

    const takeImageHandler = (imageUri) => {
        setselectedIamge(imageUri)
    }


    const savePlaceHandler = () => {
        const textData = new TextModel(enteredTitle, selectedIamge);
        onCreateText(textData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText= {changeTitleHandler} value = {enteredTitle} />
            </View>
            <ImagePicker onPickImage ={takeImageHandler}/>
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    form:{
        flex: 1,
        padding: 24,
    },
    label:{
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
        fontSize: 16
    },
    input:{
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})