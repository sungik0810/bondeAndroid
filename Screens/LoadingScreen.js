import React, {useContext, useEffect, useState} from 'react';
import {Alert, Dimensions, Text, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {DataContext} from '../ContextAPI/DataContext';
import {BASE_URL_Context} from '../ContextAPI/BASE_URL_Context';
import {locals} from '../Datas/locals';
import {getUniqueId} from 'react-native-device-info';
import jwt_decode from 'jwt-decode';
import RNRestart from 'react-native-restart';
const LoadingScreen = () => {
  const {
    setStoreData,
    setYoutubeVideoData,
    setSearchData,
    setWindowWidth,
    setLocalData,
    setCountryCount,
    setCountryNumbers,
    setChannelItem,
    setDeviceId,
    setLogined,
    setUserToken,
  } = useContext(DataContext);
  const {BASE_URL} = useContext(BASE_URL_Context);
  // network connet checking && version checking && loading
  const netInfo = useNetInfo();
  const [newVersion, setNewVersion] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const uniqueId = getUniqueId();
  // setDeviceId(uniqueId._j);
  async function serverData(newServerVersion) {
    try {
      const channelItemAxios = await axios.get(`${BASE_URL}/api/channel`);
      const channelItemData = channelItemAxios.data;
      const channelItem = Object.entries(channelItemData[0].channels);
      setChannelItem(channelItem);
      const DataToJsonChannelItemServerData = JSON.stringify(channelItem);
      await AsyncStorage.setItem(
        'channelLocalStorageData',
        DataToJsonChannelItemServerData,
      );
      const serverDataAxios = await axios.get(`${BASE_URL}/api/content`);
      const serverData = serverDataAxios.data;
      //
      const storeServerData = await serverData.map(item => {
        return {
          dataNumber: item.dataNumber,
          channelName: item.channelName,
          country: item.country,
          name: item.name,
          // rate
          logo: item.logo,
          address: item.address,
          openTime: item.openTime,
          breakTime: item.breakTime,
          lastOrderTime: item.lastOrderTime,
          closed: item.closed,
          contact: item.contact,
          channelName: item.channelName,
          thumbnail: item.thumbnail,
          link: item.link,
          title: item.title,
          onAir: item.onAir,
        };
      });
      setStoreData(storeServerData);
      const DataToJsonStoreServerData = JSON.stringify(storeServerData);
      await AsyncStorage.setItem(
        'storeLocalStorageData',
        DataToJsonStoreServerData,
      );
      //
      const youtubeVideoServerData = await serverData.map(item => {
        return {
          channelName: item.channelName,
          thumbnail: item.thumbnail,
          link: item.link,
          title: item.title,
          onAir: item.onAir,
        };
      });
      setYoutubeVideoData(youtubeVideoServerData);
      const DataToJsonYoutubeVideoServerData = JSON.stringify(
        youtubeVideoServerData,
      );
      await AsyncStorage.setItem(
        'youtubeVideoLocalStorageData',
        DataToJsonYoutubeVideoServerData,
      );
      //
      const searcServerDataFilter = await serverData.filter(
        item => item.address !== null,
      );
      const searchServerData = searcServerDataFilter.map(item => {
        return {
          state: item.state,
          country: item.country,
          channelName: item.channelName,
          name: item.name,
          // rate
          logo: item.logo,
          address: item.address,
          sectors: item.sectors,
        };
      });
      setSearchData(searchServerData);
      const DataToJsonSearchServerData = JSON.stringify(searchServerData);
      await AsyncStorage.setItem(
        'searchLocalStorageData',
        DataToJsonSearchServerData,
      );

      const countryCounter = {};
      searchServerData.map(store => {
        countryCounter[store.country] = 0;
      });
      const countryNum = searchServerData.map(store => {
        countryCounter[store.country] = countryCounter[store.country] + 1;
        return store.country;
      });
      setCountryNumbers(countryNum);
      setCountryCount(countryCounter);

      setNewVersion(newServerVersion);
      setCurrentVersion(newServerVersion);
      const DataToJsonNewServerVersion = JSON.stringify(newServerVersion);
      await AsyncStorage.setItem('version', DataToJsonNewServerVersion);

      const DataToJsonServerData = JSON.stringify(serverData);
      await AsyncStorage.setItem('localStorageData', DataToJsonServerData);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  async function localStorageData(currentVersion) {
    //
    const channelLocalStorageData = await AsyncStorage.getItem(
      'channelLocalStorageData',
    );
    const JsonToDataChannelLocalStorageData = JSON.parse(
      channelLocalStorageData,
    );
    setChannelItem(JsonToDataChannelLocalStorageData);
    //
    const storeLocalStorageData = await AsyncStorage.getItem(
      'storeLocalStorageData',
    );
    const JsonToDataStoreLocalStorageData = JSON.parse(storeLocalStorageData);
    setStoreData(JsonToDataStoreLocalStorageData);
    //
    const youtubeVideoLocalStorageData = await AsyncStorage.getItem(
      'youtubeVideoLocalStorageData',
    );
    const JsonToDataYoutubeVideoLocalStorageData = JSON.parse(
      youtubeVideoLocalStorageData,
    );
    setYoutubeVideoData(JsonToDataYoutubeVideoLocalStorageData);
    //
    const searchLocalStorageData = await AsyncStorage.getItem(
      'searchLocalStorageData',
    );
    const JsonToDataSearchLocalStorageData = JSON.parse(searchLocalStorageData);
    setSearchData(JsonToDataSearchLocalStorageData);

    const countryCounter = {};
    JsonToDataSearchLocalStorageData.map(store => {
      countryCounter[store.country] = 0;
    });
    const countryNum = JsonToDataSearchLocalStorageData.map(store => {
      countryCounter[store.country] = countryCounter[store.country] + 1;
      return store.country;
    });
    setCountryNumbers(countryNum);
    setCountryCount(countryCounter);

    setNewVersion(currentVersion);
    setCurrentVersion(currentVersion);
    return;
  }
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
              // console.log('새 버전과 현재 버전이 같을 때 실행합니다.');
              localStorageData(currentVersion);
              return;
            } else if (newServerVersion !== currentVersion) {
              // console.log(
              // '서버에서 받아온 새 버전과 현재 버전이 다를때 실행됩니다.',
              // );
              serverData(newServerVersion);
              return;
            }
          } else if (currentVersion == null) {
            // console.log(
            // '최초 실행때라고 예측하는데 currentVersion이 null일때 실행됩니다.',
            // );
            serverData(newServerVersion);
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
      newVersionChecker();
      return;
    } else if (!netInfo.isConnected) {
      if (currentVersion != null) {
        // console.log('인터넷 연결 안돼있을때 실행됩니다.');
        localStorageData(currentVersion);
        return;
      } else if (currentVersion == null) {
        Alert.alert('인터넷 연결이 필요합니다.');
        // 어플 종료 코드 작성
        return;
      }
    }
  }

  useEffect(() => {
    if (netInfo.isConnected != null) {
      const t0 = performance.now();
      appVersionChecker();
      const windowWidth = Dimensions.get('window').width;
      setWindowWidth(windowWidth);
      setDeviceId(uniqueId._j);
      const t1 = performance.now();
      console.log('Time taken:', (t1 - t0).toFixed(4), 'ms');
      return;
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    const countryNumbers = [];
    Object.entries(locals).map(state => {
      state[1].countryAll.map(country => {
        countryNumbers.push([
          country.countryNum,
          country.countryKr,
          country.countryEn,
          state[1].stateKr,
        ]);
      });
    });
    setLocalData(countryNumbers);
  }, []);
  useEffect(() => {
    const userLogin = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === null) {
        // console.log('userToken === null');
        setLogined(false);
        setUserToken(null);
      } else if (userToken !== null) {
        // console.log('userToken !== null');
        const decodedToken = jwt_decode(userToken);
        const email = decodedToken.data.email;
        const userAccessToken = JSON.parse(userToken);
        const check = await axios
          .post(`${BASE_URL}/auth/jwtcheck`, {
            email: email,
            jwt: userAccessToken,
          })
          .then(async result => {
            const signature = result.data.signature;

            if (signature) {
              const accessToken = result.data.sendAccessToken;
              const JSONaccessToken = JSON.stringify(accessToken);
              setLogined(true);
              setUserToken(accessToken);
              await AsyncStorage.setItem('userToken', JSONaccessToken);
            } else {
              await AsyncStorage.removeItem('userToken');
              setLogined(false);
              setUserToken(null);
              RNRestart.Restart();
            }
          })
          .catch(async err => {
            await AsyncStorage.removeItem('userToken');
            setLogined(false);
            setUserToken(null);
            RNRestart.Restart();
          });
      }
    };

    userLogin();
  }, []);
  return (
    <View>
      <Text>Loading...</Text>
      <Text>netInfo.isConnected : {netInfo.isConnected}</Text>
    </View>
  );
};

export default LoadingScreen;
