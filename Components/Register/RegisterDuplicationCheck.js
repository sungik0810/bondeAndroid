import axios from 'axios';
import {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {BASE_URL_Context} from '../../ContextAPI/BASE_URL_Context';
import FontStyle from '../FontStyle';

const RegisterDuplicationCheck = ({
  duplicationCheck,
  setDuplicationCheck,
  endpoint,
  type,
  registerInfoDetail,
  setRegisterInfo,
  duplicationAlert,
  setDuplicationAlert,
  canPress,
  setCanPress,
  registerInfo,
}) => {
  const BASE_URL = useContext(BASE_URL_Context);
  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 40,
        position: 'absolute',
        backgroundColor: canPress ? '#FF8A00' : 'gray',
        right: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      }}
      onPress={
        canPress
          ? async () => {
              try {
                const response = await axios.post(
                  `${BASE_URL}/register/${endpoint}`,
                  {
                    [type]: registerInfoDetail,
                  },
                );
                // result.data  true == 중복이 있음 , false == 중복이 없음

                response.data
                  ? (setDuplicationAlert(true),
                    setCanPress(false),
                    setRegisterInfo({...registerInfo, [type]: ''}),
                    setDuplicationCheck(false))
                  : (setDuplicationAlert(false),
                    setCanPress(false),
                    setDuplicationAlert(false),
                    setDuplicationCheck(true));
              } catch (err) {
                console.log(err);
              }
            }
          : duplicationAlert === null
          ? () => {}
          : duplicationAlert
          ? () => {}
          : () => {
              setDuplicationAlert(null);
              setRegisterInfo({...registerInfo, [type]: ''});
              setCanPress(true);
              setDuplicationCheck(false);
            }
      }>
      <FontStyle
        text={
          duplicationAlert === null
            ? '중복 확인'
            : duplicationAlert
            ? '중복 확인'
            : '새로 쓰기'
        }
        size="small"
        color="white"
        fontWeight="900"
      />
    </TouchableOpacity>
  );
};

export default RegisterDuplicationCheck;
