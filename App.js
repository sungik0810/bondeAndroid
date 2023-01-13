import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BASE_URL_Context} from './ContextAPI/BASE_URL_Context';
import {DataContext} from './ContextAPI/DataContext';
import LoadingScreen from './Screens/LoadingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigation from './Navigations/AppStackNavigation';
import HomeScreen from './Screens/HomeScreen';
const BASE_URL = 'http://192.168.0.12:3000';
// navigation
const Stack = createNativeStackNavigator();
const App = () => {
  // StatusBar dark mode
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // loading
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);
  const [youtubeVideoData, setYoutubeVideoData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  useEffect(() => {
    if (
      storeData !== null &&
      youtubeVideoData !== null &&
      searchData !== null
    ) {
      setIsAppLoading(false);
    }
  }, [storeData, youtubeVideoData, searchData]);

  return isAppLoading ? (
    <BASE_URL_Context.Provider value={{BASE_URL}}>
      <DataContext.Provider
        value={{
          setIsAppLoading,
          setStoreData,
          setYoutubeVideoData,
          setSearchData,
        }}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <LoadingScreen />
        </SafeAreaView>
      </DataContext.Provider>
    </BASE_URL_Context.Provider>
  ) : (
    <BASE_URL_Context.Provider value={BASE_URL}>
      <DataContext.Provider value={storeData}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="App"
            screenOptions={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#fb8c00',
            }}>
            <Stack.Screen
              name="AppStackNavigation"
              component={AppStackNavigation}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <HomeScreen /> */}
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </DataContext.Provider>
    </BASE_URL_Context.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
