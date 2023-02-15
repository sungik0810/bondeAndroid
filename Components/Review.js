import {useContext} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {StyleContext} from '../ContextAPI/StyleContext';
import IconImage from '../Datas/Icons';
import FontStyle from './FontStyle';
import IconStyle from './IconStyle';

const Review = ({setNewReviewPost}) => {
  const windowWidth = useContext(StyleContext);
  return (
    <View>
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
                text={
                  'fffffdssssssdssddfsdfsfsdfsdfsdfsdfsdfsdfgsdghsdgdsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdgdshdhsdsdsfsdfsddfsdfsdgsgdsfgsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdsdsfsdffdssfsdfsdfsdfsdfsdfsdfsdff'
                }
                numberOfLines={10}
                size="small"
                marginLeft={8}
                marginTop={8}
              />
            </View>
            <IconStyle
              src={<IconImage name="mini" />}
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
            }}>
            <FontStyle
              text={'유저 정보'}
              numberOfLines={1}
              size="small"
              fontWeight="400"
              marginLeft={8}
              marginTop={4}
              marginBottom={4}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Review;
