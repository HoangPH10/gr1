import React, {useState} from 'react'
import { Text,View,Alert, StyleSheet, Image } from 'react-native'
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/color'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { getAddress, getMapPreview } from '../../utls/location'
export default function LocaltionPicker({onPickLocation}) {

    const [pickedLocation, setpickedLocation] = useState()

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    
    React.useEffect(() => {
        onPickLocation(pickedLocation)
    },[pickedLocation, onPickLocation])




    React.useEffect(() => {
        if (isFocused && route.params){
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            }
            setpickedLocation(mapPickedLocation);
        }
    },[route, isFocused])


    React.useEffect(() => {
        async function handleLocation (){
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address: address})
            }
        }
        
    },[pickedLocation, onPickLocation])




    const verifyPermissions = async() => {
        if(locationPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(locationPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions',
            'You need to grant camera permissions to use this app.');
            return false;
        }
        return true;
    }


    const getLocationHandler = async() => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return ;
        }

        const location = await getCurrentPositionAsync();
        setpickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })   
    }

    const pickOnMapHandler = () =>{
        navigation.navigate("Map")
    }

    let locationPreview = <Text>No location picked yet</Text>

    if(pickedLocation){
        locationPreview = (
            <Image 
            style={styles.image}
            source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} />
        )
    }

  return (
    <View style={styles.container}>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton style={styles.button} onPress={getLocationHandler} icon='location'>Locate User</OutlinedButton>
            <OutlinedButton style={styles.button} onPress={pickOnMapHandler} icon = 'map'>Pick on Map</OutlinedButton>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        marginBottom: 20
    },
    mapPreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 5,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button:{
        width: 100
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
    }
})