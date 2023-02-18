import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Banner from '../Components/Banner';
import FontStyle from '../Components/FontStyle';
import IconStyle from '../Components/IconStyle';
import LogoStyle from '../Components/LogoStyle';
import {StyleContext} from '../ContextAPI/StyleContext';
import IconImage from '../Datas/Icons';

const HomeScreen = ({navigation}) => {
  const windowWidth = useContext(StyleContext);
  const subTextColor = 'black';
  const subTextSize = 'mini';
  const subTextFontWeight = '400';
  return (
    <ScrollView style={{backgroundColor: '#FF8A00'}}>
      <View style={{backgroundColor: 'lightgray'}}>
        {/* search Bar */}
        <View
          style={{
            width: '100%',
            backgroundColor: '#FF8A00',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            marginBottom: 8,
          }}>
          <View style={{marginLeft: 16, marginRight: 16, marginBottom: 8}}>
            <TextInput
              placeholder="시/군/구 or 음식점"
              style={{
                backgroundColor: 'white',
                fontSize: 15,
                height: 'auto',
                paddingBottom: 8,
                paddingTop: 8,
                color: 'black',
              }}
            />
          </View>
        </View>

        {/* banner Bar */}
        <View style={{width: windowWidth - 32, marginLeft: 16}}>
          <Banner></Banner>
        </View>

        {/* FullSizeButton */}
        <View style={{width: '100%', marginBottom: 8}}>
          <TouchableOpacity
            style={{
              marginLeft: 16,
              marginRight: 16,
              backgroundColor: 'white',
              borderRadius: 8,
              width: windowWidth - 32,
              height: 156,
            }}
            onPress={async () => {
              navigation.navigate('Channel');
            }}>
            <FontStyle
              text="유튜브로 찾기"
              size="big"
              fontWeight="900"
              marginLeft={8}
              marginTop={8}
              marginBottom={8}
            />
            <FontStyle
              text="유튜브에 나온 맛집"
              color={subTextColor}
              size={subTextSize}
              fontWeight={subTextFontWeight}
              marginLeft={8}
            />
            <FontStyle
              text="여기서 볼 수 있어요"
              color={subTextColor}
              size={subTextSize}
              fontWeight={subTextFontWeight}
              marginLeft={8}
            />
          </TouchableOpacity>
        </View>

        {/* HalfSizeButton */}
        <View style={{width: '100%', marginBottom: 8}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 16,
              marginRight: 16,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                width: windowWidth / 2 - 24,
                height: 156,
              }}
              onPress={() => {
                navigation.navigate('Food');
              }}>
              <FontStyle
                text="음식으로 찾기"
                size="big"
                fontWeight="900"
                marginLeft={8}
                marginTop={8}
                marginBottom={8}
              />
              <FontStyle
                text="오늘은 뭐 먹지?"
                color={subTextColor}
                size={subTextSize}
                fontWeight={subTextFontWeight}
                marginLeft={8}
              />
              <FontStyle
                text="영상으로 확인해보세요"
                color={subTextColor}
                size={subTextSize}
                fontWeight={subTextFontWeight}
                marginLeft={8}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                width: windowWidth / 2 - 24,
                height: 156,
              }}
              onPress={() => {
                navigation.navigate('Local');
              }}>
              <FontStyle
                text="지역으로 찾기"
                size="big"
                fontWeight="900"
                marginLeft={8}
                marginTop={8}
                marginBottom={8}
              />
              <FontStyle
                text="여기 주변에 뭐 있지?"
                color={subTextColor}
                size={subTextSize}
                fontWeight={subTextFontWeight}
                marginLeft={8}
              />
              <FontStyle
                text="영상으로 확인해보세요"
                color={subTextColor}
                size={subTextSize}
                fontWeight={subTextFontWeight}
                marginLeft={8}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* new Store */}
        <View
          style={{
            backgroundColor: 'white',
            marginBottom: 8,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#D9D9D9',
          }}>
          <FontStyle
            text="새로운 가게"
            size="xLarge"
            fontWeight="900"
            marginLeft={16}
            marginTop={8}
            marginBottom={8}
          />
          <ScrollView horizontal={true}>
            <View style={{flexDirection: 'row', marginLeft: 16}}>
              <TouchableOpacity style={{marginRight: 16, marginBottom: 8}}>
                <LogoStyle src={<IconImage name="mini" />} size="big" />
                <FontStyle
                  text="가게 이름"
                  size="small"
                  fontWeight="600"
                  marginTop={4}
                  marginBottom={4}
                />
                <View style={{flexDirection: 'row'}}>
                  {/* youtube Icon */}
                  <IconStyle
                    src={<IconImage name="mini" />}
                    size={subTextSize}
                  />
                  {/* sectors Icon */}
                  <IconStyle
                    src={<IconImage name="mini" />}
                    size={subTextSize}
                  />
                  {/* location Icon */}
                  <IconStyle
                    src={<IconImage name="mini" />}
                    size={subTextSize}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* footer */}
        <View style={{width: '100%', height: 100}}></View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
