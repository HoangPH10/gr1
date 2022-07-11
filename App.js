import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllTexts from './screens/AllTexts';
import AddText from './screens/AddText';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/color';
import Map from './screens/Map'
import React, {useState} from 'react';
import { init } from './utls/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();


export default function App() {
  const [dbInitialized, setdbInitialized] = useState(false)

  React.useEffect(() => {
    init()
    .then(() => {
      setdbInitialized(true);
    }).catch(err => {
      console.log(err)
    });
  }, [])

  if (!dbInitialized){
    return <AppLoading />
  }
  


  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700}
        }} >
          <Stack.Screen 
            name= 'AllTexts' 
            component={AllTexts} 
            options={({navigation}) => (
              {
                title: 'All Texts' ,
                headerRight: ({tintColor}) =>  <IconButton icon="add" size={24} color={tintColor} onPress = {() => navigation.navigate('AddText')} />
              }
            )}
          />
          <Stack.Screen 
            name='AddPlace' 
            component={AddPlace} 
            options={{
              title: 'Add a new Place'
            }}
          />
         
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
