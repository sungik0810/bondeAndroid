import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackNavigation from './HomeStackNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChannelStackNavigation from './ChannelStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';
import MypageStackNavigation from './MypageStackNavigation';
const Tab = createBottomTabNavigator();
const AppStackNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Route"
      screenOptions={{
        tabBarActiveTintColor: '#fb8c00',
        // tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{
          title: 'HOME',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChannelStackNavigation"
        component={ChannelStackNavigation}
        options={{
          title: '채널',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchStackNavigation"
        component={SearchStackNavigation}
        options={{
          title: '검색',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="MypageStackNavigation"
        component={MypageStackNavigation}
        options={{
          title: '나의 정보',
          tabBarIcon: ({color, size}) => (
            <Icon name="notifications" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStackNavigation;
