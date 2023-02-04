import {useEffect, useState} from 'react';
import {Animated, ScrollView, TextInput, View} from 'react-native';
import FontStyle from '../FontStyle';

const RegisterInfoForm = ({
  windowWidth,
  getInputStyle,
  animationStyle,
  setFocus,
  setRegisterInfo,
  registerInfo,
  setButtonDisabled,
  phoneNum,
  emailDuplicationCheck,
  nickNameDuplicationCheck,
  setEmailAlert,
  setPasswordAlert,
  setPasswordCheckAlert,
  setNameAlert,
  setNickNameAlert,
  setGenderAlert,
  emailAlert,
  passwordAlert,
  passwordCheckAlert,
  nameAlert,
  nickNameAlert,
  genderAlert,
}) => {
  const [passwordCheck, setPasswordCheck] = useState(null);
  // animation
  // password
  const [focusPassword, setFocusPassword] = useState(false);
  const [inputPasswordTransition, setInputPasswordTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.timing(
      inputPasswordTransition.value,
      focusPassword
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
  }, [focusPassword]);
  const animationStylePassword = () => {
    return {
      opacity: inputPasswordTransition.value,
    };
  };
  // password Check
  const [focusPasswordCheck, setFocusPasswordCheck] = useState(false);
  const [inputPasswordCheckTransition, setInputPasswordCheckTransition] =
    useState({
      value: new Animated.Value(0),
      position: new Animated.ValueXY({x: 0, y: 0}),
    });
  useEffect(() => {
    Animated.timing(
      inputPasswordCheckTransition.value,
      focusPasswordCheck
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
  }, [focusPasswordCheck]);
  const animationStylePasswordCheck = () => {
    return {
      opacity: inputPasswordCheckTransition.value,
    };
  };
  // name
  const [focusName, setFocusName] = useState(false);
  const [inputNameTransition, setInputNameTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.timing(
      inputNameTransition.value,
      focusName
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
  }, [focusName]);
  const animationStyleName = () => {
    return {
      opacity: inputNameTransition.value,
    };
  };
  // nickName
  const [focusNickName, setFocusNickName] = useState(false);
  const [inputNickNameTransition, setInputNickNameTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.timing(
      inputNickNameTransition.value,
      focusNickName
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
  }, [focusNickName]);
  const animationStyleNickName = () => {
    return {
      opacity: inputNickNameTransition.value,
    };
  };
  // birth
  const [focusBirth, setFocusBirth] = useState(false);
  const [inputBirthTransition, setInputBirthTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.timing(
      inputBirthTransition.value,
      focusBirth
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
  }, [focusBirth]);
  const animationStyleBirth = () => {
    return {
      opacity: inputBirthTransition.value,
    };
  };
  // gender
  const [focusGender, setFocusGender] = useState(false);
  const [inputGenderTransition, setInputGenderTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.timing(
      inputGenderTransition.value,
      focusGender
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
  }, [focusGender]);
  const animationStyleGender = () => {
    return {
      borderBottomColor: '#FF8A00',
      opacity: inputGenderTransition.value,
    };
  };
  return (
    // email
    <View style={{width: windowWidth - 32, marginLeft: 16, marginRight: 16}}>
      <ScrollView>
        <View style={{width: '100%', marginBottom: 32}}>
          <FontStyle
            text="이메일을 입력해주세요"
            size="medium"
            marginBottom={8}
            marginLeft={8}
            fontWeight="600"
          />
          <View>
            <Animated.View
              style={[getInputStyle(), animationStyle()]}></Animated.View>
            <TextInput
              style={{width: '100%', height: 40, fontSize: 20, marginLeft: 8}}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
                registerInfo.email.includes('@')
                  ? (setEmailAlert(null),
                    emailDuplicationCheck
                      ? setEmailAlert('중복된 email입니다')
                      : null)
                  : registerInfo.email === ''
                  ? (setButtonDisabled(true), setEmailAlert(null))
                  : (setButtonDisabled(true),
                    setEmailAlert('잘못된 email입니다'));
              }}
              placeholder="example@email.com"
              value={registerInfo.email}
              onChangeText={e => {
                setRegisterInfo({...registerInfo, email: e});
              }}
              maxLength={40}
              keyboardType="email-address"
            />
          </View>
          {emailAlert !== null ? (
            <FontStyle
              text={emailAlert}
              size="mini"
              marginLeft={8}
              marginTop={4}
              marginBottom={4}
              color="red"
            />
          ) : null}
          <FontStyle
            text="아이디 및 비밀번호 찾기에 사용하실 이메일을 입력해주세요"
            size="mini"
            marginLeft={8}
            marginTop={4}
            marginBottom={4}
            fontWeight="400"
          />
        </View>
        {/* password */}
        <View style={{width: '100%', marginBottom: 32}}>
          <FontStyle
            text="패스워드를 입력해주세요"
            size="medium"
            marginBottom={8}
            marginLeft={8}
            fontWeight="600"
          />
          <View>
            <Animated.View
              style={[
                getInputStyle(),
                animationStylePassword(),
              ]}></Animated.View>
            <TextInput
              style={{
                width: '100%',
                height: 40,
                fontSize: 20,
                marginLeft: 8,
                alignItems: 'center',
              }}
              onFocus={() => {
                setFocusPassword(true);
              }}
              onBlur={() => {
                setFocusPassword(false);
                registerInfo.password.length > 9
                  ? setPasswordAlert(null)
                  : registerInfo.password === ''
                  ? (setButtonDisabled(true), setPasswordAlert(null))
                  : (setButtonDisabled(true),
                    setPasswordAlert('비밀번호가 짧습니다'));
              }}
              placeholder="**********"
              value={registerInfo.password}
              onChangeText={e => {
                setRegisterInfo({...registerInfo, password: e});
              }}
              maxLength={30}
              secureTextEntry={true}
            />
          </View>
          {passwordAlert !== null ? (
            <FontStyle
              text={passwordAlert}
              size="mini"
              marginLeft={8}
              marginTop={4}
              marginBottom={4}
              color="red"
            />
          ) : null}
          <FontStyle
            text="(필수) 최소 10자 이상 입력이 필요합니다"
            size="mini"
            fontWeight="400"
            marginLeft={8}
          />
          <FontStyle
            text="(선택) 특수문자 / 대문자 / 소문자 / 숫자 조합을 사용해주세요"
            size="mini"
            fontWeight="400"
            marginLeft={8}
            marginBottom={8}
          />
        </View>
        {/* password Check */}
        <View style={{width: '100%', marginBottom: 32}}>
          <FontStyle
            text="패스워드를 확인해주세요"
            size="medium"
            marginBottom={8}
            marginLeft={8}
            fontWeight="600"
          />
          <View>
            <Animated.View
              style={[
                getInputStyle(),
                animationStylePasswordCheck(),
              ]}></Animated.View>
            <TextInput
              style={{width: '100%', height: 40, fontSize: 20, marginLeft: 8}}
              onFocus={() => {
                setFocusPasswordCheck(true);
              }}
              onBlur={() => {
                setFocusPasswordCheck(false);
                registerInfo.password === passwordCheck
                  ? setPasswordCheckAlert(null)
                  : (setButtonDisabled(true),
                    setPasswordCheckAlert('비밀번호가 일치하지 않습니다'));
              }}
              placeholder="**********"
              value={passwordCheck}
              onChangeText={e => {
                setPasswordCheck(e);
              }}
              maxLength={30}
              secureTextEntry={true}
            />
          </View>
          {passwordCheckAlert !== null ? (
            <FontStyle
              text={passwordCheckAlert}
              size="mini"
              marginLeft={8}
              marginTop={4}
              marginBottom={4}
              color="red"
            />
          ) : null}
        </View>
        {/* phone */}
        <View style={{width: '100%', marginBottom: 32}}>
          <FontStyle
            text="핸드폰 번호"
            size="medium"
            marginBottom={8}
            marginLeft={8}
            fontWeight="600"
          />
          <View
            style={[
              getInputStyle(),
              {
                borderBottomColor: 'lightgray',
                backgroundColor: 'lightgray',
                justifyContent: 'center',
                position: 'relative',
              },
            ]}>
            <FontStyle
              text={phoneNum.value}
              size="medium"
              marginLeft={8}
              fontWeight="600"
            />
          </View>
        </View>
        {/* name */}
        <View style={{width: '100%', marginBottom: 32}}>
          <FontStyle
            text="성함을 입력해주세요"
            size="medium"
            marginBottom={8}
            marginLeft={8}
            fontWeight="600"
          />
          <View style={{marginBottom: 4}}>
            <Animated.View
              style={[getInputStyle(), animationStyleName()]}></Animated.View>
            <TextInput
              style={{width: '100%', height: 40, fontSize: 20, marginLeft: 8}}
              onFocus={() => {
                setFocusName(true);
              }}
              onBlur={() => {
                setFocusName(false);
                registerInfo.name === ''
                  ? (setNameAlert('성함을 입력해주세요'),
                    setButtonDisabled(true))
                  : /^[a-zA-Z가-힣]*$/.test(registerInfo.name)
                  ? setNameAlert(null)
                  : (setNameAlert('성함을 다시 확인해주세요'),
                    setButtonDisabled(true));
              }}
              placeholder="성함을 입력해주세요"
              value={registerInfo.name}
              onChangeText={e => {
                setRegisterInfo({...registerInfo, name: e});
              }}
              maxLength={20}
            />
          </View>
          {nameAlert !== null ? (
            <FontStyle
              text={nameAlert}
              size="mini"
              marginLeft={8}
              marginTop={4}
              marginBottom={4}
              color="red"
            />
          ) : null}
        </View>
        {/* nickName */}
        <View style={{width: '100%', marginBottom: 32}}>
          <FontStyle
            text="닉네임을 입력해주세요"
            size="medium"
            marginBottom={8}
            marginLeft={8}
            fontWeight="600"
          />
          <View style={{marginBottom: 4}}>
            <Animated.View
              style={[
                getInputStyle(),
                animationStyleNickName(),
              ]}></Animated.View>
            <TextInput
              style={{width: '100%', height: 40, fontSize: 20, marginLeft: 8}}
              onFocus={() => {
                setFocusNickName(true);
              }}
              onBlur={() => {
                setFocusNickName(false);
                registerInfo.nickName === ''
                  ? (setNickNameAlert('닉네임을 입력해주세요'),
                    setButtonDisabled(true))
                  : nickNameDuplicationCheck
                  ? (setNickNameAlert('중복된 닉네임입니다'),
                    setButtonDisabled(true))
                  : null;
              }}
              placeholder="닉네임을 입력해주세요"
              value={registerInfo.nickName}
              onChangeText={e => {
                setRegisterInfo({...registerInfo, nickName: e});
              }}
              maxLength={12}
            />
          </View>
          {nickNameAlert !== null ? (
            <FontStyle
              text={nickNameAlert}
              size="mini"
              marginLeft={8}
              marginTop={4}
              marginBottom={4}
              color="red"
            />
          ) : null}
        </View>
        <View
          style={{
            width: '100%',
            height: 300,
          }}>
          {/* birth */}

          <FontStyle
            text="생년월일 7자리를 입력해주세요"
            size="medium"
            marginBottom={8}
            marginLeft={8}
            fontWeight="600"
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '45%', height: 60, alignItems: 'center'}}>
              <Animated.View
                style={[
                  getInputStyle(),
                  animationStyleBirth(),
                ]}></Animated.View>
              <TextInput
                style={{
                  width: '100%',
                  height: 40,
                  fontSize: 20,
                  textAlign: 'center',
                }}
                onFocus={() => {
                  setFocusBirth(true);
                }}
                onBlur={() => {
                  setFocusBirth(false);
                  registerInfo.password.length > 9
                    ? setPasswordAlert(null)
                    : registerInfo.password === ''
                    ? (setButtonDisabled(true), setPasswordAlert(null))
                    : (setButtonDisabled(true),
                      setPasswordAlert('비밀번호가 짧습니다'));
                }}
                placeholder="950101"
                value={registerInfo.birth}
                onChangeText={e => {
                  setRegisterInfo({...registerInfo, birth: e});
                }}
                maxLength={6}
              />
            </View>
            <View
              style={{
                width: '10%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '60%', borderWidth: 1}}></View>
            </View>
            {/* gender */}
            <View style={{width: '45%', height: 80, alignItems: 'center'}}>
              <Animated.View
                style={[
                  getInputStyle(),
                  animationStyleGender(),
                  {},
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <FontStyle text="******" size="xLarge" marginTop={8} />
              </Animated.View>
              <TextInput
                style={{
                  width: '100%',
                  height: 40,
                  fontSize: 20,
                  marginLeft: 60,
                }}
                onFocus={() => {
                  setFocusGender(true);
                }}
                onBlur={() => {
                  setFocusGender(false);
                  ['1', '2', '3', '4'].includes(registerInfo.gender)
                    ? setGenderAlert(null)
                    : (setButtonDisabled(true),
                      setGenderAlert('다시 한번 확인해주세요'));
                }}
                value={registerInfo.gender}
                onChangeText={e => {
                  setRegisterInfo({...registerInfo, gender: e});
                }}
                maxLength={1}
              />
              {genderAlert !== null ? (
                <FontStyle
                  text={genderAlert}
                  size="mini"
                  marginLeft={8}
                  color="red"
                />
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterInfoForm;
