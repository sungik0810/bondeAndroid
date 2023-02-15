import {useEffect, useState} from 'react';
import {Animated, ScrollView, TextInput, View} from 'react-native';
import FontStyle from '../FontStyle';
import RegisterInput from './RegisterInput';

const RegisterInfoForm = ({
  windowWidth,
  getInputStyle,
  setRegisterInfo,
  registerInfo,
  setButtonDisabled,
  phoneNum,
  emailDuplicationCheck,
  nickNameDuplicationCheck,
  setEmailDuplicationCheck,
  setNickNameDuplicationCheck,
  setEmailAlert,
  setPasswordAlert,
  setPasswordCheckAlert,
  setNameAlert,
  setNickNameAlert,
  setBirthAlert,
  emailAlert,
  passwordAlert,
  passwordCheckAlert,
  nameAlert,
  nickNameAlert,
  birthAlert,
  emailDuplicationAlert,
  nickNameDuplicationAlert,
  setEmailDuplicationAlert,
  setNickNameDuplicationAlert,
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: windowWidth - 32,
        marginLeft: 16,
        marginRight: 16,
      }}>
      <ScrollView>
        {/* email */}
        <RegisterInput
          type="email"
          registerInfo={registerInfo}
          registerInfoDetail={registerInfo.email}
          setRegisterInfo={setRegisterInfo}
          Alert={emailAlert}
          setAlert={setEmailAlert}
          getInputStyle={getInputStyle}
          setButtonDisabled={setButtonDisabled}
          emailDuplicationCheck={emailDuplicationCheck}
          setEmailDuplicationCheck={setEmailDuplicationCheck}
          emailDuplicationAlert={emailDuplicationAlert}
          setEmailDuplicationAlert={setEmailDuplicationAlert}
        />
        {/* password */}
        <RegisterInput
          type="password"
          registerInfo={registerInfo}
          registerInfoDetail={registerInfo.password}
          setRegisterInfo={setRegisterInfo}
          Alert={passwordAlert}
          setAlert={setPasswordAlert}
          getInputStyle={getInputStyle}
          setButtonDisabled={setButtonDisabled}
        />
        {/* password Check */}
        <RegisterInput
          type="passwordCheck"
          registerInfo={registerInfo}
          registerInfoDetail={registerInfo.password}
          setRegisterInfo={setRegisterInfo}
          Alert={passwordCheckAlert}
          setAlert={setPasswordCheckAlert}
          getInputStyle={getInputStyle}
          setButtonDisabled={setButtonDisabled}
        />

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
        <RegisterInput
          type="name"
          registerInfo={registerInfo}
          registerInfoDetail={registerInfo.name}
          setRegisterInfo={setRegisterInfo}
          Alert={nameAlert}
          setAlert={setNameAlert}
          getInputStyle={getInputStyle}
          setButtonDisabled={setButtonDisabled}
        />

        {/* nickName */}
        <RegisterInput
          type="nickName"
          registerInfo={registerInfo}
          registerInfoDetail={registerInfo.nickName}
          setRegisterInfo={setRegisterInfo}
          Alert={nickNameAlert}
          setAlert={setNickNameAlert}
          getInputStyle={getInputStyle}
          setButtonDisabled={setButtonDisabled}
          nickNameDuplicationCheck={nickNameDuplicationCheck}
          setNickNameDuplicationCheck={setNickNameDuplicationCheck}
          nickNameDuplicationAlert={nickNameDuplicationAlert}
          setNickNameDuplicationAlert={setNickNameDuplicationAlert}
        />

        {/* birth */}
        <RegisterInput
          type="birth"
          registerInfo={registerInfo}
          registerInfoDetail={registerInfo.birth}
          setRegisterInfo={setRegisterInfo}
          Alert={birthAlert}
          setAlert={setBirthAlert}
          getInputStyle={getInputStyle}
          setButtonDisabled={setButtonDisabled}
        />
        <View style={{height: 200}}></View>
      </ScrollView>
    </View>
  );
};

export default RegisterInfoForm;
