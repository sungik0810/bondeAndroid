import {View} from 'react-native';
import IconImage from '../Datas/Icons';
import FontStyle from './FontStyle';
import IconStyle from './IconStyle';

const ReviewItem = ({windowWidth, reviewItemInfo}) => {
  const text = reviewItemInfo.reviewText;
  const image = reviewItemInfo.reviewImage;
  const writer = reviewItemInfo.userNickName;
  const postDate = reviewItemInfo.postDate;
  const postTime = reviewItemInfo.postTime;
  return (
    <View>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          flexDirection: 'row',
          marginBottom: 1,
          justifyContent: 'space-between',
        }}>
        <View style={{width: windowWidth - 128}}>
          <FontStyle
            text={text}
            numberOfLines={10}
            size="small"
            marginLeft={16}
            marginTop={8}
          />
        </View>
        <IconStyle
          src={<IconImage name="reviewPhoto" uri={image} />}
          size="medium"
          marginLeft={16}
          marginRight={16}
          marginTop={4}
          marginBottom={4}
          borderRadius={8}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#D9D9D9',
          marginBottom: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <FontStyle
            text={postDate}
            numberOfLines={1}
            size="small"
            fontWeight="400"
            marginLeft={16}
            marginTop={4}
            marginBottom={4}
          />
          <FontStyle
            text={postTime}
            numberOfLines={1}
            size="small"
            fontWeight="400"
            marginLeft={16}
            marginTop={4}
            marginBottom={4}
            marginRight={16}
          />
        </View>
        <FontStyle
          text={writer}
          numberOfLines={1}
          size="small"
          fontWeight="400"
          marginLeft={0}
          marginTop={4}
          marginBottom={4}
        />
        <View style={{flexDirection: 'row'}}>
          <FontStyle
            text="삭제"
            numberOfLines={1}
            size="small"
            fontWeight="400"
            marginLeft={8}
            marginTop={4}
            marginBottom={4}
          />
          <FontStyle
            text="신고"
            numberOfLines={1}
            size="small"
            fontWeight="400"
            marginLeft={8}
            marginTop={4}
            marginBottom={4}
            marginRight={16}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
