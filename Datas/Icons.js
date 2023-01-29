import { Image, Text } from "react-native"

const IconImage = ({name,uri=String}) => {
    return (name === "mini" ? (<Image style={{height:"100%",width:"100%",resizeMode:"contain"}} source={require("../asset/icons/5039041.png")}/>):
    name === "foodSectors" ? (<Image style={{height:"100%",width:"100%",resizeMode:"contain"}} source={uri}/>):
    <Text>IconName is undefined</Text>
    )
}

export default IconImage