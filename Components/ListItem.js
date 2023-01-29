import { TouchableOpacity, View } from "react-native"
import IconImage from "../Datas/Icons"
import FontStyle from "./FontStyle"
import IconStyle from "./IconStyle"

const ListItem = ({navigation,address,name})=>{
    return (
      <TouchableOpacity style={{height:100,flexDirection:"row",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#D9D9D9"}}
      onPress={()=>{navigation.navigate({name:name})}}
      >
        <IconStyle src={<IconImage name="mini"/>} size="medium" borderRadius={8} marginLeft={16} marginRight={16} />
        <View style={{flexShrink:1,width:"50%"}}>
        <FontStyle text={name} size="medium" fontWeight="600" marginBottom={4} />
        <FontStyle text="rate" size="small"marginTop={0} marginBottom={4} />
        <FontStyle text={address} size="small"marginTop={0} marginBottom={0} />
        </View>
        <View style={{position:"absolute",right:0}}>
        <IconStyle src={<IconImage name="mini"/>} size="mini" marginLeft={16} marginRight={16}/>
        </View>
      </TouchableOpacity>
    )
  }

  export default ListItem