import { View } from "react-native"
import FontStyle from "../FontStyle"

const RegisterSubTitle = ({page}) => {
    return(
        <View style={{flex:0.1,width:"100%",justifyContent:"flex-end",marginBottom:32}}>
        {page<2 && <FontStyle text="가입을 계속 진행하시려면" size="small" fontWeight='300'/>
        }
        {page===0?<FontStyle text="아래 약관에 동의가 필요합니다." size="small" fontWeight='300'/>
        :page===1?<FontStyle text="아래 휴대폰 인증이 필요합니다." size="small" fontWeight='300'/>
        :page===2?<FontStyle text="휴대폰으로 전송된 인증번호를 입력해주세요" size="small" fontWeight='300'/>
        :null  
      }
      </View>
    )
}

export default RegisterSubTitle