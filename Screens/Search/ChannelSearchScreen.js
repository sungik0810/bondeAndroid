import React, { useContext } from 'react';
import {FlatList, View} from 'react-native';
import FontStyle from '../../Components/FontStyle';
import IconStyle from '../../Components/IconStyle';
import { StyleContext } from '../../ContextAPI/StyleContext';
import IconImage from '../../Datas/Icons';
const ChannelSearchScreen = () => {
  const windowWidth = useContext(StyleContext)
  const DATA =[{title:1},{title:2},{title:3},{title:4},{title:5},{title:6},{title:7},{title:8},]
  const Item = ({title,width}) => (
    <View style={{width,height:100,borderRadius:8,marginBottom:16,alignItems:"center"}}>
        <View style={{width:100,height:100,backgroundColor:"white",borderRadius:8,marginBottom:16,justifyContent:"center",alignItems:"center"}}>
        <IconStyle src={<IconImage name="mini"/>} size="small"/>
        <View style={{width:80,alignItems:"center"}}>
        <FontStyle text="30대 자영업자 스토리" size="mini" fontWeight="600" marginTop={8} textAlign='center'/>
        </View>
        </View>
        </View>
  )
  return (
    <View style={{}}>
      <FontStyle text="유튜브로 찾기" size="xLarge" fontWeight='900' marginLeft={16} marginTop={20} marginBottom={20}/>

      <FlatList 
        data={DATA}
        renderItem={(item)=> <Item width={windowWidth/3}/>}
        keyExtractor={(item,index)=>index}
        numColumns={3}
      />




    </View>
  );
};

export default ChannelSearchScreen;
