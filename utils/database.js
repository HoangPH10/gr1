import * as SQLite from 'expo-sqlite'
import base64 from 'react-native-base64';
import {TextModel} from '../models/text'
const database = SQLite.openDatabase('texts.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            //tx.executeSql(`DROP TABLE if exists Texts; `,

            tx.executeSql(`create table if not exists Texts (
                id integer primary key not null,
                title text not null,
                imageUri text not null,
                base64 text not null
            )`,
            [], 
            () => {
                resolve();
            },
            (_, error) => {
                reject(error);
            }
            );
        });
    })
    return promise;
}

export const insertText =  (text) => {
    console.log('inserted',text.base64)
    const promise = new Promise((resolve,reject)  =>{ 
        database.transaction((tx) => {
            tx.executeSql(`Insert into texts (title, imageUri,base64) VALUES(?,?,?)`,
            [
                text.title, 
                text.imageUri,
                text.base64
            ],
            (_, result) => {
                console.log(result);
                resolve(result)
            },
            (_,error) => {
                reject(error)
            }
            )
        })
    } );
    return promise;
}

export const fetchTexts = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx =>{
            tx.executeSql('select * from texts',[],
            (_, result) => {
                const texts = [];
                for (const dp of result.rows._array){
                    console.log(dp)

                    texts.push(new TextModel(
                        dp.title, 
                        {uri: dp.imageUri, base64: dp.base64}, 
                        dp.id))
                }
                resolve(texts)},
            (_, error) => reject(error))
        })
    })
    return promise
}


export const fetchTextDetail = (id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`Select * from texts where id = ?`,[id],
            (_, result) => {

                const selectedText = result.rows._array[0];
                const text = new TextModel(
                    selectedText.title, 
                    {uri: selectedText.imageUri, base64: selectedText.base64}, 
                    selectedText.id)
                resolve(text)
            },
            (_, error) => {reject(error)})
        })
    })

    return promise;
}