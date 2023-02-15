import {View} from 'react-native';

const Banner = () => {
  return (
    <View
      style={{
        width: '100%',
        marginBottom: 8,
        // marginLeft: 16,
        // marginRight: 16,
      }}>
      <View
        style={{
          // marginLeft: 16,
          // marginRight: 16,
          backgroundColor: 'white',
          borderRadius: 8,
          aspectRatio: 16 / 5,
        }}></View>
    </View>
  );
};

export default Banner;
