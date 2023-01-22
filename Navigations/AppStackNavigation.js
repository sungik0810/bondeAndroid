import React, { useContext } from 'react';
import { Dimensions, ScrollView, Text, TextInput, View } from 'react-native';
import { StyleContext } from '../ContextAPI/StyleContext';

const AppStackNavigation = () => {
  const windowWidth = useContext(StyleContext)
  return (
    <ScrollView style={{}}>
      {/* search Bar */}
      <View style={{width:"100%",backgroundColor:"#FF8A00",borderBottomLeftRadius:8,borderBottomRightRadius:8,marginBottom:8}}>
        <View style={{marginLeft:16,marginRight:16,marginBottom:8}}>
        <TextInput 
        placeholder='시/군/구 or 음식점'
        style={{backgroundColor:"white",fontSize:15,height:"auto",paddingBottom:8,paddingTop:8,color:"black"}}/>
        </View>
      </View>

    {/* banner Bar */}
    <View style={{width:"100%",backgroundColor:"gray",marginBottom:8}}>
      <View style={{marginLeft:16,marginRight:16,backgroundColor:"#FF8A00",borderRadius:8,aspectRatio:16/5}}>

      </View>
    </View>

    {/* FullSizeButton */}
    <View style={{width:"100%",backgroundColor:"gray",marginBottom:8}}>
      <View style={{marginLeft:16,marginRight:16,backgroundColor:"#FF8A00",borderRadius:8,aspectRatio:2/1}}></View>
    </View>

    {/* HalfSizeButton */}
    <View style={{width:"100%",backgroundColor:"gray",marginBottom:8}}>
      <View style={{flexDirection:"row",marginLeft:16,marginRight:16,justifyContent:"space-between"}}>

      <View style={{backgroundColor:"#FF8A00",borderRadius:8,aspectRatio:1/1,width:windowWidth/2-24}}></View>
      <View style={{backgroundColor:"#FF8A00",borderRadius:8,aspectRatio:1/1,width:windowWidth/2-24}}></View>
      </View>
    </View>

    {/* new Store */}
    <View style={{backgroundColor:"gray",marginBottom:8}}>
    <Text>새로운 가게</Text>
    <ScrollView horizontal={true}>
      <View style={{flexDirection:"row",marginLeft:16}}>
      <View style={{backgroundColor:"yellow",marginRight:16}}>
        <View style={{backgroundColor:"#FF8A00",aspectRatio:1,width:Math.round(windowWidth/3),marginRight:8,borderRadius:8,marginBottom:8}}>
          
        </View>
        <Text>gg</Text>
        <View style={{flexDirection:"row"}}>

        {/* youtube Icon */}
        <View style={{aspectRatio:1,width:24,borderRadius:100,backgroundColor:"red",marginRight:8}}></View>
        {/* sectors Icon */}
        <View style={{aspectRatio:1,width:24,borderRadius:100,backgroundColor:"red",marginRight:8}}></View>
        {/* location Icon */}
        <View style={{aspectRatio:1,width:24,borderRadius:100,backgroundColor:"red",marginRight:8}}></View>
        </View>
      </View>
      </View>
    </ScrollView>
    </View>

    </ScrollView>
  );
};

export default AppStackNavigation;
