import {TouchableOpacity, View} from 'react-native';
import IconImage from '../Datas/Icons';
import FontStyle from './FontStyle';
import IconStyle from './IconStyle';

const LoginBtn = ({
  type,
  text,
  backgroundColor,
  color = 'white',
  navigation,
}) => {
  function Login() {
    if (type === 'email') {
      navigation.navigate('EmailLogin');
    } else if (type === 'Kakao') {
      console.log('kakao');
    } else if (type === 'Google') {
      console.log('google');
    } else if (type === 'Apple') {
      console.log('Apple');
    }
  }
  return (
    <TouchableOpacity
      style={{
        width: 240,
        backgroundColor: backgroundColor,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        flexDirection: 'row',
      }}
      onPress={Login}>
      <View
        style={{
          width: 72,
          marginTop: 12,
          marginBottom: 12,
          alignItems: 'center',
        }}>
        <IconStyle
          src={<IconImage name="socialLogin" uri={type} />}
          size="mini"
          marginTop={0}
          marginBottom={0}
          marginLeft={0}
          marginRight={0}
        />
      </View>
      <View style={{width: 168, alignItems: 'flex-start'}}>
        <FontStyle
          text={text}
          size="medium"
          fontWeight="600"
          color={color}
          marginTop={0}
          marginBottom={0}
          marginLeft={0}
          marginRight={0}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LoginBtn;
