import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import FontStyle from '../Components/FontStyle';
import LoginForm from '../Components/LoginForm';
import SocialLoginBtn from '../Components/SocialLoginBtn';
const LoginScreen = ({navigation}) => {
  return (
    <View style={{flex: 1,alignItems:"center"}}>
      <View style={{flex:0.4,justifyContent:"center"}}>
        <Text>Login</Text>
      </View>
      <View style={{flex:0.5,width:"100%",alignItems:"center"}}>
        <SocialLoginBtn/>
      </View>
      <TouchableOpacity style={{flex:0.1,flexDirection:"row"}}
      onPress={()=>{navigation.navigate("Register")}}
      >
        <FontStyle text="아직 회원이 아니신가요?" size="small" marginRight={16}/>
        <FontStyle text="회원가입 바로가기" size="small" color='#FF8A00' fontWeight='900'/>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
