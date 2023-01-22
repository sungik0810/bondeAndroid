import { Text } from "react-native"

const FontStyle = ({text,size,fontWeight="300",marginLeft=0,marginRight=0,marginTop=0,marginBottom=0,textAlign="auto"}) => {
    return (size === "mini" ? (<Text style={{fontSize:12,fontWeight,marginLeft,marginRight,marginTop,marginBottom,textAlign}} numberOfLines={2} ellipsizeMode="tail">{text}</Text>):
    size === "small" ? (<Text style={{fontSize:15,fontWeight,marginLeft,marginRight,marginTop,marginBottom,textAlign}} numberOfLines={2} ellipsizeMode="tail">{text}</Text>):
    size === "medium" ?(<Text style={{fontSize:17,fontWeight,marginLeft,marginRight,marginTop,marginBottom,textAlign}} numberOfLines={2} ellipsizeMode="tail">{text}</Text>):
    size === "big" ? (<Text style={{fontSize:20,fontWeight,marginLeft,marginRight,marginTop,marginBottom,textAlign}} numberOfLines={2} ellipsizeMode="tail">{text}</Text>):
    size === "xLarge" ? (<Text style={{fontSize:24,fontWeight,marginLeft,marginRight,marginTop,marginBottom,textAlign}} numberOfLines={2} ellipsizeMode="tail">{text}</Text>):
    <Text>Font size is undefined</Text>
    )
}

export default FontStyle