

import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#15ff00',
  background: '#161616ff',
  text: '#ffffff',
};

export const globalStyles=({
  box:{
    margin:10,
    borderWidth: 3,
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
   container2: {
    
    flex: 4,
    backgroundColor: '#161616ff',
    alignItems: 'center',
    justifyContent: 'start'
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
  },
  durumGorsel:{
    
    width:300,
    height:300,
    marginBottom:60,
    
  }
});
