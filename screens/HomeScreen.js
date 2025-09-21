// HomeScreen.js

import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  // 🔽 İŞTE BURASI
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

  const clearData = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.replace('Register');
  };
  const yorumGetir = () => {
  const kilo = parseInt(userData.weight); // weight büyük ihtimalle string geliyor

  if (kilo > 80) {
    return "OBEZSİNİZ";
  } else if (kilo < 60) {
    return "Zarganasınız";
  } else {
    return "Sağlıklısınız!!";
  }
};


  if (!userData) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Hoşgeldiniz 🎉 {userData.name} Bey,<Text>{yorumGetir()}</Text>

      </Text>
      <Button title="Çıkış Yap" onPress={clearData} />
    </View>
  );
}
