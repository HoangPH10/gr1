import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  {useState, useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllTexts from './screens/AllTexts';
import AddText from './screens/AddText';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/color';
import { init } from './utils/database';
import TextDetails from './screens/TextDetails';

const Stack = createNativeStackNavigator();


export default function App() {
  const [dbInitialized, setdbInitialized] = useState(false)

  useEffect(() => {
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
            name='AddText' 
            component={AddText} 
            options={{
              title: 'Add a new Text'
            }}
          />
         
          <Stack.Screen
            name='TextDetails'
            component={TextDetails}
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



