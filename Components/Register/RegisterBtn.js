import axios from 'axios';
import {useContext, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BASE_URL_Context} from '../../ContextAPI/BASE_URL_Context';
import FontStyle from '../FontStyle';
const RegisterBtn = ({
  setPage,
  page,
  setButtonDisabled,
  buttonDisabled,
  phoneNum,
  phoneOuthNum,
  agree1,
  agree2,
  registerInfo,
  emailAlert,
  passwordAlert,
  passwordCheckAlert,
  nameAlert,
  nickNameAlert,
  genderAlert,
  setEmailDuplicationCheck,
  setNickNameDuplicationCheck,
}) => {
  const BASE_URL = useContext(BASE_URL_Context);
  console.log(registerInfo);
  useEffect(() => {
    if (page === 0 && agree1 === true && agree2 === true) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    if (page === 1 && phoneNum.value.length === 11) {
      setButtonDisabled(false);
    }

    if (page === 2 && phoneOuthNum.value.length === 6) {
      setButtonDisabled(false);
    }
    if (
      /^[0-9]+$/.test(registerInfo.birth) &&
      registerInfo.birth.length === 6 &&
      !['', null].includes(registerInfo.email) &&
      !['', null].includes(registerInfo.gender) &&
      !['', null].includes(registerInfo.name) &&
      !['', null].includes(registerInfo.nickName) &&
      registerInfo.password.length > 9 &&
      emailAlert == null &&
      passwordAlert == null &&
      passwordCheckAlert == null &&
      nameAlert == null &&
      nickNameAlert == null &&
      genderAlert == null &&
      ['1', '2', '3', '4'].includes(registerInfo.gender)
    ) {
      setButtonDisabled(false);
    }
  }, [
    page,
    agree1,
    agree2,
    phoneNum,
    phoneOuthNum,
    registerInfo,
    emailAlert,
    passwordAlert,
    passwordCheckAlert,
    nameAlert,
    nickNameAlert,
    genderAlert,
  ]);

  return (
    <View style={{flex: 0.15, width: '100%'}}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 44,
          backgroundColor: '#FF8A00',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          page === 0
            ? (setPage(1), setButtonDisabled(true))
            : page === 1
            ? axios
                .post(`${BASE_URL}/api/phone`, {phoneNum: phoneNum})
                .then(result => {
                  result.data === 'success'
                    ? (setPage(2), setButtonDisabled(true))
                    : (console.log('잘못된 번호입니다.'),
                      setButtonDisabled(true));
                })
                .catch(err => {
                  console.log(err);
                  setPage(2), setButtonDisabled(true);
                })
            : page === 2
            ? axios
                .post(`${BASE_URL}/api/phoneCheck`, {
                  phoneOuthNum: phoneOuthNum,
                })
                .then(result => {
                  result.data === 'success'
                    ? (setPage(3), setButtonDisabled(true))
                    : console.log('인증번호가 틀렸습니다.');
                })
                .catch(err => {
                  console.log(err);
                  setPage(3), setButtonDisabled(true);
                })
            : page === 3
            ? axios
                .post(`${BASE_URL}/api/register`)
                .then(result => {
                  result.data.duplicationCheck
                    ? (setEmailDuplicationCheck(true),
                      setNickNameDuplicationCheck(true))
                    : (setEmailDuplicationCheck(false),
                      setNickNameDuplicationCheck(false),
                      (setPage(4), setButtonDisabled(false)));
                })
                .catch(err => {})
            : null;
        }}
        disabled={buttonDisabled}>
        <FontStyle text="다음" size="medium" fontWeight="bold" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default RegisterBtn;
