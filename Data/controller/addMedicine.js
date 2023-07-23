import db from "../config/dbConfig";
import Medicine from "../Model/Medicine";

const addMedicine=(medicine)=>{
    Medicine();
    db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO medicine (name, description, unity, price, stock, date_exp) medicine (?, ?, ?, ?, ?, ?)',
          [medicine.name, medicine.description, medicine.unity, medicine.price, medicine.stock, medicine.date_exp],
          () => {
           return true;
          },
          (_, error) =>{
            console.log('Error inserting medicine: ', error);
            return false;
          } 
        );
      });
 }

 export default addMedicine; 

