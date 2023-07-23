import db from "../config/dbConfig";

 const deleteMedicine=(id)=>{
    db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM medicine WHERE id = ?',
          [id],
          () => {
            return true;
          },
          (_, error) =>{
             console.log('Error deleting product: ', error);
            return false;
            } 
        );
      });
 }

 export default deleteMedicine; 

