import React from 'react';
import { View, TextInput, Button, Alert, Modal,StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialIcons } from "@expo/vector-icons";


export default function EditModal({medicine}) {
 
    const[showModal,setShowModal]=useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        name: medicine.name,
        description: medicine.description,
        unity: medicine.unity,
        price: medicine.price,
        stock: medicine.stock,
        date_exp: medicine.date_exp,
      };
    
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est requis'),
        description: Yup.string().required('La description est requise'),
        unity: Yup.required('L\'unité est requise'),
        price: Yup.number().required('Le prix est requis'),
        stock: Yup.number().required('Le stock est requis'),
        date_exp: Yup.date().required('La date d\'expiration est requise'),
     //   date_exp: yup.date().required('La date d\'expiration est requise').min(new Date(), 'La date d\'expiration doit être ultérieure à la date actuelle'),
      });
    
      const handleSubmit = (values) => {
        // Modification des valeurs dans la base de données SQLite
        const isEdit=dispatch(updateMedicine({id:medicine.id ,medicine:values}));
        if(isEdit){
          Alert.alert("Succès","Médicament modifié avec succès",[
            {
             text:"Ok",
             style:"cancel"
           },    
           ]);
        }else{
          Alert.alert("Erreur","Erreur de modification de ce médicament",[
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
          <Text>Modification du médicamenent {medicine.name}</Text>   
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <TextInput
                placeholder="Nom"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
  
              <TextInput
                placeholder="Description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                multiline
                numberOfLines={4}
              />
              {errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}
  
              <TextInput
                placeholder="Unité"
                onChangeText={handleChange('unity')}
                onBlur={handleBlur('unity')}
                value={values.unity}
              />
              {errors.unity && <Text style={{ color: 'red' }}>{errors.unity}</Text>}
  
              <TextInput
                placeholder="Prix"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                keyboardType="numeric"
              />
              {errors.price && <Text style={{ color: 'red' }}>{errors.price}</Text>}
  
              <TextInput
                placeholder="Stock"
                onChangeText={handleChange('stock')}
                onBlur={handleBlur('stock')}
                value={values.stock}
                keyboardType="numeric"
              />
              {errors.stock && <Text style={{ color: 'red' }}>{errors.stock}</Text>}
  
              <TextInput
                placeholder="Date d'expiration (YYYY-MM-DD)"
                onChangeText={handleChange('date_exp')}
                onBlur={handleBlur('date_exp')}
                value={values.date_exp}
              />
              {errors.date_exp && <Text style={{ color: 'red' }}>{errors.date_exp}</Text>}
  
              <Button title="Modifier" onPress={handleSubmit} />
            </>)}
           </Formik> 
           </View>             
         </TouchableWithoutFeedback>
         </Modal>
        <Button
            onPress={()=>{setShowModal(true)}}
            style={styles.editButton}
            title="Modifié"
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
  editButton: {
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
