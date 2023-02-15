import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BASE_URL_Context} from './ContextAPI/BASE_URL_Context';
import {DataContext} from './ContextAPI/DataContext';
import LoadingScreen from './Screens/LoadingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleContext} from './ContextAPI/StyleContext';
import HomeScreen from './Screens/HomeScreen';
import MypageScreen from './Screens/MypageScreen';
import LocalSearchScreen from './Screens/Search/LocalSearchScreen';
import FoodSearchScreen from './Screens/Search/FoodSearchScreen';
import ChannelSearchScreen from './Screens/Search/ChannelSearchScreen';
import StoreListScreen from './Screens/StoreListScreen';
import StoreItemScreen from './Screens/StoreItemScreen';
import {API_URL} from '@env';
import {foodSectors} from './Datas/foodSectors';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/Register/RegisterScreen';
import {getUniqueId} from 'react-native-device-info';
import EmailLoginScreen from './Screens/EmailLoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const BASE_URL = API_URL;
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
  const [channelItem, setChannelItem] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [localData, setLocalData] = useState([]);
  const [countryCount, setCountryCount] = useState({});
  const [countryNumbers, setCountryNumbers] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const [logined, setLogined] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (
      storeData !== null &&
      youtubeVideoData !== null &&
      searchData !== null &&
      windowWidth !== null &&
      countryNumbers !== null &&
      countryCount !== null &&
      channelItem !== null &&
      deviceId !== null
    ) {
      setIsAppLoading(false);
      console.log();
    }
  }, [
    storeData,
    youtubeVideoData,
    searchData,
    windowWidth,
    countryCount,
    countryNumbers,
    channelItem,
    deviceId,
    logined,
    userToken,
  ]);
  // const userLogin = async () => {
  //   const a = await AsyncStorage.getItem('userToken');
  //   const data = JSON.parse(a);
  //   console.log(data);
  //   console.log(data === null);
  //   return data === null;
  // };
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
          setCountryNumbers,
          setChannelItem,
          setDeviceId,
          setLogined,
          setUserToken,
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
        <DataContext.Provider
          value={{
            storeData,
            youtubeVideoData,
            searchData,
            countryNumbers,
            countryCount,
            channelItem,
            deviceId,
            userToken,
          }}>
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
              {userToken === null ? (
                <Stack.Screen
                  name="BONDE"
                  component={HomeScreen}
                  options={({navigation}) => ({
                    title: '',
                    headerLeft: () => (
                      <View>
                        <Text>logoImage</Text>
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        style={{backgroundColor: 'green'}}
                        onPress={() => {
                          navigation.navigate('Login');
                        }}>
                        <Text>login</Text>
                      </TouchableOpacity>
                    ),
                  })}
                />
              ) : (
                <Stack.Screen
                  name="BONDE"
                  component={HomeScreen}
                  options={({navigation}) => ({
                    title: '',
                    headerLeft: () => (
                      <View>
                        <Text>logoImage</Text>
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        style={{backgroundColor: 'green'}}
                        onPress={() => {
                          navigation.navigate('Mypage');
                        }}>
                        <Text>logined</Text>
                      </TouchableOpacity>
                    ),
                  })}
                />
              )}
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="EmailLogin"
                component={EmailLoginScreen}
                options={{headerShown: true, title: ''}}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={({navigation}) => ({
                  headerShown: true,
                  title: '',
                  headerStyle: {
                    backgroundColor: '#FF8A00',
                  },
                  headerTintColor: '#000000',
                })}
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

              {localData.map(country => {
                return (
                  <Stack.Screen
                    key={`country-${country[0]}`}
                    name={`${country[3]} ${country[1]}`}
                    component={StoreListScreen}
                    options={{headerShown: true}}
                  />
                );
              })}

              {Object.entries(foodSectors).map(food => {
                return (
                  <Stack.Screen
                    key={`food-${food[0]}`}
                    name={`${food[1][0]}`}
                    component={StoreListScreen}
                    options={{headerShown: true}}
                  />
                );
              })}

              {channelItem.map(channel => {
                return (
                  <Stack.Screen
                    key={`channel-${channel[0]}`}
                    name={channel[1][0]}
                    component={StoreListScreen}
                    options={{headerShown: true}}
                  />
                );
              })}

              {searchData.map(store => {
                return (
                  <Stack.Screen
                    key={store.name}
                    name={store.name}
                    component={StoreItemScreen}
                    options={{headerShown: true}}
                  />
                );
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
