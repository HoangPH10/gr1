import React from 'react'
import TextList from '../components/Texts/TextList'
import {useIsFocused } from '@react-navigation/native' 
import { fetchTexts } from '../utls/database';


export default function AllTexts({route}) {
    const isFocused = useIsFocused();
    const [loadedTexts, setLoadedTexts] = React.useState([])
    React.useEffect(async() => {
        if (isFocused){
            const texts = await fetchTexts();
            setLoadedTexts(texts);
        }
    },[isFocused])

    return (
        <TextList texts={loadedTexts} />
    )
}
