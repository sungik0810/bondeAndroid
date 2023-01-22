import React from 'react';
import {Text, TextInput, View} from 'react-native';
import LoginForm from '../Components/LoginForm';
const LoginScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Login</Text>
      <LoginForm/>
    </View>
  );
};

export default LoginScreen;
