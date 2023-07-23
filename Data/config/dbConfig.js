import SQLite from 'react-native-sqlite-storage';

const db=SQLite.openDatabase({ name: 'Pharmacie'},()=>{
    console.log('Db Pharmacie a été créé')
},error=>{
    console.log(error)
});

export default db;