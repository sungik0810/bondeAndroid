import {Platform, View} from 'react-native';
import LoginBtn from './LoginBtn';

const SocialLoginBtn = ({navigation}) => {
  return (
    <View>
      <LoginBtn
        type="email"
        text="이메일로 계속하기"
        backgroundColor="#FF8A00"
        color="#FFFFFF"
        navigation={navigation}
      />
      <LoginBtn
        type="Kakao"
        text="Kakao로 계속하기"
        backgroundColor="#FEE500"
        color="rgba(0,0,0,0.85)"
        navigation={navigation}
      />
      <LoginBtn
        type="Google"
        text="Google로 계속하기"
        backgroundColor="#FFFFFF"
        color="rgba(0,0,0,0.54)"
        navigation={navigation}
      />
      {Platform.OS === 'ios' && (
        <LoginBtn
          type="Apple"
          text="Apple로 계속하기"
          backgroundColor="black"
          color="#FFFFFF"
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default SocialLoginBtn;
