import { Image, Text } from "react-native"

const IconImage = ({name}) => {
    return (name === "mini" ? (<Image style={{height:"100%",width:"100%",resizeMode:"contain"}} source={require("../asset/icons/5039041.png")}/>):
    <Text>IconName is undefined</Text>
    )
}

export default IconImage