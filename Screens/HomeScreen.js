import React from 'react';
import {Text, View} from 'react-native';
const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
      }}>
      <View style={{flex: 0.99, backgroundColor: 'white'}}>
        <Text>Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
