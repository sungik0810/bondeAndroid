import React, { useContext, useState } from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import FontStyle from '../../Components/FontStyle';
import IconStyle from '../../Components/IconStyle';
import { DataContext } from '../../ContextAPI/DataContext';
import { StyleContext } from '../../ContextAPI/StyleContext';
import IconImage from '../../Datas/Icons';
import { locals } from '../../Datas/locals';
const LocalSearchScreen = ({navigation}) => {
  const windowWidth = useContext(StyleContext)
  const [localSelector,setLocalSelector] = useState("")
  const [countryNumbers,setCountryNumbers] = useState([])
  const [countryCount,setCountryCount] = useState({})
  const {storeData,youtubeVideoData,searchData} = useContext(DataContext)
  useEffect(()=>{
    const countryCounter = {}
    const countryFilter = storeData.filter((store)=>{
      countryCounter[store.country] = 0
      return store.country !== null
    })
    const countryNum = countryFilter.map((store)=>{
      countryCounter[store.country] = countryCounter[store.country] + 1
      return store.country
    })
    setCountryNumbers(countryNum)
    setCountryCount(countryCounter)
  },[])
  return (
    <ScrollView style={{}}>
      <FontStyle text="지역으로 찾기" size="xLarge" fontWeight='900' marginLeft={16} marginTop={20} marginBottom={20}/>
      <View style={{marginLeft:16,marginRight:16}}>

        <View style={{width:windowWidth-32,flexDirection:"row",flexWrap:"wrap"}}>
      {Object.entries(locals).map(([key,value])=>{
        return (
        

        <View style={{width:"100%",borderBottomWidth:1,borderBottomColor:"#D9D9D9",backgroundColor:localSelector === value.stateKr ? "lightgray":null}}
        key={key}>

          <TouchableOpacity style={{flexDirection:"row",width:"100%",justifyContent:"space-between",alignItems:"flex-end",marginBottom:8}}
          onPress={()=>{
            setLocalSelector(value.stateKr)
          }}>
            <View style={{flexDirection:"row",height:"100%",alignItems:"flex-end"}}>
              <FontStyle text={value.stateKr} size="big" fontWeight='600' marginLeft={16} marginRight={4}/>
              <FontStyle text={value.stateEn} size="mini" fontWeight='400'/>
            </View>
            <IconStyle src={<IconImage name="mini"/>} size="mini"/>
          </TouchableOpacity>
          {localSelector === value.stateKr ?
          (<View style={{width:windowWidth-32,flexDirection:"row",flexWrap:"wrap",backgroundColor:"gray",display:"flex"}}>
            {localSelector === value.stateKr ? value.countryAll.map((countryName)=>{
              return countryNumbers.includes(countryName.countryNum) && (
              <TouchableOpacity style={{width:"50%",height:30,marginBottom:8,marginTop:8,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}
              key={countryName.countryNum}
              onPress={()=>{
                console.log("click")
                navigation.navigate(`country-${countryName.countryNum}`,{countryNum:countryName.countryNum})
              }}>
                <View style={{marginLeft:8}}>
              <FontStyle text={countryName.countryKr} size="medium" marginRight={4}/>
              <FontStyle text={countryName.countryEn} size="mini"/>
                </View>
                <View>

                  <FontStyle text={countryCount[countryName.countryNum]} size="mini" marginRight={8}/>
                </View>
              </TouchableOpacity>)
            }):null}
          </View>) : null
      }
        </View>
          )
      })}
      </View>
      </View>
      <View style={{height:windowWidth}}></View>
    </ScrollView>
  );
};

export default LocalSearchScreen;
