import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import IconStyle from '../Components/IconStyle';
import IconImage from '../Datas/Icons';
import FontStyle from '../Components/FontStyle';
import {StyleContext} from '../ContextAPI/StyleContext';
import {DataContext} from '../ContextAPI/DataContext';
import LoginBtn from '../Components/LoginBtn';
import SocialLoginBtn from '../Components/SocialLoginBtn';
import Review from '../Components/Review';
import StoreInfo from '../Components/StoreInfo';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {BASE_URL_Context} from '../ContextAPI/BASE_URL_Context';
const StoreItemScreen = ({route, navigation}) => {
  const {storeData, youtubeVideoData, searchData, userToken} =
    useContext(DataContext);
  const BASE_URL = useContext(BASE_URL_Context);
  // console.log(storeData)
  const windowWidth = useContext(StyleContext);
  const [tapSelector, setTapSelector] = useState(0);
  const [storeInfo, setStoreInfo] = useState({});
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [newReviewPost, setNewReviewPost] = useState(false);
  const [reviewText, setReviewText] = useState('');
  useEffect(() => {
    const storeDataFilter = storeData.filter(store => {
      return store.name === route.name;
    });
    const storeInfo = storeDataFilter.filter(store => {
      return store.address !== null;
    });
    setYoutubeLinks(storeDataFilter);
    setStoreInfo(storeInfo[0]);
  }, []);

  const [imageUri, setImageUri] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [reviewAlert, setReviewAlert] = useState(false);
  const [isReviewAxiosLoading, setIsReviewAxiosLoading] = useState(false);
  const handleImagePicker = async () => {
    const result = await launchImageLibrary({}, result => {
      setImageInfo(result.assets[0]);
      setImageUri(result.assets[0].uri);
    });
  };
  const sendReview = async () => {
    // console.log(reviewText);
    // console.log(isReviewAxiosLoading);
    const reviewData = reviewText;

    if (reviewData.length < 10) {
      setReviewAlert(true);
      return console.log('too short');
    }
    setReviewAlert(false);
    if (isReviewAxiosLoading) {
      return console.log('wait!');
    }

    if (!isReviewAxiosLoading) {
      setIsReviewAxiosLoading(true);
      if (imageInfo == null) {
        const result = await axios.post(`${BASE_URL}/api/review`, {
          reviewData: reviewData,
          imageData: null,
        });
        console.log(result.data);
        setIsReviewAxiosLoading(false);
      } else if (imageInfo !== null) {
        const imageData = {
          uri: imageInfo.uri,
          type: imageInfo.type,
          name: imageInfo.fileName,
          size: imageInfo.fileSize,
        };
        const result = await axios.post(`${BASE_URL}/api/review`, {
          reviewData: reviewData,
          imageData: imageData,
        });
        console.log(result.data);
        setIsReviewAxiosLoading(false);
      }
    }
  };
  return (
    <View style={{flex: 1, position: 'relative'}}>
      {/* photo */}
      <View style={{flex: 0.3, justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            aspectRatio: 16 / 9,
            marginLeft: 16,
            marginRight: 16,
            borderRadius: 8,
          }}></View>
      </View>

      <StoreInfo
        windowWidth={windowWidth}
        tapSelector={tapSelector}
        setTapSelector={setTapSelector}
        storeInfo={storeInfo}
        setStoreInfo={setStoreInfo}
        youtubeLinks={youtubeLinks}
        setNewReviewPost={setNewReviewPost}
      />
      {newReviewPost ? (
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setNewReviewPost(false);
          }}>
          <Pressable
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              width: '80%',
              height: '80%',
              backgroundColor: 'white',
              borderRadius: 8,
              justifyContent: 'space-around',
            }}
            onPress={() => {
              console.log('no');
            }}>
            <View
              style={{
                width: '95%',
                height: '50%',
                // marginTop: 30,
                backgroundColor: 'white',
              }}>
              <TextInput
                style={{width: '100%', height: '100%', borderWidth: 1}}
                placeholder="리뷰를 작성해주세요"
                value={reviewText}
                onChangeText={e => {
                  setReviewText(e);
                }}
                multiline={true}
              />
            </View>
            {/* photo */}
            <View
              style={{
                width: '95%',
                height: '30%',
                // backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  // width: '50%',
                  height: '60%',
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  borderWidth: 1,
                }}>
                {/* image preview */}
                {imageUri == null ? null : (
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                    source={{uri: imageUri}}
                  />
                )}
              </View>
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: '30%',

                  justifyContent: 'center',
                }}
                onPress={() => {
                  handleImagePicker();
                }}>
                {/* image select */}

                <View
                  style={{
                    width: '100%',
                    height: '50%',
                    backgroundColor: 'lightgray',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    borderRadius: 8,
                  }}>
                  <FontStyle
                    text="사진 첨부하기"
                    size="small"
                    color="white"
                    fontWeight="900"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: '95%',
                height: 40,
                backgroundColor: reviewAlert ? 'red' : '#FF8A00',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={sendReview}>
              <FontStyle
                text={reviewAlert ? '리뷰가 너무 짧습니다' : '리뷰 남기기'}
                color="white"
                size="medium"
                fontWeight="900"
              />
            </TouchableOpacity>
          </Pressable>
        </TouchableOpacity>
      ) : null}
      {/* login Checking */}
      {userToken === null ? (
        <View
          style={{
            width: '100%',
            height: '70%',
            bottom: 0,
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.95)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginLeft: 32, marginRight: 32, marginBottom: 20}}>
            <FontStyle
              text="로그인하고"
              size="xLarge"
              fontWeight="400"
              numberOfLines={3}
              textAlign="center"
            />
            <FontStyle
              text="가게가 출연한 영상을"
              size="xLarge"
              fontWeight="400"
              numberOfLines={1}
              textAlign="center"
            />
            <FontStyle
              text="확인해보세요"
              size="xLarge"
              fontWeight="400"
              numberOfLines={3}
              textAlign="center"
            />
          </View>
          <SocialLoginBtn navigation={navigation} />
        </View>
      ) : null}
    </View>
  );
};

export default StoreItemScreen;
