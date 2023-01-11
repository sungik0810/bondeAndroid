import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BASE_URL_Context} from './ContextAPI/BASE_URL_Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
const BASE_URL = 'http://192.168.0.12:3000';
const App = () => {
  // StatusBar dark mode
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // network connet checking && version checking && loading
  const netInfo = useNetInfo();
  const [fixedServerData, setFixedserverData] = useState([]);
  const [newVersion, setNewVersion] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const [isAppLoading, setIsAppLoading] = useState(true);

  async function serverData(newServerVersion) {
    try {
      const serverDataAxios = await axios.get(`${BASE_URL}/api/youtuberList`);
      const serverData = serverDataAxios.data;
      setFixedserverData(serverData);
      setNewVersion(newServerVersion);
      setCurrentVersion(newServerVersion);
      const DataToJsonServerData = JSON.stringify(serverData);
      await AsyncStorage.setItem('localStorageData', DataToJsonServerData);
      const DataToJsonNewServerVersion = JSON.stringify(newServerVersion);
      await AsyncStorage.setItem('version', DataToJsonNewServerVersion);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (netInfo.isConnected != null) {
      async function appVersionChecker() {
        const storageAppVersion = await AsyncStorage.getItem('version');
        const currentVersion =
          storageAppVersion !== null
            ? [...JSON.parse(storageAppVersion)].join('')
            : null;

        if (netInfo.isConnected) {
          async function newVersionChecker() {
            try {
              const newServerVersionAxios = await axios.get(
                `${BASE_URL}/api/version`,
              );
              const newServerVersion = newServerVersionAxios.data;
              if (currentVersion != null) {
                if (newServerVersion == currentVersion) {
                  console.log('새 버전과 현재 버전이 같을 때 실행합니다.');
                  const localStorageData = await AsyncStorage.getItem(
                    'localStorageData',
                  );
                  const JsonToDataLocalStorageData =
                    JSON.parse(localStorageData);
                  setNewVersion(currentVersion);
                  setCurrentVersion(currentVersion);
                  setFixedserverData(JsonToDataLocalStorageData);
                  return setIsAppLoading(false);
                } else if (newServerVersion !== currentVersion) {
                  console.log(
                    '서버에서 받아온 새 버전과 현재 버전이 다를때 실행됩니다.',
                  );
                  serverData(newServerVersion);
                  return setIsAppLoading(false);
                }
              } else if (currentVersion == null) {
                console.log(
                  '최초 실행때라고 예측하는데 currentVersion이 null일때 실행됩니다.',
                );
                serverData(newServerVersion);
                return setIsAppLoading(false);
              }
            } catch (error) {
              console.log(error);
            }
          }
          newVersionChecker();
        } else if (!netInfo.isConnected) {
          setNewVersion(currentVersion);
          setCurrentVersion(currentVersion);
          const localStorageData = await AsyncStorage.getItem(
            'localStorageData',
          );
          const JsonToDataLocalStorageData = JSON.parse(localStorageData);
          setFixedserverData(JsonToDataLocalStorageData);
          console.log('인터넷 연결 안돼있을때 실행됩니다.');
          return setIsAppLoading(false);
        }
      }
      appVersionChecker();
    }
  }, [netInfo.isConnected]);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {isAppLoading ? (
        <View>
          <Text>Loding...</Text>
        </View>
      ) : (
        <BASE_URL_Context.Provider value={BASE_URL}>
          <View>
            <Text>complete</Text>
            <Text>appVersion{currentVersion}</Text>
            <Text>serverVersion{newVersion}</Text>
          </View>
        </BASE_URL_Context.Provider>
      )}
    </SafeAreaView>
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
