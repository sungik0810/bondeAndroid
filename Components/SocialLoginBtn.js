import { Platform, View } from "react-native"
import LoginBtn from "./LoginBtn"

const SocialLoginBtn = () => {
    return(
        <View>
            <LoginBtn text="이메일로 계속하기" backgroundColor="#FF8A00" color="#FFFFFF"/>
            <LoginBtn text="Kakao로 계속하기" backgroundColor="#FEE500" color="rgba(0,0,0,0.85)" uri="Kakao"/>
            <LoginBtn text="Google로 계속하기" backgroundColor="#FFFFFF" color="rgba(0,0,0,0.54)" uri="Google"/>
            {Platform.OS === 'ios' && 
                <LoginBtn text="Apple로 계속하기" backgroundColor="black" color="#FFFFFF" uri="Apple"/>
            }
        </View>      
        )
}

export default SocialLoginBtn