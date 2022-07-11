

import React from 'react'
import TextForms from '../components/Texts/TextForms'
import { insertPlace } from '../utls/database'

export default function AddPlace({navigation}) {
  const createTextHandler = async(text) => {
    await insertPlace(text);
    navigation.navigate('AllTexts')
  }
  return (
    <TextForms onCreateText={createTextHandler} />
  )
}
