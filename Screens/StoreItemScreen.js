import { Text, View,ScrollView, TouchableOpacity } from "react-native"
import React, {useContext, useEffect, useState} from 'react';
import IconStyle from "../Components/IconStyle";
import IconImage from "../Datas/Icons";
import FontStyle from "../Components/FontStyle";
import { StyleContext } from "../ContextAPI/StyleContext";
import { DataContext } from "../ContextAPI/DataContext";
const StoreItemScreen = ({route,navigation}) => {
    const {storeData,youtubeVideoData,searchData} = useContext(DataContext)
    // console.log(storeData)
    const windowWidth = useContext(StyleContext)
    const [tapSelector, setTapSelector] = useState(0)
    const [storeInfo,setStoreInfo] = useState({})
    const [youtubeLinks,setYoutubeLinks] = useState([])
    useEffect(()=>{
        const storeDataFilter = storeData.filter((store)=>{
            return store.name === route.name
        })
        const storeInfo = storeDataFilter.filter((store)=>{
            return store.address !== null
        })
        setYoutubeLinks(storeDataFilter)
        setStoreInfo(storeInfo[0])
    },[])
    return(
        <View style={{flex:1}}>
            {/* photo */}
            <View style={{flex:0.3,justifyContent:"center"}}>
                <View style={{backgroundColor:"white",aspectRatio:16/9,marginLeft:16,marginRight:16,borderRadius:8}}>
                </View>
            </View>

            {/* info selector */}
            <View style={{flex:0.7}}>

            <View style={{flexDirection:"row",marginLeft:16,marginRight:16}}>
                <TouchableOpacity style={{width:"50%",height:40,alignItems:"center",justifyContent:"center",borderTopLeftRadius:8,backgroundColor: tapSelector === 0 ? "orange":"white"}}
                onPress={()=>{setTapSelector(0)}}
                >
                    <Text>정보</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:"50%",height:40,alignItems:"center",justifyContent:"center",borderTopRightRadius:8,backgroundColor:tapSelector === 1 ? "orange":"white",transion:100}}
                onPress={()=>{setTapSelector(1)}}
                >
                    <Text>리뷰</Text>
                </TouchableOpacity>
            </View>
            {tapSelector === 0 ?
            <ScrollView style={{marginLeft:16,marginRight:16}}>
                {/* 가게 이름 */}
                <View style={{backgroundColor:"white",borderBottomColor:"#D9D9D9",borderBottomWidth:1}}>
                    <FontStyle text={storeInfo.name} fontWeight="900" size="big" marginLeft={16} marginTop={16} marginBottom={16}/>
                </View>
                {/* 주소 */}
                <View style={{backgroundColor:"white",borderBottomColor:"#D9D9D9",borderBottomWidth:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <View style={{width:windowWidth-88}}>
                        <FontStyle text={storeInfo.address} fontWeight="400" size="medium" marginLeft={16} marginTop={8} marginBottom={8} numberOfLines={4}/>
                    </View>
                    <IconStyle src={<IconImage name="mini"/>} size="mini" borderRadius={0} marginLeft={0} marginRight={16}/>
                </View>
                {/* 가게 정보 */}
                <View style={{backgroundColor:"white",borderBottomColor:"#D9D9D9",borderBottomWidth:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <View style={{width:windowWidth-88}}>
                        <FontStyle text={`운영 시간 : ${storeInfo.openTime}`} fontWeight="400" size="medium" marginLeft={16} marginTop={8} marginBottom={4} numberOfLines={10}/>
                        <FontStyle text={`브레이크 타임 : ${storeInfo.breakTime}`} fontWeight="400" size="medium" marginLeft={16} marginTop={4} marginBottom={4} numberOfLines={10}/>
                        <FontStyle text={`라스트 오더 : ${storeInfo.lastOrderTime}`} fontWeight="400" size="medium" marginLeft={16} marginTop={4} marginBottom={4} numberOfLines={10}/>
                        <FontStyle text={`휴무일 : ${storeInfo.closed}`} fontWeight="400" size="medium" marginLeft={16} marginTop={4} marginBottom={8} numberOfLines={10}/>
                    </View>
                </View>
                {/* 전화 번호 */}
                <View style={{backgroundColor:"white",borderBottomColor:"#D9D9D9",borderBottomWidth:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <IconStyle src={<IconImage name="mini"/>} size="mini" borderRadius={0} marginLeft={0} marginRight={0}/>
                        <FontStyle text={`${storeInfo.contact}`} fontWeight="400" size="medium" marginLeft={8} marginTop={8} marginBottom={4} numberOfLines={10}/>
                    </View>
                </View>
                {/* 유튜브 */}
                {youtubeLinks.map((youtube)=>{
                    return(<View key={youtube.dataNumber}>
                    <View style={{width:"100%",aspectRatio:16/9,backgroundColor:"green"}}></View>
                    <View style={{width:"100%",backgroundColor:"blue"}}>
                        <Text>{youtube.title}</Text>
                    </View>
                </View>)
                })}
            </ScrollView>
            : tapSelector === 1 &&
            <View>
                <View style={{marginLeft:16,marginRight:16,backgroundColor:"white"}}>
                    <TouchableOpacity style={{marginLeft:16,marginRight:16,backgroundColor:"blue",height:30,borderRadius:8,marginTop:4,marginBottom:4,alignItems:"center",justifyContent:"space-between"}}>
                    <FontStyle text={"글쓰기"} numberOfLines={10} size="small" marginLeft={8} marginTop={8} color="white" fontWeight="900" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{marginLeft:16,marginRight:16,height:"55%"}}>
                    {/* review */}
                    <View>
                        <View style={{width:"100%",backgroundColor:"white",flexDirection:"row",marginBottom:1,justifyContent:"space-between"}}>
                            <View style={{width:windowWidth-128}}>
                            <FontStyle text={"fffffdssssssdssddfsdfsfsdfsdfsdfsdfsdfsdfgsdghsdgdsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdgdshdhsdsdsfsdfsddfsdfsdgsgdsfgsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdsdsfsdffdssfsdfsdfsdfsdfsdfsdfsdff"} numberOfLines={10} size="small" marginLeft={8} marginTop={8} />
                            </View>
                            <IconStyle src={<IconImage name="mini"/>} size="medium" marginLeft={16} marginRight={16} marginTop={4} marginBottom={4} borderRadius={8}/>
                        </View>
                        <View style={{backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"#D9D9D9",marginBottom:4}}>
                        <FontStyle text={"유저 정보"} numberOfLines={1} size="small" fontWeight="400" marginLeft={8} marginTop={4} marginBottom={4}/>
                        </View>
                    </View>
    
                </ScrollView>
            </View>
            }
            </View>
        </View>
    )
}

export default StoreItemScreen