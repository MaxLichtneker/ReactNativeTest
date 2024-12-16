import { useState } from 'react';
import { Image, StyleSheet, Platform,View, Text, TouchableOpacity,SafeAreaView,TextInput, Alert} from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [name, setName]= useState('');

  const handleSubmit = async () =>{
    if(!name){
      Alert.alert('Error','Please fill out all fields');
      return;
    }
    try{
     const response = await axios.post('http://192.168.178.99/restapi/api.php',{
        name:name,
     },
    {
      headers:{
        'Content-Type': 'application/json',
      }
    });

     if(response.data.message){
      Alert.alert('Success',response.data.message);
     }else{
      Alert.alert('Error',response.data.error);
     }
    }catch (error){
      console.error(error);
      Alert.alert('Error','Something went wrong');
    };
  };

  return (
    <SafeAreaView>
      <View style={styles.Container}>
        <TextInput 
        style={styles.InputFieldStyle}
        value={name}
        onChangeText={setName}
        />
        <TouchableOpacity 
        style={styles.ButtonStyle}><Text style={{color:'white'}} onPress={handleSubmit}>Post Name!</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent:'center',
    alignItems:'center',

    flexDirection:'column',
    margin:10,
  },
  InputFieldStyle:{
    width:'50%',
    margin:12,
    borderWidth:1,
  },
  ButtonStyle:{
    alignItems: 'center',
    backgroundColor: '#669bbc',
    padding: 10,
  },
});