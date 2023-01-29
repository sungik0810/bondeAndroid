import React, { useContext, useState,useEffect } from 'react';
import { Dimensions, Text, View} from 'react-native';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { DataContext } from '../ContextAPI/DataContext';
import { StyleContext } from '../ContextAPI/StyleContext';
import ListItem from '../Components/ListItem';

export const ViewTypes = {
  NONE:0,
  SHOW:1
};

export class LayoutUtil{
  static getWindowWidth(){
    return Math.round(Dimensions.get('window').width * 1000) / 1000
  }
  static getLayoutProvider(dataProvider,windowWidth){
    return new LayoutProvider((index)=>{
      let type = dataProvider.getDataForIndex(index).type;
      if(type == "SHOW"){
        return ViewTypes.SHOW;
      } else if(type == "NONE"){
        return ViewTypes.NONE;
      }
    },(type,dim)=>{
      const width = windowWidth;

      switch (type){
        case ViewTypes.SHOW:
          dim.width = width;
          dim.height = 100;
          break;
        case ViewTypes.NONE:
          dim.width = 0;
          dim.height = 0;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
          break;
      }
    });
  }
}

const StoreListScreen = ({route,navigation}) => {
  const {storeData,youtubeVideoData,searchData} = useContext(DataContext)
  const windowWidth = useContext(StyleContext)
  const [listData,setListData] = useState([])
  const navigationType = route.params.type === "local" ? route.params.countryNum : route.params.type === "sectors" ? route.params.sectors : route.params.type === "channelName" ? route.params.channelName : null
  useEffect(()=>{
    const searchFilter = searchData.filter((store)=>{
      if(route.params.type === "local"){
        return navigationType === store.country 
      } else if(route.params.type === "sectors"){
        return navigationType === store.sectors
      } else if(route.params.type === "channelName"){
        return navigationType === store.channelName
      }
    })
    const list = searchFilter.map((store)=>{
      if(store.address == null){
        store.type = "NONE"
        return store
      } else{
        store.type = "SHOW"
        return store
      }
    })
    setListData(list)
  },[])

 

    let dataProvider = new DataProvider((r1,r2)=>{
      return r1 !== r2;
    })
    dataProvider = dataProvider.cloneWithRows(listData)
    let layoutProvider = LayoutUtil.getLayoutProvider(dataProvider,windowWidth);
    const rowRenderer = (type,listData) =>{
      const {channelName,country,address,name,sectors} = listData
      switch(type){
        case ViewTypes.SHOW:
          return <ListItem navigation={navigation} address={address} name={name} channelName={channelName} country={country} sectors={sectors} style={{marginHorizontal:2}}/>
          default:
            return null
          }
        }
        
  
  useEffect(()=>{

  },[])

  return listData.length !== 0 ? (
    <View style={{flex:1}}>
      <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProvider}
      rowRenderer={rowRenderer}
      />
         
    </View>
  ):(<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    
    <Text>Comming Soon</Text>
    </View>)
};

export default StoreListScreen;
