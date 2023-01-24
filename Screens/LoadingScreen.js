import React, {useContext, useEffect, useState} from 'react';
import {Alert, Dimensions, Text, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {DataContext} from '../ContextAPI/DataContext';
import {BASE_URL_Context} from '../ContextAPI/BASE_URL_Context';
import { locals } from '../Datas/locals';
const LoadingScreen = () => {
  const {setStoreData, setYoutubeVideoData, setSearchData, setWindowWidth,setLocalData} =
  useContext(DataContext);
  const {BASE_URL} = useContext(BASE_URL_Context);
  // network connet checking && version checking && loading
  const netInfo = useNetInfo();
  const [newVersion, setNewVersion] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');

  async function serverData(newServerVersion) {
    try {
      const serverDataAxios = await axios.get(`${BASE_URL}/api/content`);
      const serverData = serverDataAxios.data;
      const storeServerData = await serverData.map(item => {
        return {
          channelName: item.channelName,
          country: item.country,
          name: item.name,
          // rate
          // logo
          address: item.address,
          openTime: item.openTime,
          breakTime: item.breakTime,
          lastOrderTime: item.lastOrderTime,
          closed: item.closed,
          contact: item.contact,
          
        };
      });
      const youtubeVideoServerData = await serverData.map(item => {
        return {
          channelName: item.channelName,
          thumbnail: item.thumbnail,
          link: item.link,
          title: item.title,
          onAir: item.onAir,
        };
      });
      const searchServerData = await serverData.map(item => {
        return {
          listing: item.listing,
          state: item.state,
          country: item.country,
          sectors: item.sectors,
        };
      });
      setStoreData(storeServerData);
      setYoutubeVideoData(youtubeVideoServerData);
      setSearchData(searchServerData);
      const DataToJsonStoreServerData = JSON.stringify(storeServerData);
      await AsyncStorage.setItem(
        'storeLocalStorageData',
        DataToJsonStoreServerData,
      );
      const DataToJsonYoutubeVideoServerData = JSON.stringify(
        youtubeVideoServerData,
      );
      await AsyncStorage.setItem(
        'youtubeVideoLocalStorageData',
        DataToJsonYoutubeVideoServerData,
      );
      const DataToJsonSearchServerData = JSON.stringify(searchServerData);
      await AsyncStorage.setItem(
        'searchLocalStorageData',
        DataToJsonSearchServerData,
      );

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
    const storeLocalStorageData = await AsyncStorage.getItem(
      'storeLocalStorageData',
    );
    const JsonToDataStoreLocalStorageData = JSON.parse(storeLocalStorageData);

    const youtubeVideoLocalStorageData = await AsyncStorage.getItem(
      'youtubeVideoLocalStorageData',
    );
    const JsonToDataYoutubeVideoLocalStorageData = JSON.parse(
      youtubeVideoLocalStorageData,
    );

    const searchLocalStorageData = await AsyncStorage.getItem(
      'searchLocalStorageData',
    );
    const JsonToDataSearchLocalStorageData = JSON.parse(searchLocalStorageData);
    setStoreData(JsonToDataStoreLocalStorageData);
    setYoutubeVideoData(JsonToDataYoutubeVideoLocalStorageData);
    setSearchData(JsonToDataSearchLocalStorageData);

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
              console.log('새 버전과 현재 버전이 같을 때 실행합니다.');
              localStorageData(currentVersion);
              return;
            } else if (newServerVersion !== currentVersion) {
              console.log(
                '서버에서 받아온 새 버전과 현재 버전이 다를때 실행됩니다.',
              );
              serverData(newServerVersion);
              return;
            }
          } else if (currentVersion == null) {
            console.log(
              '최초 실행때라고 예측하는데 currentVersion이 null일때 실행됩니다.',
            );
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
        console.log('인터넷 연결 안돼있을때 실행됩니다.');
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
      setWindowWidth(windowWidth)
      const t1 = performance.now();
      console.log('Time taken:', (t1 - t0).toFixed(4), 'ms');
      return;
    }
  }, [netInfo.isConnected]);

  useEffect(()=>{
    const countryNumbers = []
    Object.entries(locals).map((state)=>{
      state[1].countryAll.map((country)=>{
        countryNumbers.push([country.countryNum,country.countryKr,country.countryEn])
      })
    })
    setLocalData(countryNumbers)
  },[])
  return (
    <View>
      <Text>Loading...</Text>
      <Text>netInfo.isConnected : {netInfo.isConnected}</Text>
    </View>
  );
};

export default LoadingScreen;
