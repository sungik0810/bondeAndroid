import React, { useEffect } from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import { useContext, useState } from 'react/cjs/react.development';
import FontStyle from '../../Components/FontStyle';
import IconStyle from '../../Components/IconStyle';
import TermsCheckBox from '../../Components/Register/TermsCheckBox';
import { StyleContext } from '../../ContextAPI/StyleContext';
import IconImage from '../../Datas/Icons';
const RegisterScreen = () => {
  const windowWidth = useContext(StyleContext)
  const [allCheck,setAllCheck] = useState(false)
  const [agree1,setAgree1] = useState(false)
  const [agree2,setAgree2] = useState(false)
  const [agree3,setAgree3] = useState(false)
  const [agree4,setAgree4] = useState(false)
  const [agree5,setAgree5] = useState(false)
  useEffect(()=>{
    if(agree1&&agree2&&agree3&&agree4&&agree5){
      setAllCheck(true)
    }
  },[agree1,agree2,agree3,agree4,agree5])
  return (
    <View style={{flex: 1,marginLeft:16,marginRight:16, alignItems: 'center', justifyContent: 'center'}}>
      {/* Title */}
      <View style={{flex:0.1,width:"110%",justifyContent:"flex-end",alignItems:"center",marginBottom:30,marginTop:30}}>
        <FontStyle text="BONDE에 오신 것을 환영합니다!" size={windowWidth-32 > 356 ? "xLarge":"big"} fontWeight='600'/>
      </View>
      {/* SubTitle */}
      <View style={{flex:0.1,width:"100%",justifyContent:"flex-end",marginBottom:16}}>
        <FontStyle text="가입을 계속 진행하시려면" size="small" fontWeight='300'/>
        <FontStyle text="아래 약관에 동의가 필요합니다." size="small" fontWeight='300'/>
      </View>
      {/* Item */}
      <View style={{flex:0.65,width:"100%"}}>
        {/* 약관 동의 */}
        <View style={{flexDirection:"row",marginBottom:20,paddingBottom:20,borderBottomWidth:1,alignItems:"center"}}>
          <Pressable
          onPress={()=>{allCheck ? (setAllCheck(false),setAgree1(false),setAgree2(false),setAgree3(false),setAgree4(false),setAgree5(false)):(setAllCheck(true),setAgree1(true),setAgree2(true),setAgree3(true),setAgree4(true),setAgree5(true))}}
          style={{width:24,height:24,borderWidth:2,borderRadius:8,borderColor:"#FF8A00",justifyContent:"center",alignItems:"center"}}>
            {allCheck ? <IconStyle src={<IconImage name="mini"/>} size="mini" marginLeft={0} marginRight={0} marginTop={0} marginBottom={0} borderRadius={8}/> : null}
          </Pressable>
          <FontStyle text="전체 동의" size="big" fontWeight='bold'marginLeft={16}/>
        </View>

        <TermsCheckBox text="1" setAllCheck={setAllCheck} allCheck={allCheck} setState={setAgree1} state={agree1}/>
        <TermsCheckBox text="2" setAllCheck={setAllCheck} allCheck={allCheck} setState={setAgree2} state={agree2}/>
        <TermsCheckBox text="3" setAllCheck={setAllCheck} allCheck={allCheck} setState={setAgree3} state={agree3}/>
        <TermsCheckBox text="4" setAllCheck={setAllCheck} allCheck={allCheck} setState={setAgree4} state={agree4}/>
        <TermsCheckBox text="5" setAllCheck={setAllCheck} allCheck={allCheck} setState={setAgree5} state={agree5}/>
      </View>
      {/* Button */}
      <View style={{flex:0.15,width:"100%"}}>
        <TouchableOpacity style={{width:"100%",height:44,backgroundColor:"#FF8A00",borderRadius:8,justifyContent:"center",alignItems:'center'}}>
          <FontStyle text="다음" size="medium" fontWeight='bold' color='white'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
