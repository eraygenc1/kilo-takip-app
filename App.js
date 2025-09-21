import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator} from 'react-native';




export default function App() {
    const [initialRoute, setInitialRoute] = useState(null);
    const [loading, setLoading]=useState(true);
const Stack = createNativeStackNavigator();
useEffect(()=>{
  const checkUserData =async ()=>{
    try{
      const savedData =await AsyncStorage.getItem("userData");
      if (savedData){
        setInitialRoute("Home")
      }
      else{
        setInitialRoute("Register")
      }

    }
    catch(e){
      setInitialRoute("Register"); //hata olursa yine kayıt ekranı dönecek
  } finally{
    setLoading(false);
  };
}
checkUserData();
},[]);

if(loading) {
  return(
     <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large" color="#15ff00ff" />
      </View>
  )
   
}
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="Register" component={RegisterScreen} options={{title: "Kayıt Ekranı"}}>

            </Stack.Screen>
            <Stack.Screen name="Home" component={HomeScreen} options={{title: "Anasayfa"}}>
            </Stack.Screen>
          
          </Stack.Navigator>
        </NavigationContainer>
   )
 }