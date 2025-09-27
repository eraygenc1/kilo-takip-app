// HomeScreen.js

import { View, Text, Button, Touchable, TouchableOpacity , Alert} from 'react-native'
import React, { useEffect, useState, useMemo} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'react-native';
import { globalStyles } from "../styles/global";
export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

 
  useEffect(() => {
    const fetchData = async () => {
      const jsonValue = await AsyncStorage.getItem('userData');
      console.log('>>> RAW DATA:', jsonValue);

      if (jsonValue != null) {
        const parsed = JSON.parse(jsonValue);
        console.log('>>> PARSED:', parsed);
        setUserData(parsed);
      }
    };
    fetchData();
  }, []);
const confirmClearData = () => {
  Alert.alert(
    "Emin misiniz?",
    "Kayıtlı verileriniz silinecek. Devam etmek istiyor musunuz?",
    [
      {
        text: "Vazgeç",
        style: "cancel"
      },
      {
        text: "Sil",
        onPress: clearData,
        style: "destructive"
      }
    ],
    { cancelable: true }
  );
};
  const clearData = async () => {
    
    await AsyncStorage.removeItem('userData');
    navigation.replace('Register');
  };
  const { yorum, resim,BMI } = useMemo(() => {
 if(!userData || !userData.weight){
  return {yorum:'',resim: null };
 }
 const boy = parseInt(userData.height);
 const boyMetre = boy/100;
 const kilo = parseInt(userData.weight);
 const kitleIndeksi = kilo/(boyMetre*boyMetre);
  if (kitleIndeksi < 20) {
    return {
      BMI:kitleIndeksi,
      yorum: 'Zarganasınız, ağırlık sporu ve kardiyovasküler sporlar beraberinde 2500 üzeri kalori alımı yaparak sağlıklı kilo ve kas alımıyla hayalinizdeki vücuda erişebilirsiniz.',
      resim: require('../assets/img/zargana.png'),
    };
  } else if (kitleIndeksi > 25) {
    return {
      BMI:Number(kitleIndeksi.toFixed(1)),
      yorum: 'Obezsiniz, ciddi manada spor yapmalı ve 2000 kalorinin altında sebze ve protein ağırlıklı beslenmelisiniz.',
      resim: require('../assets/img/obez.png'),
    };
  } else {
    return {
      BMI:kitleIndeksi,
      yorum: 'Tebrikler, Sağlıklısınız! 2500 Kalori bandında kalori tüketimi yaparak ve 10000 adım atarak kilonuzu koruyabilirsiniz',
      resim: require('../assets/img/fit.png'),
    };
  }
}, [userData]);

const beyHanimGetir = () =>{
  const cins = userData.gender;
  if (cins=="male"){
    return "Bey";
  }
  else{
    return "Hanım";
  }
}

  if (!userData) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    
    <View style={globalStyles.container2}>
       <View style={{ padding: 50 }}>
         <Image style={globalStyles.durumGorsel} source={resim}></Image>
      <Text style={globalStyles.text}>
        Hoşgeldiniz, {userData.name} {beyHanimGetir()},{"\n"}<Text>Kitle Indeksiniz {BMI}</Text> <Text>{yorum}</Text> 

      </Text>
     

      <TouchableOpacity style={globalStyles.Button} onPress={confirmClearData}> <Text style={globalStyles.text}>Verilerim silinsin</Text> </TouchableOpacity>
    </View>
    </View>
   
  );
}

 