import db from "../config/dbConfig";
import Medicine from "../Model/Medicine";

const getMedicine=()=>{
    Medicine();
    db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM medicine',
          [],
          (tx, results) => {
            let medicines=[];
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              medicines.push(row);
            }
            return medicines;
          },
          (_, error) =>{
             console.log('Error fetching products: ', error);
             return [];
            }
        );
      });
}

export default getMedicine;
