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
    // server에서 중복되는 번호가 있는지 확인해야됨
    if (page === 1 && phoneNum.value.length === 11) {
      setButtonDisabled(false);
    }
  }, [phoneNum]);
  useEffect(() => {
    // server에서 만든 번호랑 같아야됨
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
                .post(`${BASE_URL}/register/send`, {
                  phoneNum: phoneNum,
                  nationNum: nationPicker,
                })
                .then(result => {
                  console.log(result.data);
                  result.data === 'success'
                    ? (setPage(2), setButtonDisabled(true))
                    : (console.log('잘못된 번호입니다.'),
                      setButtonDisabled(false));
                })
                .catch(err => {
                  console.log(err);
                  // setPage(2),
                  setButtonDisabled(false);
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
