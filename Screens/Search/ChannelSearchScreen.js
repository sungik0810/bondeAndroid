import React, { useContext } from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FontStyle from '../../Components/FontStyle';
import IconStyle from '../../Components/IconStyle';
import { DataContext } from '../../ContextAPI/DataContext';
import { StyleContext } from '../../ContextAPI/StyleContext';
import IconImage from '../../Datas/Icons';
const ChannelSearchScreen = ({navigation}) => {
  const windowWidth = useContext(StyleContext)
  const {channelItem} = useContext(DataContext)
  const DATA = channelItem
  // const DATA =[{title:1},{title:2},{title:3},{title:4},{title:5},{title:6},{title:7},{title:8},]
  const Item = ({title,width,icon,channelNum}) => (
    <View style={{width,height:100,borderRadius:8,marginBottom:16,alignItems:"center"}}>
        <TouchableOpacity style={{width:100,height:100,alignItems:"center",backgroundColor:"white",borderRadius:8}}
        onPress={()=>{
          navigation.navigate(`${title}`,{channelName:channelNum,type:"channelName"})
        }}
        >
        <View style={{width:48,height:48,borderRadius:8,marginBottom:0,marginTop:16}}>
        <IconStyle src={<IconImage name="channel" uri={icon}/>} size="small"/>
        </View>
        <View style={{width:80,height:35,alignItems:"center",justifyContent:"center"}}>
        <FontStyle text={title} size="mini" fontWeight="600" marginTop={0} textAlign='center'/>
        </View>
        </TouchableOpacity>
        </View>
  )
  return (
    <View style={{}}>
      <FontStyle text="유튜브로 찾기" size="xLarge" fontWeight='900' marginLeft={16} marginTop={20} marginBottom={20}/>

      <FlatList 
        data={DATA}
        renderItem={(item)=> <Item width={windowWidth/3} title={item.item[1][0]} icon={item.item[1][1]} channelNum={item.item[0]}/>}
        keyExtractor={(item,index)=>index}
        numColumns={3}
      />




    </View>
  );
};

export default ChannelSearchScreen;
