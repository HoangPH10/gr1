

import React from 'react'
import TextForms from '../components/Texts/TextForms'
import {Text, View} from 'react-native'
import { insertText } from '../utils/database'

export default function AddText({navigation}) {
  const createTextHandler = async(text) => {
    console.log('base64', text.base64)
    await insertText(text);
    navigation.navigate('AllTexts')
  }
  return (
    <TextForms onCreateText={createTextHandler} />
  )
}
