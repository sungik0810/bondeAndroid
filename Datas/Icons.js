import { Image, Text } from "react-native"
import {CLOUD_FRONT_URL} from "@env"
import FastImage from "react-native-fast-image"
const IconImage = ({name,uri=String}) => {
    return (name === "mini" ? (<Image style={{height:"100%",width:"100%",resizeMode:"contain"}} source={require("../asset/icons/5039041.png")}/>):
    name === "foodSectors" ? (<Image style={{height:"100%",width:"100%",resizeMode:"contain"}} source={uri}/>): 
    name === "channel" ? (        <FastImage style={{height:"100%",width:"100%"}}
        source={{
            uri:`${CLOUD_FRONT_URL}${uri}`,
            priority:FastImage.priority.normal,
            cache:FastImage.cacheControl.immutable
        }}
        resizeMode={FastImage.resizeMode.contain}/>):
    <Text>
        {/* <Image style={{height:"100%",width:"100%",resizeMode:"contain"}} source={{uri:`${CLOUD_FRONT_URL}${uri}`}}/> */}
        {/* <FastImage style={{}}
        source={{
            uri:`${CLOUD_FRONT_URL}${uri}`,
            priority:FastImage.priority.normal,
            cache:FastImage.cacheControl.cacheOnly
        }}
        resizeMode={FastImage.resizeMode.contain}/> */}
        IconName is undefined</Text>
    )
}

export default IconImage