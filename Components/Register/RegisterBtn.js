import axios from 'axios';
import {useContext, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BASE_URL_Context} from '../../ContextAPI/BASE_URL_Context';
import FontStyle from '../FontStyle';
import {PHONE_SEND, PHONE_VERIFY} from '@env';
import {DataContext} from '../../ContextAPI/DataContext';
const RegisterBtn = ({
  navigation,
  setPage,
  page,
  setButtonDisabled,
  buttonDisabled,
  nationPicker,
  phoneNum,
  phoneOuthNum,
  allCheck,
  agree1,
  agree2,
  agree3,
  agree4,
  agree5,
  registerInfo,
  emailAlert,
  passwordAlert,
  passwordCheckAlert,
  nameAlert,
  nickNameAlert,
  birthAlert,
  setEmailDuplicationCheck,
  setNickNameDuplicationCheck,
  emailDuplicationAlert,
  nickNameDuplicationAlert,
}) => {
  const BASE_URL = useContext(BASE_URL_Context);
  const {deviceId} = useContext(DataContext);
  console.log(deviceId);
  useEffect(() => {
    if (page === 0 && agree1 === true && agree2 === true) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    if (page === 1 && phoneNum.value.length === 11) {
      setButtonDisabled(false);
    }
  }, [page, agree1, agree2]);

  useEffect(() => {
    if (page === 1 && phoneNum.value.length === 11) {
      setButtonDisabled(false);
    }
  }, [phoneNum]);
  useEffect(() => {
    if (page === 2 && phoneOuthNum.value.length === 6) {
      setButtonDisabled(false);
    }
  }, [phoneOuthNum]);
  useEffect(() => {
    console.log(
      emailAlert,
      passwordAlert,
      passwordCheckAlert,
      nameAlert,
      nickNameAlert,
      birthAlert,
      emailDuplicationAlert,
      nickNameDuplicationAlert,
    );
    if (
      page === 3 &&
      emailAlert == null &&
      passwordAlert == null &&
      passwordCheckAlert == null &&
      nameAlert == null &&
      nickNameAlert == null &&
      birthAlert == null &&
      emailDuplicationAlert == false &&
      nickNameDuplicationAlert == false
    ) {
      setButtonDisabled(false);
    }
  }, [
    emailAlert,
    passwordAlert,
    passwordCheckAlert,
    nameAlert,
    nickNameAlert,
    birthAlert,
    emailDuplicationAlert,
    nickNameDuplicationAlert,
  ]);
  return (
    <View style={{flex: 0.15, width: '100%'}}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 44,
          backgroundColor: !buttonDisabled ? '#FF8A00' : 'gray',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          page === 0
            ? (setPage(1), setButtonDisabled(true))
            : page === 1
            ? axios
                .post(`${BASE_URL}${PHONE_SEND}`, {
                  phoneNum: phoneNum,
                  nationNum: nationPicker,
                  deviceId: deviceId,
                })
                .then(result => {
                  console.log(result.data);
                  result.data.duplication
                    ? (console.log('이미 등록된 번호입니다.'),
                      setButtonDisabled(false))
                    : result.data.limit
                    ? (console.log('일일 요청 초과입니다.'),
                      setButtonDisabled(true))
                    : (setPage(2), setButtonDisabled(true));
                })
                .catch(err => {
                  console.log(err);
                  // setPage(2),
                  setButtonDisabled(true);
                })
            : page === 2
            ? axios
                .post(`${BASE_URL}${PHONE_VERIFY}`, {
                  phoneNum: phoneNum,
                  phoneOuthNum: phoneOuthNum,
                })
                .then(result => {
                  console.log(result.data);
                  result.data.timeLimit
                    ? (console.log('시간이 만료되었습니다.'), setPage(1))
                    : result.data.state
                    ? (setPage(3), setButtonDisabled(true))
                    : console.log('인증번호가 틀렸습니다.');
                  // result.data === 'success'
                  //   ? (setPage(3), setButtonDisabled(true))
                  //   : console.log('인증번호가 틀렸습니다.');
                })
                .catch(err => {
                  console.log(err);
                  setButtonDisabled(true);
                })
            : page === 3
            ? axios
                .post(`${BASE_URL}/register/submit`, {
                  TOS: [allCheck, agree1, agree2, agree3, agree4, agree5],
                  email: registerInfo.email,
                  password: registerInfo.password,
                  phone: phoneNum.value,
                  name: registerInfo.name,
                  nickName: registerInfo.nickName,
                  birth: registerInfo.birth,
                  gender: registerInfo.gender,
                })
                .then(result => {
                  result.data === 'success'
                    ? navigation.navigate('Login')
                    : console.log('회원가입 에러 발생');
                  // result.data  true == 중복이 있음 , false == 중복이 없음
                })
                .catch(err => {
                  console.log(err);
                })
            : null;
        }}
        disabled={buttonDisabled}>
        <FontStyle text="다음" size="medium" fontWeight="bold" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default RegisterBtn;
