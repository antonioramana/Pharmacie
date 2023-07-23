import db from "../config/dbConfig";

const updateMedicine=(id,medicine)=>{
    db.transaction((tx) => {
        tx.executeSql(
          'UPDATE medicine SET name=?, description=?, unity=?, price=?, stock=?, date_exp=? WHERE id=?',
          [medicine.name, medicine.description, medicine.unity, medicine.price, medicine.stock, medicine.date_exp,id],
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

export default updateMedicine;