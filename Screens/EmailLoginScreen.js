import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContext} from 'react/cjs/react.development';
import FontStyle from '../Components/FontStyle';
import {BASE_URL_Context} from '../ContextAPI/BASE_URL_Context';
import {StyleContext} from '../ContextAPI/StyleContext';
import {SIGN_IN} from '@env';
const EmailLoginScreen = () => {
  const BASE_URL = useContext(BASE_URL_Context);
  const windowWidth = useContext(StyleContext);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [wrongAlert, setWrongAlert] = useState(false);
  const [signInWrongAlert, setSignInWrongAlert] = useState(false);
  const [signInWrongMessage, setSignInWrongMessage] = useState('');
  //id input animation
  const [focus, setFocus] = useState(false);
  const [transition, setTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.timing(
      transition.value,
      focus
        ? {
            toValue: 1,
            duration: 250,
            delay: 100,
            useNativeDriver: true,
          }
        : {
            toValue: 0.3,
            duration: 250,
            delay: 100,
            useNativeDriver: true,
          },
    ).start();
  }, [focus]);
  const animationStyle = () => {
    return {
      opacity: transition.value,
    };
  };
  const getInputStyle = () => {
    return {
      backgroundColor: 'white',
      width: '100%',
      height: 40,
      borderRadius: 8,
      // borderBottomWidth: 2,
      // borderBottomColor: '#FF8A00',
      position: 'absolute',
    };
  };
  //password input animation
  const [focus2, setFocus2] = useState(false);
  const [transition2, setTransition2] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.timing(
      transition2.value,
      focus2
        ? {
            toValue: 1,
            duration: 250,
            delay: 100,
            useNativeDriver: true,
          }
        : {
            toValue: 0.3,
            duration: 250,
            delay: 100,
            useNativeDriver: true,
          },
    ).start();
  }, [focus2]);
  const animationStyle2 = () => {
    return {
      opacity: transition2.value,
    };
  };
  const getInputStyle2 = () => {
    return {
      backgroundColor: 'white',
      width: '100%',
      height: 40,
      borderRadius: 8,
      // borderBottomWidth: 2,
      // borderBottomColor: '#FF8A00',
      position: 'absolute',
    };
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        width: windowWidth - 32,
        alignSelf: 'center',
        // backgroundColor: 'gray',
      }}>
      <FontStyle
        text="로그인"
        size="xLarge"
        fontWeight="900"
        marginTop={20}
        marginBottom={20}
      />
      <View
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#D9D9D9',
          marginBottom: 20,
          position: 'relative',
        }}></View>
      <View style={{width: '100%', height: 100}}>
        <View
          style={{
            width: '100%',
            height: 40,
            position: 'relative',
            marginBottom: 8,
          }}>
          <Animated.View
            style={[getInputStyle(), animationStyle()]}></Animated.View>
          <TextInput
            style={styled.textInput}
            placeholder="example@email.com"
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            value={userData.email}
            onChangeText={e => {
              setUserData({...userData, email: e});
            }}
            keyboardType="email-address"
          />
        </View>
        <View style={{width: '100%', height: 40, position: 'relative'}}>
          <Animated.View
            style={[getInputStyle2(), animationStyle2()]}></Animated.View>
          <TextInput
            style={styled.textInput}
            placeholder="**********"
            onFocus={() => {
              setFocus2(true);
            }}
            onBlur={() => {
              setFocus2(false);
            }}
            secureTextEntry={true}
            value={userData.password}
            onChangeText={e => {
              setUserData({...userData, password: e});
            }}
          />
        </View>
      </View>
      <View style={{width: '100%', height: 40}}>
        {wrongAlert ? (
          <View>
            <FontStyle
              text="이메일은 반드시 @ 를 포함 시켜야하며,"
              size="mini"
              color="red"
            />
            <FontStyle
              text="패스워드는 최소 10자리 이상이어야 합니다."
              size="mini"
              color="red"
            />
          </View>
        ) : signInWrongAlert ? (
          <View>
            <FontStyle text={signInWrongMessage} size="mini" color="red" />
          </View>
        ) : null}
      </View>
      <TouchableOpacity
        style={styled.button}
        onPress={
          userData.email.includes('@') &&
          userData.email.includes('.') &&
          userData.password.length > 9
            ? async () => {
                console.log('click');
                setWrongAlert(false);
                const signIn = await axios
                  .post(`${BASE_URL}${SIGN_IN}`, {userData: userData})
                  .then(result => {
                    console.log(result.data);
                    result.data.state
                      ? (console.log("login navigation.navigate('app')"),
                        setSignInWrongAlert(false))
                      : result.data.num === 0
                      ? (setSignInWrongAlert(true),
                        setSignInWrongMessage('가입되어 있는 계정이 아닙니다.'))
                      : result.data.num === 1
                      ? (setSignInWrongAlert(true),
                        setSignInWrongMessage('패스워드가 일치하지 않습니다.'))
                      : null;
                  })
                  .catch(err => {});
              }
            : () => {
                setWrongAlert(true);
              }
        }>
        <FontStyle
          text="로그인"
          size="medium"
          fontWeight="bold"
          color="white"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styled = StyleSheet.create({
  textInput: {
    width: '100%',
    borderRadius: 8,
    height: 40,
    marginBottom: 8,
    position: 'absolute',
    marginLeft: 8,
    fontSize: 20,
  },
  button: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8A00',
    borderRadius: 8,
  },
});
export default EmailLoginScreen;
