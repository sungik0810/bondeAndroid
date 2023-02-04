import { useContext } from "react"
import { Pressable, TouchableOpacity, View } from "react-native"
import { StyleContext } from "../../ContextAPI/StyleContext"
import IconImage from "../../Datas/Icons"
import FontStyle from "../FontStyle"
import IconStyle from "../IconStyle"
const TermsCheckBox = ({setAllCheck,allCheck,setState,state,text}) => {
    const windowWidth = useContext(StyleContext)
    return(
        <View style={{flexDirection:"row",marginBottom:4,alignItems:"center"}}>
        <Pressable
        onPress={()=>{allCheck ? (setAllCheck(false),setState(false)):state ? setState(false):setState(true)}}
        style={{width:24,height:24,borderWidth:2,borderRadius:8,borderColor:"#FF8A00",justifyContent:"center",alignItems:"center"}}>
          {state ? <IconStyle src={<IconImage name="mini"/>} size="mini" marginLeft={0} marginRight={0} marginTop={0} marginBottom={0}/> : null}
        </Pressable>
        <View style={{width:windowWidth-56,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <FontStyle text={text} size="mini" marginLeft={16}/>
            <TouchableOpacity>
                <FontStyle text="약관 보기" size="small"/>
            </TouchableOpacity>
        </View>
        <View>
        </View>
      </View>
    )
}

export default TermsCheckBox