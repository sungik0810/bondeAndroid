import { Text, View,ScrollView, TouchableOpacity, Linking, Dimensions } from "react-native"
import React, {useContext, useEffect, useState} from 'react';
import IconStyle from "../Components/IconStyle";
import IconImage from "../Datas/Icons";
import FontStyle from "../Components/FontStyle";
import { StyleContext } from "../ContextAPI/StyleContext";
import { DataContext } from "../ContextAPI/DataContext";
import LoginBtn from "../Components/LoginBtn";
import SocialLoginBtn from "../Components/SocialLoginBtn";
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

    const screenHeight = Dimensions.get("screen").height
    console.log(screenHeight)
    return(
        <View style={{flex:1,position:"relative"}}>
            {/* photo */}
            <View style={{flex:0.3,justifyContent:"center"}}>
                <View style={{backgroundColor:"white",aspectRatio:16/9,marginLeft:16,marginRight:16,borderRadius:8}}>
                </View>
            </View>

            {/* login Checking

            <View style={{width:"70%",height:"100%",marginLeft:16,marginRight:16,position:"absolute",backgroundColor:"red",}}>
                <View style={{width:"100%",height:"100%",backgroundColor:"red"}}></View>
            </View> */}

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
                <View style={{backgroundColor:"white",borderBottomColor:"#D9D9D9",borderBottomWidth:1,flexDirection:"row",alignItems:"center",justifyContent:"center",marginBottom:8}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <IconStyle src={<IconImage name="mini"/>} size="mini" borderRadius={0} marginLeft={0} marginRight={0}/>
                        <FontStyle text={`${storeInfo.contact}`} fontWeight="400" size="medium" marginLeft={8} marginTop={8} marginBottom={4} numberOfLines={10}/>
                    </View>
                </View>
                {/* 유튜브 */}
                {youtubeLinks.map((youtube)=>{
                    return(<TouchableOpacity key={youtube.dataNumber}
                    onPress={()=>{Linking.openURL(youtube.link)}}
                    >
                    <View style={{width:"100%",aspectRatio:16/9,backgroundColor:"green",borderTopLeftRadius:8,borderTopRightRadius:8,overflow:"hidden"}}>
                        <IconImage name="youtubeThumbnail" uri={youtube.thumbnail}/>
                    </View>
                    <View style={{width:"100%",backgroundColor:"white",marginBottom:16,borderBottomLeftRadius:8,borderBottomRightRadius:8,}}>
                        <View style={{width:"80%"}}>
                            <FontStyle text={youtube.title} fontWeight="400" size="medium" marginLeft={8} marginTop={8} marginBottom={4} numberOfLines={2}/>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <FontStyle text={youtube.onAir} fontWeight="400" size="small" marginLeft={8} marginTop={8} marginBottom={8} numberOfLines={2}/>
                            <IconStyle src={<IconImage name="channel" uri={`channel${youtube.channelName}.jpg`}/>} size="mini" marginLeft={0} marginRight={8}/>
                        </View>
                    </View>
                </TouchableOpacity>)
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

            {/* login Checking */}

            <View style={{width:"100%",height:"70%",bottom:0,position:"absolute",backgroundColor:"rgba(255,255,255,0.95)",justifyContent:"center",alignItems:"center"}}>
                <View style={{marginLeft:32,marginRight:32,marginBottom:20}}>
                    <FontStyle text="로그인하고" size="xLarge" fontWeight="400" numberOfLines={3} textAlign="center"/>
                    <FontStyle text="가게가 출연한 영상을" size="xLarge" fontWeight="400" numberOfLines={1} textAlign="center"/>
                    <FontStyle text="확인해보세요" size="xLarge" fontWeight="400" numberOfLines={3} textAlign="center"/>
                </View>
                <SocialLoginBtn />
            </View>
        </View>
    )
}

export default StoreItemScreen