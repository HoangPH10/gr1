import * as SQLite from 'expo-sqlite'
import {TextModel} from '../models/text'
const database = SQLite.openDatabase('texts.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`create table if not exists texts(
                id integer primary key not null,
                title text not null,
                imageUri text not null,
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
    const promise = new Promise((resolve,reject)  =>{ 
        database.transaction((tx) => {
            tx.executeSql(`Insert into texts (title, imageUri) VALUES(?,?)`,
            [
                text.title, 
                text.imageUri, 
            ],
            (_, result) => {
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
                    texts.push(new TextModel(
                        dp.title, 
                        dp.imageUri, 
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
                    selectedText.imageUri, 
                    selectedText.id)
                resolve(text)
            },
            (_, error) => {reject(error)})
        })
    })

    return promise;
}