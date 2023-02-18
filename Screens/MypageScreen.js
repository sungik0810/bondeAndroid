import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RNRestart from 'react-native-restart';
import jwt_decode from 'jwt-decode';
import {useContext} from 'react/cjs/react.development';
import {DataContext} from '../ContextAPI/DataContext';
import IconStyle from '../Components/IconStyle';
import IconImage from '../Datas/Icons';
import FontStyle from '../Components/FontStyle';
import Banner from '../Components/Banner';
const MypageScreen = ({navigation}) => {
  const {userToken} = useContext(DataContext);
  const remove = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {}
  };
  const decodedToken = jwt_decode(userToken);
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
        // backgroundColor: 'red',
      }}>
      <ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              marginTop: 20,
              borderRadius: 8,
            }}>
            <View
              style={{
                width: '100%',
                height: 68,
                // backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#D9D9D9',
              }}>
              <FontStyle
                text={`${decodedToken.data.nickName}님`}
                size="medium"
              />
            </View>
            <View
              style={{
                width: '100%',
                height: 122,
                // backgroundColor: 'yellow',
              }}></View>
          </View>
          <View
            style={{
              // backgroundColor: 'white',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 58,
                height: 58,
                backgroundColor: 'white',
                marginBottom: 8,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconStyle
                src={<IconImage name="mini" />}
                size="mini"
                marginRight={0}
                borderRadius={0}
                marginBottom={8}
              />
              <FontStyle text="수정" size="small" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 58,
                height: 58,
                backgroundColor: 'white',
                marginBottom: 8,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconStyle
                src={<IconImage name="mini" />}
                size="mini"
                marginRight={0}
                borderRadius={0}
                marginBottom={8}
              />
              <FontStyle text="음식앨범" size="small" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 58,
                height: 58,
                backgroundColor: 'white',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconStyle
                src={<IconImage name="mini" />}
                size="mini"
                marginRight={0}
                borderRadius={0}
                marginBottom={8}
              />
              <FontStyle text="리뷰관리" size="small" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 8, width: '100%'}}>
          <Banner></Banner>
        </View>
        {/* board */}
        <View
          style={{width: '100%', backgroundColor: 'white', borderRadius: 8}}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
            }}
            onPress={() => {
              remove();

              RNRestart.Restart();
              // navigation.navigate('BONDE');
            }}>
            <FontStyle text="logout" size="medium" marginLeft={16} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MypageScreen;
