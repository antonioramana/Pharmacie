import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layouts/header';
import AddModal from '../modals/AddModal';
import EditModal from '../modals/EditModal';
import InputModal from '../modals/InputModal';
import OutputModal from '../modals/OuputModal';


export default function Home() {
  const dispatch = useDispatch();
  const medicines = useSelector(state => state.medicines);
  const [medicineList, setMedicineList] = useState(medicines);
  const [searchTerm, setSearchTerm] = useState('');
  
//fonction confirmation de supprésion
  const handleDelete = (id) => {
    Alert.alert(
      'Supprimer',
      'Voulez-vous vraiment supprimer ce MEDICAMENT ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => deleteMed(id),
        },
      ],
      { cancelable: false }
    );
  };
//fonction de supprésion
  const deleteMed = (id) => {
   const isDelete=dispatch(deleteMedicine(id));
    if(isDelete){
      Alert.alert("Succès","Médicament supprimé avec succès",[
       {
        text:"Ok",
        style:"cancel"
      },    
      ]);
    }else{
      Alert.alert("Erreur","Problème de suppréssion",[
        {
          text:"Ok",
          style:"cancel"
        },
      ]);
    }
  };
  //verifier si le médicament est expiré
  const isExpired = (date) => {
    const currentDate = new Date();
    const expirationDate = new Date(date);
    return expirationDate < currentDate;
  };
  //fonction de recherche par nom
  const handleSearch = (text) => {
    setSearchTerm(text);
    // Filtre les produits en fonction du nom de recherche
    setMedicineList(medicineList.filter((product) => product.name.toLowerCase().includes(text.toLowerCase())))
  };
    //fonction de recherche par expiration
  const handleSelect = (text) => {
    setSortOption(text)
      // Filtre les médicaments en fonction du terme périmé
        if(text==="expired"){
          setMedicineList(medicineList.filter((medicine) => isExpired(medicine.date_exp)))
        }else if((text==="notExpired")){
          setMedicineList(medicineList.filter((medicine) => !isExpired(medicine.date_exp)))
        }else{
          setMedicineList(medicines);
        }
  };

  return (
    <View style={styles.container}>
    <Header />
    <TextInput
        placeholder="Rechercher un médicament..."
        onChangeText={handleSearch}
        value={searchTerm}
        style={{ marginVertical: 10, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5, width: '80%' }}
      />
     <Picker
        selectedValue={sortOption}
        style={{ height: 50, width: '80%' }}
        onValueChange={(itemValue) => handleSelect(itemValue)}
      >
        <Picker.Item label="Tout" value="all" />
        <Picker.Item label="Non expiré" value="notExpired" />
        <Picker.Item label="Expiré" value="expired" />
    </Picker> 
  <AddModal db={db} style={{textAlign:"center"}}/>
   {medicineList.length>0?( <FlatList
      data={medicines}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text>Nom: {item.name}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Unité: {item.unity}</Text>
          <Text>Prix: {item.price}</Text>
          <Text>Stock: {item.stock}</Text>
          <Text>Date d'expiration: {item.date_exp} {isExpired(item.date_exp)?("Perimé"):("Non perimé")}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.editButton}>
              <EditModal medicine={item} db={db} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherButton}>
              <InputModal medicine={item} db={db}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherButton}>
              <OutputModal medicine={item} db={db}/>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />):(<Text  style={{ color: 'red' }}>Aucun médicament...</Text>)}
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 16,
},
itemContainer: {
  marginBottom: 10,
  padding: 10,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5,
  width: '100%',
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},
editButton: {
  backgroundColor: '#007BFF',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 5,
},
deleteButton: {
  backgroundColor: 'red',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 5,
},
otherButton: {
  backgroundColor: 'green',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 5,
  marginVertical: 10,
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});
