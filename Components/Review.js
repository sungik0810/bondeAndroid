import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {BASE_URL_Context} from '../ContextAPI/BASE_URL_Context';
import {StyleContext} from '../ContextAPI/StyleContext';
import IconImage from '../Datas/Icons';
import FontStyle from './FontStyle';
import IconStyle from './IconStyle';
import ReviewItem from './ReviewItem';

const Review = ({setNewReviewPost, dataNumber}) => {
  const windowWidth = useContext(StyleContext);
  const BASE_URL = useContext(BASE_URL_Context);
  const [reviewItems, setReviewItems] = useState([]);
  const getReview = async dataNumber => {
    try {
      const getItem = await axios.get(`${BASE_URL}/api/review`, {
        params: {dataNumber: dataNumber},
      });
      setReviewItems(getItem.data.reviewItems);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getReview(dataNumber);
  }, []);
  return (
    <View style={{flex: 0.9}}>
      <View
        style={{
          marginLeft: 16,
          marginRight: 16,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => {
            setNewReviewPost(true);
          }}
          style={{
            marginLeft: 16,
            marginRight: 16,
            backgroundColor: 'gray',
            height: 30,
            borderRadius: 8,
            marginTop: 4,
            marginBottom: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontStyle
            text={'글쓰기'}
            numberOfLines={10}
            size="small"
            marginLeft={8}
            color="white"
            fontWeight="900"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginLeft: 16, marginRight: 16, height: '55%'}}>
        {/* review */}
        {reviewItems.map(reviewItemInfo => {
          return (
            <ReviewItem
              key={reviewItemInfo.reviewUuid}
              windowWidth={windowWidth}
              reviewItemInfo={reviewItemInfo}
            />
          );
        })}
        {/* <ReviewItem windowWidth={windowWidth} /> */}
      </ScrollView>
    </View>
  );
};
export default Review;
