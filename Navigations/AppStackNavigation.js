import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackNavigation from './HomeStackNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const AppStackNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Route"
      screenOptions={{
        tabBarActiveTintColor: '#fb8c00',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{
          title: '홈',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="YoutubeStackNavigation"
        component={YoutubeStackNavigation}
        options={{
          title: 'YOUTUBE',
          tabBarIcon: ({color, size}) => (
            <Icon name="notifications" color={color} size={size} />
          ),
          headerShown: false,
        }}
      /> */}
      {/* <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '검색',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: '메시지',
          tabBarIcon: ({color, size}) => (
            <Icon name="message" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default AppStackNavigation;
