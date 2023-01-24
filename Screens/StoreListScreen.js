import React, { useContext, useState } from 'react';
import { Dimensions, Image, Text, View} from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { DataContext } from '../ContextAPI/DataContext';
import { StyleContext } from '../ContextAPI/StyleContext';


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
      let layoutHeight = 100;

      switch (type){
        case ViewTypes.SHOW:
          dim.width = width;
          dim.height = layoutHeight;
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

export function Card(props){
  const {address,breakTime,closed,contact,lastOrderTime,name,openTime} = props
  return (
    <View style={{backgroundColor:"gray",flex:1,marginBottom:4,marginLeft:16,marginRight:16}}>
      {/* <Image  source={{uri:uri}}/> */}
      <Text >{name} {address}</Text>
    </View>
  )
}



const StoreListScreen = ({route}) => {
  const {storeData,youtubeVideoData,searchData} = useContext(DataContext)
  const windowWidth = useContext(StyleContext)
  const [listData,setListData] = useState([])
  const countryNum = route.params.countryNum
  useEffect(()=>{
    const countryFilter = storeData.filter((store)=>{
      return countryNum === store.country 
    })
    console.log(countryFilter)
    const list = countryFilter.map((store)=>{
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
      const {channelName,country,address,breakTime,closed,contact,lastOrderTime,name,openTime} = listData
      switch(type){
        case ViewTypes.SHOW:
          return <Card address={address} breakTime={breakTime} closed={closed} contact={contact} lastOrderTime={lastOrderTime} name={name} openTime={openTime} style={{marginHorizontal:2}}/>
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
  ):(<View>
    
    <Text>loading</Text>
    </View>)
};

export default StoreListScreen;
