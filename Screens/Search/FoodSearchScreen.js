import React, { useContext } from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FontStyle from '../../Components/FontStyle';
import IconStyle from '../../Components/IconStyle';
import { StyleContext } from '../../ContextAPI/StyleContext';
import { foodSectors } from '../../Datas/foodSectors';
import IconImage from '../../Datas/Icons';
const FoodSearchScreen = ({navigation}) => {
  const windowWidth = useContext(StyleContext)
  const DATA =Object.entries(foodSectors)
  // console.log(Object.entries(foodSectors))
  const Item = ({title,icon,width}) => (
    <TouchableOpacity style={{width,height:100,borderRadius:8,marginBottom:16,alignItems:"center"}}
    onPress={()=>{navigation.navigate(`${title}`,{sectors:title,type:"sectors"})}}
    >
        <View style={{width:100,height:100,backgroundColor:"white",borderRadius:8,marginBottom:16,justifyContent:"center",alignItems:"center"}}>
          <IconStyle src={<IconImage name="foodSectors" uri={icon}/>} size="small" borderRadius={0}/>
          <View style={{width:80,alignItems:"center"}}>
            <FontStyle text={title} size="mini" fontWeight="600" marginTop={8} textAlign='center'/>
          </View>
        </View>
    </TouchableOpacity>
  )
  return (
    <View style={{}}>
      <FontStyle text="음식으로 찾기" size="xLarge" fontWeight='900' marginLeft={16} marginTop={20} marginBottom={20}/>

      <FlatList 
        data={DATA}
        renderItem={(item)=> <Item width={windowWidth/3} title={item.item[1][0]} icon={item.item[1][1]}/>}
        keyExtractor={(item,index)=>index}
        numColumns={3}
      />




    </View>
  );
};

export default FoodSearchScreen;
