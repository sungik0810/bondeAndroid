import {useEffect} from 'react';
import {Animated, Text, View} from 'react-native';

const ProgressBar = ({loadingPercent}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 20,
        backgroundColor: 'gray',
        borderRadius: 8,
      }}>
      <View
        style={{
          width: `${loadingPercent}%`,

          //   width: '100%',
          height: 20,
          backgroundColor: '#1E90FF',
        }}></View>
    </View>
  );
};

export default ProgressBar;
