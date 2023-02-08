import {useContext, useEffect, useState} from 'react';
import {Animated, TextInput, TouchableOpacity, View} from 'react-native';
import {BASE_URL_Context} from '../../ContextAPI/BASE_URL_Context';
import FontStyle from '../FontStyle';
import RegisterDuplicationCheck from './RegisterDuplicationCheck';

const RegisterInput = ({
  type,
  registerInfo,
  registerInfoDetail,
  setRegisterInfo,
  Alert,
  setAlert,
  getInputStyle,
  setButtonDisabled,
  emailDuplicationCheck,
  nickNameDuplicationCheck,
  setEmailDuplicationCheck,
  setNickNameDuplicationCheck,
  emailDuplicationAlert,
  nickNameDuplicationAlert,
  setEmailDuplicationAlert,
  setNickNameDuplicationAlert,
}) => {
  const BASE_URL = useContext(BASE_URL_Context);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [duplicationCheck, setDuplicationCheck] = useState(false);
  const [canPress, setCanPress] = useState(false);
  const [focus, setFocus] = useState(false);
  const [transition, setTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  const label = () => {
    if (type === 'email') {
      return '이메일을 입력해주세요';
    }
    if (type === 'password') {
      return '패스워드를 입력해주세요';
    }
    if (type === 'passwordCheck') {
      return '패스워드를 확인해주세요';
    }
    if (type === 'name') {
      return '성함을 입력해주세요';
    }
    if (type === 'nickName') {
      return '닉네임을 입력해주세요';
    }
    if (type === 'birth') {
      return '생년월일 7자리를 입력해주세요';
    }
    return '';
  };
  const placeholder = () => {
    if (type === 'email') {
      return 'example@email.com';
    }
    if (type === 'password') {
      return '**********';
    }
    if (type === 'passwordCheck') {
      return '**********';
    }
    if (type === 'name') {
      return '성함을 입력해주세요';
    }
    if (type === 'nickName') {
      return '닉네임을 입력해주세요';
    }
    if (type === 'birth') {
      return 'YYMMDD';
    }
    return '';
  };
  const alertText = () => {
    if (type === 'email') {
      return '잘못된 이메일 형식입니다.';
    }
    if (type === 'password') {
      return '패스워드가 짧습니다.';
    }
    if (type === 'passwordCheck') {
      return '패스워드가 다릅니다.';
    }
    if (type === 'name') {
      return '성함을 다시 확인해주세요';
    }
    if (type === 'nickName') {
      return '공백은 사용 불가합니다.';
    }
    if (type === 'birth') {
      return '생년월일 7자리를 다시 확인해주세요';
    }
    return '';
  };
  const alertChecker = () => {
    if (type === 'email') {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        registerInfoDetail,
      );
    }
    if (type === 'password') {
      return registerInfoDetail.length > 9;
    }
    if (type === 'passwordCheck') {
      return registerInfoDetail === passwordCheck;
    }
    if (type === 'name') {
      return /^[a-zA-Z가-힣]*$/.test(registerInfoDetail);
    }
    if (type === 'nickName') {
      return registerInfoDetail !== '' && !registerInfoDetail.includes(' ');
    }
    if (type === 'birth') {
      return (
        /^\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/.test(
          registerInfoDetail,
        ) && ['1', '2', '3', '4'].includes(registerInfo.gender)
      );
    }
    return '';
  };
  const maxLength = () => {
    if (type === 'birth') {
      return 6;
    }
    return 40;
  };
  const keyboardType = () => {
    if (type === 'email') {
      return 'email-address';
    }
    if (type === 'birth') {
      return 'numeric';
    }
    return 'default';
  };
  const secureTextEntry = () => {
    if (type === 'password' || type === 'passwordCheck') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (registerInfoDetail.length > 0) {
      if (alertChecker() === true) {
        setAlert(null);
        // setDuplicationCheck(false);
      } else if (alertChecker() === false) {
        setButtonDisabled(true), setAlert(alertText());
        // setDuplicationCheck(true);
      }
    }
  }, [passwordCheck, registerInfoDetail, registerInfo.gender]);
  if (type === 'email' || type === 'nickName') {
    useEffect(() => {
      if (registerInfoDetail.length > 0) {
        if (alertChecker() === true) {
          setCanPress(true);
        } else if (alertChecker() === false) {
          setCanPress(false);
        }
      }
    }, [registerInfoDetail]);
  }
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

  const marginLeft = 8;
  const marginTop = 4;
  const marginBottom = 4;
  return (
    <View style={{width: '100%', marginBottom: 32}}>
      <FontStyle
        text={label()}
        size="medium"
        marginBottom={8}
        marginLeft={8}
        fontWeight="600"
      />
      <View
        style={{
          flexDirection: type === 'birth' ? 'row' : 'column',
          justifyContent: type === 'birth' ? 'space-between' : 'center',
        }}>
        <Animated.View
          style={[
            getInputStyle(),
            animationStyle(),
            type === 'birth' ? {width: '45%'} : null,
          ]}></Animated.View>

        {/* TextInput */}
        <TextInput
          editable={
            type === 'email' || type === 'nickName' ? !duplicationCheck : true
          }
          style={{
            width: type === 'birth' ? '45%' : '100%',
            height: 40,
            fontSize: 20,
            marginLeft: type === 'birth' ? 0 : 8,
            alignItems: 'center',
            textAlign: type === 'birth' ? 'center' : 'auto',
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          placeholder={placeholder()}
          value={type === 'passwordCheck' ? passwordCheck : registerInfoDetail}
          onChangeText={e => {
            type === 'passwordCheck' && e.length > 1
              ? setPasswordCheck(e)
              : setRegisterInfo({...registerInfo, [type]: e});
          }}
          maxLength={maxLength()}
          secureTextEntry={secureTextEntry()}
          keyboardType={keyboardType()}
          textContentType="newPassword"
        />

        {type === 'email' ? (
          <RegisterDuplicationCheck
            duplicationCheck={duplicationCheck}
            setDuplicationCheck={setDuplicationCheck}
            endpoint="emailDuplication"
            type={type}
            registerInfoDetail={registerInfoDetail}
            setRegisterInfo={setRegisterInfo}
            duplicationAlert={emailDuplicationAlert}
            setDuplicationAlert={setEmailDuplicationAlert}
            canPress={canPress}
            setCanPress={setCanPress}
            registerInfo={registerInfo}
          />
        ) : type === 'nickName' ? (
          <RegisterDuplicationCheck
            duplicationCheck={duplicationCheck}
            setDuplicationCheck={setDuplicationCheck}
            endpoint="nickNameDuplication"
            type={type}
            registerInfoDetail={registerInfoDetail}
            setRegisterInfo={setRegisterInfo}
            duplicationAlert={nickNameDuplicationAlert}
            setDuplicationAlert={setNickNameDuplicationAlert}
            canPress={canPress}
            setCanPress={setCanPress}
            registerInfo={registerInfo}
          />
        ) : null}

        {/* gender */}
        {type === 'birth' ? (
          <View style={{width: '45%', alignItems: 'center'}}>
            <Animated.View
              style={[
                getInputStyle(),
                animationStyle(),
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
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
              value={registerInfo.gender}
              onChangeText={e => {
                setRegisterInfo({...registerInfo, gender: e});
              }}
              keyboardType="numeric"
              maxLength={1}
              placeholder="G"
            />
          </View>
        ) : null}
      </View>

      {/* Alert */}
      {Alert !== null ? (
        <FontStyle
          text={Alert}
          size="mini"
          marginLeft={8}
          marginTop={4}
          marginBottom={4}
          color="red"
        />
      ) : null}
      {type === 'email' && emailDuplicationAlert === true && (
        <FontStyle
          text="중복된 이메일입니다."
          size="mini"
          marginLeft={8}
          marginTop={4}
          marginBottom={4}
          color="red"
        />
      )}
      {type === 'email' && emailDuplicationAlert === false && (
        <FontStyle
          text="사용 가능한 이메일입니다."
          size="mini"
          marginLeft={8}
          marginTop={4}
          marginBottom={4}
          color="green"
        />
      )}
      {type === 'nickName' && nickNameDuplicationAlert === true && (
        <FontStyle
          text="중복된 닉네임입니다."
          size="mini"
          marginLeft={8}
          marginTop={4}
          marginBottom={4}
          color="red"
        />
      )}
      {type === 'nickName' && nickNameDuplicationAlert === false && (
        <FontStyle
          text="사용 가능한 닉네임입니다."
          size="mini"
          marginLeft={8}
          marginTop={4}
          marginBottom={4}
          color="green"
        />
      )}
      {type === 'email' ? (
        <FontStyle
          text="아이디 및 비밀번호 찾기에 사용하실 이메일을 입력해주세요"
          size="mini"
          marginLeft={marginLeft}
          marginTop={4}
          marginBottom={4}
          fontWeight="400"
        />
      ) : null}
      {type === 'password' ? (
        <View>
          <FontStyle
            text="(필수) 최소 10자 이상 입력이 필요합니다"
            size="mini"
            fontWeight="400"
            marginLeft={marginLeft}
          />
          <FontStyle
            text="(선택) 특수문자 / 대문자 / 소문자 / 숫자 조합을 사용해주세요"
            size="mini"
            fontWeight="400"
            marginLeft={marginLeft}
            marginBottom={8}
          />
        </View>
      ) : null}
    </View>
  );
};

export default RegisterInput;
