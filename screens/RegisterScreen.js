

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";


import { RadioButton } from "react-native-paper";
import { useState ,useEffect} from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
export default function RegisterScreen({navigation}) {

  const [code] = useFonts({
    code: require("../assets/fonts/GoogleSansCode-VariableFont_wght.ttf")
  });
 const [name, setName] = useState('');
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [height, setHeight] = useState('');
const [weight, setWeight] = useState('');

  
  //uygulama açlığında varsa verileri getirecek
  useEffect(()=>{
    const loadData = async()=>{
      try{
        const savedData=await AsyncStorage.getItem("userData");
        if(savedData !== null){
          const parsed = JSON.parse(savedData);
          setName(parsed.name);
          setAge(parsed.age);
          setGender (parsed.gender);
          setHeight (parsed.height);
          setWeight (parsed.weight);
        }
      }
      catch(e){
        console.log("Veriler getirilemedi",e);
        
      }
    };
    loadData();
  }
  
)
const saveData = async () => {
  if (!name || !age || !gender || !height || !weight) {
    Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurunuz.');
    return;
  }

  try {
    const userData = {
      name: name.trim(),
      age: age.trim(),
      gender:gender,
      height: height.trim(),
      weight: weight.trim(),
    };

    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    Alert.alert('Bilgilendirme', 'Kullanıcı verileri local storage\'a yüklendi');
    navigation.replace('Home');
  } catch (e) {
    Alert.alert('Hata', 'Veriler kaydedilemedi', e.message);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.box}>
       <Text style={styles.text}>Kilo Takip v1.0 Uygulamasına Hoşgeldiniz!</Text>
       <Text style={styles.textS}>Aşağıya bilgilerinizi girin bilgileriniz sadece sizin telefonuzda kaydedilecektir. Nasıl bir güvence verdiğimizi Cretivo Gizlilik Politikamız sayfasında inceleyebilirsiniz.</Text>
      </View>
      <TextInput onChangeText={value => setName(value)} style={styles.TextInput} placeholder='İsminizi giriniz' placeholderTextColor="#15ff0073"></TextInput>
      <TextInput onChangeText={value => setAge(value)} style={styles.TextInput} placeholder='Yaşınızı giriniz' placeholderTextColor="#15ff0073"></TextInput>
  <RadioButton.Group   onValueChange={value => {
    console.log("Cinsiyet seçildi:", value);
    setGender(value);
  }} value={gender}>
  <View >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RadioButton value="male" color="#15ff00" />
      <Text style={styles.textS}  >Erkek</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RadioButton value="female" color="#15ff00" />
      <Text style={styles.textS}  >Kadın</Text>
    </View>
  </View>
</RadioButton.Group>


      <TextInput onChangeText={value => setWeight(value)} style={styles.TextInput} placeholder='Kilonuzu giriniz...' placeholderTextColor="#15ff0073"></TextInput>
      <TextInput onChangeText={value => setHeight(value)} style={styles.TextInput} placeholder='Boyunuzu giriniz(cm)...' placeholderTextColor="#15ff0073"></TextInput>
      
    <TouchableOpacity  style={styles.Button} onPress= {saveData}><Text style={styles.ButtonText}>Kaydet</Text></TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  box:{
    margin:10,
    borderWidth: 2,
    borderColor: '#15ff00ff',
    backgroundColor:'#000000ff',
    padding: 10,
    borderRadius: 25,
    elevation:10,
    shadowColor: '#15ff00ff'
  },
  TextInput:{
  margin:10,
  color:'#15ff00ff',
  width:300,
  borderWidth:1,
  padding:10,
  borderRadius:20,
  borderColor:'#15ff00ff'
 },
  ButtonText:{
    color:'#15ff00ff'
  },
 Button:{
  margin:20,
  borderWidth:1,
  padding:10,
  borderRadius:20,
  borderColor:'#15ff00ff'
 },
  container: {
    
    flex: 4,
    backgroundColor: '#161616ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textS:{fontFamily: 'code',
    top:6,
    justifyContent:'center',
    textAlign:'center',
    fontSize:10,
    color:'#15ff00ff'
  },
  
  text:{
    fontFamily: 'code',
    justifyContent:'center',
    textAlign:'center',
    fontSize:16,
    color:'#15ff00ff'
  }
});
