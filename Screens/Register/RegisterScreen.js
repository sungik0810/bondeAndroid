import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useContext, useState} from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import FontStyle from '../../Components/FontStyle';
import IconStyle from '../../Components/IconStyle';
import RegisterBtn from '../../Components/Register/RegisterBtn';
import RegisterInfoForm from '../../Components/Register/RegisterInfoForm';
import RegisterSubTitle from '../../Components/Register/RegisterSubTitle';
import TermsCheckBox from '../../Components/Register/TermsCheckBox';
import {StyleContext} from '../../ContextAPI/StyleContext';
import IconImage from '../../Datas/Icons';
const RegisterScreen = () => {
  const pageEditing = 0;
  const windowWidth = useContext(StyleContext);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [page, setPage] = useState(pageEditing);
  const [focus, setFocus] = useState(false);
  const [transition, setTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  const [allCheck, setAllCheck] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const [agree4, setAgree4] = useState(false);
  const [agree5, setAgree5] = useState(false);
  const [nationPicker, setNationPicker] = useState({
    nation: '+82',
  });
  const [phoneNum, setPhoneNum] = useState({value: ''});
  const [phoneOuthNum, setPhoneOuthNum] = useState({value: ''});
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    gender: '',
    nickName: '',
  });
  const [emailAlert, setEmailAlert] = useState(null);
  const [passwordAlert, setPasswordAlert] = useState(null);
  const [passwordCheckAlert, setPasswordCheckAlert] = useState(null);
  const [nameAlert, setNameAlert] = useState(null);
  const [nickNameAlert, setNickNameAlert] = useState(null);
  const [birthAlert, setBirthAlert] = useState(null);
  const [emailDuplicationAlert, setEmailDuplicationAlert] = useState(null);
  const [nickNameDuplicationAlert, setNickNameDuplicationAlert] =
    useState(null);
  useEffect(() => {
    setPage(pageEditing);
    if (agree1 && agree2 && agree3 && agree4 && agree5) {
      setAllCheck(true);
    }
  }, [agree1, agree2, agree3, agree4, agree5]);
  useEffect(() => {}, []);

  // animation
  const [inputTransition, setInputTransition] = useState({
    value: new Animated.Value(0),
    position: new Animated.ValueXY({x: 0, y: 0}),
  });
  useEffect(() => {
    Animated.spring(transition.position, {
      toValue: {x: -windowWidth * page, y: 0},
      friction: 5,
      tension: 2,
      useNativeDriver: true,
    }).start();
  }, [page]);
  useEffect(() => {
    Animated.timing(
      inputTransition.value,
      focus
        ? {
            toValue: 1,
            duration: 250,
            delay: 100,
            useNativeDriver: true,
          }
        : {
            toValue: 0.5,
            duration: 250,
            delay: 100,
            useNativeDriver: true,
          },
    ).start();
  }, [focus]);
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
  const animationStyle = () => {
    return {
      opacity: inputTransition.value,
    };
  };
  const getStyle = () => {
    return {
      flex: 0.65,
      width: windowWidth,
      flexDirection: 'row',
      position: 'relative',
      transform: [{translateX: transition.position.x}],
    };
  };

  //중복확인
  const [emailDuplicationCheck, setEmailDuplicationCheck] = useState(true);
  const [nickNameDuplicationCheck, setNickNameDuplicationCheck] =
    useState(true);
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* Title */}
      <View
        style={{
          flex: 0.1,
          width: '110%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 30,
          marginTop: 30,
        }}>
        <FontStyle
          text="BONDE에 오신 것을 환영합니다!"
          size={windowWidth - 32 > 356 ? 'xLarge' : 'big'}
          fontWeight="600"
        />
      </View>
      {/* SubTitle */}
      <RegisterSubTitle page={page} />
      {/* Item */}
      <Animated.View style={getStyle()}>
        {/* page0 */}
        <View
          style={{width: windowWidth - 32, marginLeft: 16, marginRight: 16}}>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth - 32,
              marginBottom: 20,
              paddingBottom: 20,
              borderBottomWidth: 1,
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => {
                allCheck
                  ? (setAllCheck(false),
                    setAgree1(false),
                    setAgree2(false),
                    setAgree3(false),
                    setAgree4(false),
                    setAgree5(false))
                  : (setAllCheck(true),
                    setAgree1(true),
                    setAgree2(true),
                    setAgree3(true),
                    setAgree4(true),
                    setAgree5(true));
              }}
              style={{
                width: 24,
                height: 24,
                borderWidth: 2,
                borderRadius: 8,
                borderColor: '#FF8A00',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {allCheck ? (
                <IconStyle
                  src={<IconImage name="mini" />}
                  size="mini"
                  marginLeft={0}
                  marginRight={0}
                  marginTop={0}
                  marginBottom={0}
                  borderRadius={8}
                />
              ) : null}
            </Pressable>
            <FontStyle
              text="전체 동의"
              size="big"
              fontWeight="bold"
              marginLeft={16}
            />
          </View>

          <TermsCheckBox
            text="Bonde 이용약관 동의 (필수)"
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            setState={setAgree1}
            state={agree1}
          />
          <TermsCheckBox
            text="개인정보 수집 이용 동의 (필수)"
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            setState={setAgree2}
            state={agree2}
          />
          <TermsCheckBox
            text="개인정보 수집 이용 동의 (선택)"
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            setState={setAgree3}
            state={agree3}
          />
          <TermsCheckBox
            text="개인정보 제3자 제공 동의 (선택)"
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            setState={setAgree4}
            state={agree4}
          />
          <TermsCheckBox
            text="마케팅정보 메일,SMS 수신동의 (선택)"
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            setState={setAgree5}
            state={agree5}
          />
        </View>
        {/* page1 */}
        <View
          style={{
            width: windowWidth - 32,
            marginLeft: 16,
            marginRight: 16,
            position: 'relative',
            // flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ScrollView>
            <Picker
              style={{
                width: '40%',
                height: 40,
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'absolute',
              }}
              selectedValue={nationPicker.nation}
              onValueChange={(itemValue, itemIndex) => {
                setNationPicker({nation: itemValue});
              }}>
              <Picker.Item label="대한민국" value="+82" />
              <Picker.Item label="USA" value="+1" />
              <Picker.Item label="日本" value="+81" />
              <Picker.Item label="中国" value="+86" />
            </Picker>
            <View style={{width: '60%', position: 'absolute', right: 0}}>
              <Animated.View style={getInputStyle()}></Animated.View>
              <TextInput
                style={{width: '100%', height: 40, fontSize: 20, marginLeft: 8}}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
                placeholder="01012345678"
                keyboardType="number-pad"
                value={phoneNum.value}
                onChangeText={e => {
                  setPhoneNum({value: e});
                }}
                maxLength={11}
              />
            </View>
          </ScrollView>
        </View>
        {/* page2 */}
        <View
          style={{width: windowWidth - 32, marginLeft: 16, marginRight: 16}}>
          <ScrollView style={{width: '100%'}}>
            <Animated.View
              style={[getInputStyle(), animationStyle()]}></Animated.View>
            <TextInput
              style={{width: '100%', height: 40, fontSize: 20, marginLeft: 8}}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
              placeholder="000000"
              keyboardType="number-pad"
              value={phoneOuthNum}
              onChangeText={e => {
                setPhoneOuthNum({value: e});
              }}
              maxLength={6}
            />
          </ScrollView>
        </View>
        {/* page3 */}
        {/* {page > 1 && ( */}
        <RegisterInfoForm
          windowWidth={windowWidth}
          getInputStyle={getInputStyle}
          setRegisterInfo={setRegisterInfo}
          registerInfo={registerInfo}
          setButtonDisabled={setButtonDisabled}
          phoneNum={phoneNum}
          emailDuplicationCheck={emailDuplicationCheck}
          nickNameDuplicationCheck={nickNameDuplicationCheck}
          setEmailDuplicationCheck={setEmailDuplicationCheck}
          setNickNameDuplicationCheck={setNickNameDuplicationCheck}
          setEmailAlert={setEmailAlert}
          setPasswordAlert={setPasswordAlert}
          setPasswordCheckAlert={setPasswordCheckAlert}
          setNameAlert={setNameAlert}
          setNickNameAlert={setNickNameAlert}
          setBirthAlert={setBirthAlert}
          emailAlert={emailAlert}
          passwordAlert={passwordAlert}
          passwordCheckAlert={passwordCheckAlert}
          nameAlert={nameAlert}
          nickNameAlert={nickNameAlert}
          birthAlert={birthAlert}
          emailDuplicationAlert={emailDuplicationAlert}
          nickNameDuplicationAlert={nickNameDuplicationAlert}
          setEmailDuplicationAlert={setEmailDuplicationAlert}
          setNickNameDuplicationAlert={setNickNameDuplicationAlert}
        />
        {/* )} */}
        {/* page4 */}
        <View
          style={{width: windowWidth - 32, marginLeft: 16, marginRight: 16}}>
          <Text>4</Text>
        </View>
      </Animated.View>
      {/* Button */}
      <RegisterBtn
        setPage={setPage}
        page={page}
        setButtonDisabled={setButtonDisabled}
        buttonDisabled={buttonDisabled}
        phoneNum={phoneNum}
        phoneOuthNum={phoneOuthNum}
        allCheck={allCheck}
        agree1={agree1}
        agree2={agree2}
        agree3={agree3}
        agree4={agree4}
        agree5={agree5}
        registerInfo={registerInfo}
        emailAlert={emailAlert}
        passwordAlert={passwordAlert}
        passwordCheckAlert={passwordCheckAlert}
        nameAlert={nameAlert}
        nickNameAlert={nickNameAlert}
        birthAlert={birthAlert}
        setEmailDuplicationCheck={setEmailDuplicationCheck}
        setNickNameDuplicationCheck={setNickNameDuplicationCheck}
        nationPicker={nationPicker}
        emailDuplicationAlert={emailDuplicationAlert}
        nickNameDuplicationAlert={nickNameDuplicationAlert}
      />
    </View>
  );
};

export default RegisterScreen;
