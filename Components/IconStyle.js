import { View } from "react-native"

const IconStyle = ({src,size,borderRadius=256,marginRight=4,marginLeft=0,marginTop=0,marginBottom=0}) => {
    return (size === "mini" ? <View style={{width:24,height:24,borderRadius:borderRadius,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center",marginRight:marginRight,marginLeft:marginLeft,marginTop:marginTop,marginBottom:marginBottom}}>{src}</View>:
    size === "small" ? <View style={{width:48,height:48,borderRadius:borderRadius,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center",marginRight:marginRight,marginLeft:marginLeft,marginTop:marginTop,marginBottom:marginBottom}}>{src}</View>:
    size === "medium" ?<View style={{width:64,height:64,borderRadius:borderRadius,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center",marginRight:marginRight,marginLeft:marginLeft,marginTop:marginTop,marginBottom:marginBottom}}>{src}</View>:
    size === "big" ? <View style={{width:128,height:128,borderRadius:borderRadius,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center",marginRight:marginRight,marginLeft:marginLeft,marginTop:marginTop,marginBottom:marginBottom}}>{src}</View>:
    size === "xLarge" ? <View style={{width:256,height:256,borderRadius:borderRadius,backgroundColor:"gray",overflow:"hidden",justifyContent:"center",alignItems:"center",marginRight:marginRight,marginLeft:marginLeft,marginTop:marginTop,marginBottom:marginBottom}}>{src}</View>:
    <View>Icon size is undefined</View>
    )
}

export default IconStyle