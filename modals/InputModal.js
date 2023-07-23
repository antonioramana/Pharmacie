import React from 'react';
import { View, TextInput, Button, Alert, Modal,StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { MaterialIcons } from "@expo/vector-icons";

export default function InputModal({medicine}) {
    const[showModal,setShowModal]=useState(false);
    const dispatch = useDispatch();
    const id=medicine.id;

    const initialValues = {
       quatity:0
      };
    
      const validationSchema = Yup.object().shape({
        quatity: Yup.number().required('La quantité  est requise').min(0),
      });
    
      const handleSubmit = (values) => {
       const qte=values.quatity;
         // Modifier le stock  dans la base de données SQLite
         const isPut=dispatch(putMedicine({id:id,qte:qte}));
         if(isPut){
           Alert.alert("Succès","Ajout du Médicament avec succès",[
             {
              text:"Ok",
              style:"cancel"
            },    
            ]);
         }else{
           Alert.alert("Erreur","Erreur d'ajouter ce médicament",[
             {
              text:"Ok",
              style:"cancel"
            },    
            ]);
         }
      };
 
    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
          <Modal visible={showModal}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View>
             <MaterialIcons
                 name="close"
                size={24}
                onPress={()=>{setShowModal(false)}}
                style={styles.modalClose}
            />
          <Text>Entrée du médicamenent {medicine.name}</Text>   
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
  
              <TextInput
                placeholder="Quantité..."
                onChangeText={handleChange('quantity')}
                onBlur={handleBlur('quatity')}
                value={values.quatity}
                keyboardType="numeric"
              />
              {errors.quatity && <Text style={{ color: 'red' }}>{errors.quatity}</Text>}
  
              <Button title="Faire entrée" onPress={handleSubmit} />
            </>)}
           </Formik> 
           </View>             
         </TouchableWithoutFeedback>
         </Modal>
        <Button
            onPress={()=>{setShowModal(true)}}
            style={styles.inputButton}
            title="Entrée"
        />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputButton: {
    backgroundColor: 'green',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalClose:{
    marginBottom:0,
    marginTop:20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
