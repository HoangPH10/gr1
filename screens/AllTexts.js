import React, {useEffect} from 'react'
import TextList from '../components/Texts/TextList'
import {useIsFocused } from '@react-navigation/native' 
import { fetchTexts } from '../utils/database';


export default function AllTexts({route}) {
    const isFocused = useIsFocused();
    const [loadedTexts, setLoadedTexts] = React.useState([])

    const getLoadedTexts =  async() => {
        const texts = await fetchTexts();
        setLoadedTexts(texts);
    }

    useEffect(() => {
        if (isFocused){
            getLoadedTexts();
        }
    },[isFocused])

  
    return (
        <TextList texts={loadedTexts} />
    )
}
