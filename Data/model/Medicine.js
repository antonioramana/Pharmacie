import db from "../config/dbConfig";

const Medicine=()=>{
 // Création de la table medicine
  db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS medicine (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, unity TEXT, price REAL, stock INTEGER, date_exp TEXT)',
        [],
        () => {},
        (_, error) => console.log('Error creating table: ', error)
      );
    });
};

export default Medicine;