import { View } from "react-native"

const LogoStyle = ({src,size}) => {
    return (size === "mini" ? <View style={{width:24,height:24,borderRadius:8,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center"}}>{src}</View>:
    size === "small" ? <View style={{width:48,height:48,borderRadius:8,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center"}}>{src}</View>:
    size === "medium" ?<View style={{width:64,height:64,borderRadius:8,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center"}}>{src}</View>:
    size === "big" ? <View style={{width:128,height:128,borderRadius:8,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center"}}>{src}</View>:
    size === "xLarge" ? <View style={{width:256,height:256,borderRadius:8,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center"}}>{src}</View>:
    <View>Icon size is undefined</View>
    )
}

export default LogoStyle