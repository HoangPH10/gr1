import {View, Button, Alert, Text, StyleSheet, Image }from 'react-native'
import React, {useState} from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker'
import { Colors } from '../../constants/color';
import OutlinedButton from '../UI/OutlinedButton';

export default function ImagePicker({onPickImage}) {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setpickedImage] = useState('')
    const verifyPermissions = async() => {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions',
            'You need to grant camera permissions to use this app.');
            return false;
        }
        return true;
    }
    const takeImageHander = async() => {
        const hasPermission =  await verifyPermissions();
        
        if(!hasPermission){
            return;
        }
        
        const image =  await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
        setpickedImage(image.uri);
        onPickImage(image.uri)
    }

    let imagePreview = <Text>No image taken yet.</Text>
    if(pickedImage){
        imagePreview = <Image  style={styles.image} source={{uri: pickedImage}} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera"  onPress={takeImageHander}>
                Take Image
            </OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 5,
    },
    image:{
        width: '100%',
        height: '100%',
    }
})