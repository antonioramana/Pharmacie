import db from "../config/dbConfig";

const putMedicine=(id,qte)=>{
    db.transaction((tx) => {
        tx.executeSql(
          'UPDATE medicine SET stock=stock+? WHERE id=?',
          [qte,id],
          () => {
            return true;
          },
          (_, error) =>{ 
            console.log('Error updating medicine: ', error);
            return false;
        }
        );
      });
}

export default putMedicine;