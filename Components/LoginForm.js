import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { BASE_URL_Context } from '../ContextAPI/BASE_URL_Context';
const LoginForm = () => {
    const BASE_URL = useContext(BASE_URL_Context)
    // const [userId,setUserId]=useState("")
    // const [userPassword,setUserPassword]=useState("")
    const [loginForm,setLoginForm]=useState({
        userId:"",
        userPassword:""
    })
    // form 전송할때 쓸거
    // if(target == "userId"){
    //     if(value.indexOf("@") == -1){
    //         return Alert.alert("@가 없습니다.")
    //     }
    //     continue;
    // }
    function onChangeText(target,value){
        setLoginForm({...loginForm,[target]:value})
    }

    async function signIn(){
        await axios.post(`${BASE_URL}/auth/login`,{
            userId:loginForm.userId,
            userPassword:loginForm.userPassword
        }).then((result)=>{
            console.log(result.data)
        }).catch((error)=>{
            console.log(console.error())
        })
    }
    useEffect(()=>{
        console.log(loginForm)
    },[loginForm])
  return (
    <View style={{flex: 1}}>
      <TextInput
      email
      placeholder='example@email.com'
      style={styles.input}
      onChangeText={(value)=>{
          onChangeText("userId",value)
        }}
      value={loginForm.userId}/>
      <TextInput
      maxLength={20}
      secureTextEntry={true}
      placeholder='**********'
      style={styles.input}
      onChangeText={(value)=>{
        onChangeText("userPassword",value)
    }}
      value={loginForm.userPassword}/>
      <Button
      title='sign in'
      onPress={signIn}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
    input:{
        backgroundColor:"white"

    }
})

export default LoginForm;
