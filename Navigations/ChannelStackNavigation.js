import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ChannelScreen from '../Screens/ChannelScreen';
const ChannelStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="ChannelStackNavigation"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#fb8c00',
        }}>
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          // * 이 설정을 추가하지 않으면 헤더가 두개가 보이는 현상이 나타난다.
          // * 하단 탭 내비게이터를 스택 내비게이터 내부에서 사용하게 될 때 이 설정을 꼭 해주어야 한다.
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChannelStackNavigation;
