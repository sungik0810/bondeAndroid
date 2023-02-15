import {Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import IconImage from '../Datas/Icons';
import FontStyle from './FontStyle';
import IconStyle from './IconStyle';
import Review from './Review';

const StoreInfo = ({
  windowWidth,
  tapSelector,
  setTapSelector,
  storeInfo,
  youtubeLinks,
  setNewReviewPost,
}) => {
  return (
    <View style={{flex: 0.7}}>
      <View style={{flexDirection: 'row', marginLeft: 16, marginRight: 16}}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 8,
            backgroundColor: tapSelector === 0 ? 'orange' : 'white',
          }}
          onPress={() => {
            setTapSelector(0);
          }}>
          <Text>정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 8,
            backgroundColor: tapSelector === 1 ? 'orange' : 'white',
            transion: 100,
          }}
          onPress={() => {
            setTapSelector(1);
          }}>
          <Text>리뷰</Text>
        </TouchableOpacity>
      </View>
      {tapSelector === 0 ? (
        <ScrollView style={{marginLeft: 16, marginRight: 16}}>
          {/* 가게 이름 */}
          <View
            style={{
              backgroundColor: 'white',
              borderBottomColor: '#D9D9D9',
              borderBottomWidth: 1,
            }}>
            <FontStyle
              text={storeInfo.name}
              fontWeight="900"
              size="big"
              marginLeft={16}
              marginTop={16}
              marginBottom={16}
            />
          </View>
          {/* 주소 */}
          <View
            style={{
              backgroundColor: 'white',
              borderBottomColor: '#D9D9D9',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: windowWidth - 88}}>
              <FontStyle
                text={storeInfo.address}
                fontWeight="400"
                size="medium"
                marginLeft={16}
                marginTop={8}
                marginBottom={8}
                numberOfLines={4}
              />
            </View>
            <IconStyle
              src={<IconImage name="mini" />}
              size="mini"
              borderRadius={0}
              marginLeft={0}
              marginRight={16}
            />
          </View>
          {/* 가게 정보 */}
          <View
            style={{
              backgroundColor: 'white',
              borderBottomColor: '#D9D9D9',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: windowWidth - 88}}>
              <FontStyle
                text={`운영 시간 : ${storeInfo.openTime}`}
                fontWeight="400"
                size="medium"
                marginLeft={16}
                marginTop={8}
                marginBottom={4}
                numberOfLines={10}
              />
              <FontStyle
                text={`브레이크 타임 : ${storeInfo.breakTime}`}
                fontWeight="400"
                size="medium"
                marginLeft={16}
                marginTop={4}
                marginBottom={4}
                numberOfLines={10}
              />
              <FontStyle
                text={`라스트 오더 : ${storeInfo.lastOrderTime}`}
                fontWeight="400"
                size="medium"
                marginLeft={16}
                marginTop={4}
                marginBottom={4}
                numberOfLines={10}
              />
              <FontStyle
                text={`휴무일 : ${storeInfo.closed}`}
                fontWeight="400"
                size="medium"
                marginLeft={16}
                marginTop={4}
                marginBottom={8}
                numberOfLines={10}
              />
            </View>
          </View>
          {/* 전화 번호 */}
          <View
            style={{
              backgroundColor: 'white',
              borderBottomColor: '#D9D9D9',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconStyle
                src={<IconImage name="mini" />}
                size="mini"
                borderRadius={0}
                marginLeft={0}
                marginRight={0}
              />
              <FontStyle
                text={`${storeInfo.contact}`}
                fontWeight="400"
                size="medium"
                marginLeft={8}
                marginTop={8}
                marginBottom={4}
                numberOfLines={10}
              />
            </View>
          </View>
          {/* 유튜브 */}
          {youtubeLinks.map(youtube => {
            return (
              <TouchableOpacity
                key={youtube.dataNumber}
                onPress={() => {
                  Linking.openURL(youtube.link);
                }}>
                <View
                  style={{
                    width: '100%',
                    aspectRatio: 16 / 9,
                    backgroundColor: 'green',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    overflow: 'hidden',
                  }}>
                  <IconImage name="youtubeThumbnail" uri={youtube.thumbnail} />
                </View>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    marginBottom: 16,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}>
                  <View style={{width: '80%'}}>
                    <FontStyle
                      text={youtube.title}
                      fontWeight="400"
                      size="medium"
                      marginLeft={8}
                      marginTop={8}
                      marginBottom={4}
                      numberOfLines={2}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <FontStyle
                      text={youtube.onAir}
                      fontWeight="400"
                      size="small"
                      marginLeft={8}
                      marginTop={8}
                      marginBottom={8}
                      numberOfLines={2}
                    />
                    <IconStyle
                      src={
                        <IconImage
                          name="channel"
                          uri={`channel${youtube.channelName}.jpg`}
                        />
                      }
                      size="mini"
                      marginLeft={0}
                      marginRight={8}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        tapSelector === 1 && <Review setNewReviewPost={setNewReviewPost} />
      )}
    </View>
  );
};
export default StoreInfo;
