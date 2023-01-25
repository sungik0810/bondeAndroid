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
import { StyleContext } from './ContextAPI/StyleContext';
import HomeScreen from './Screens/HomeScreen';
import MypageScreen from './Screens/MypageScreen';
import LocalSearchScreen from './Screens/Search/LocalSearchScreen';
import FoodSearchScreen from './Screens/Search/FoodSearchScreen';
import ChannelSearchScreen from './Screens/Search/ChannelSearchScreen';
import StoreListScreen from './Screens/StoreListScreen';
import StoreItemScreen from './Screens/StoreItemScreen';
const App = () => {
  const BASE_URL = 'http://192.168.0.12:3000';
  // navigation
  const Stack = createNativeStackNavigator();
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
  const [windowWidth,setWindowWidth] = useState(null);
  const [localData,setLocalData]=useState([])
  const [countryCount,setCountryCount] = useState({})
  const [countryNumbers,setCountryNumbers] = useState([])
  useEffect(() => {
    if (
      storeData !== null &&
      youtubeVideoData !== null &&
      searchData !== null &&
      windowWidth !== null &&
      countryNumbers !== null &&
      countryCount !== null
    ) {
      setIsAppLoading(false);
    }
  }, [storeData, youtubeVideoData, searchData,windowWidth,countryCount,countryNumbers ]);

  return isAppLoading ? (
    <BASE_URL_Context.Provider value={{BASE_URL}}>
      <DataContext.Provider
        value={{
          setIsAppLoading,
          setStoreData,
          setYoutubeVideoData,
          setSearchData,
          setLocalData,
          setWindowWidth,
          setCountryCount,
          setCountryNumbers
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
      <StyleContext.Provider value={windowWidth}>
      <DataContext.Provider value={{storeData, youtubeVideoData, searchData,countryNumbers,countryCount}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="App"
            screenOptions={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#FF8A00',
              
                headerStyle: {
                  backgroundColor: '#FF8A00',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Channel"
              component={ChannelSearchScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Food"
              component={FoodSearchScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Local"
              component={LocalSearchScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Mypage"
              component={MypageScreen}
              options={{headerShown: true}}
            />
            
            {localData.map((country)=>{
              return(<Stack.Screen
                key={`country-${country[0]}`}
                name={`country-${country[0]}`}
                component={StoreListScreen}
                options={{headerShown: true}}
              />)
            })}

            {searchData.map((store)=>{
              console.log(store.name)
              return(<Stack.Screen
                key={store.name}
                name={store.name}
                component={StoreItemScreen}
                options={{headerShown: true}}
              />)
            })}
            

          </Stack.Navigator>
        </NavigationContainer>
        {/* <HomeScreen /> */}
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </DataContext.Provider>
      </StyleContext.Provider>
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
