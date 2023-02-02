import { View } from "react-native"
import IconImage from "../Datas/Icons"
import FontStyle from "./FontStyle"
import IconStyle from "./IconStyle"

const LoginBtn = ({text,backgroundColor,color="white",uri}) =>{
    return(                
    <View style={{width:240,backgroundColor:backgroundColor,borderRadius:8,alignItems:"center",marginBottom:8,flexDirection:"row"}}>
        <View style={{width:72,marginTop:12,marginBottom:12,alignItems:"center"}}>
            <IconStyle src={<IconImage name="socialLogin" uri={uri} />} size="mini" marginTop={0} marginBottom={0} marginLeft={0} marginRight={0}/>
        </View>
        <View style={{width:168,alignItems:"flex-start"}}>
            <FontStyle text={text} size="medium" fontWeight="600" color={color} marginTop={0} marginBottom={0} marginLeft={0} marginRight={0} />
        </View>
    </View>)
}

export default LoginBtn