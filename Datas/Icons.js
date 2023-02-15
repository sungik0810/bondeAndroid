import {Image, Text} from 'react-native';
import {
  CLOUD_FRONT_URL,
  CLOUD_FRONT_URL_LOGO,
  CLOUD_FRONT_URL_THUMBNAIL,
} from '@env';
import FastImage from 'react-native-fast-image';
import {WithLocalSvg} from 'react-native-svg';
const IconImage = ({name, uri = String}) => {
  const socialIcon =
    uri === 'Apple'
      ? require('../asset/icons/socialLoginIcons/appleLogo.svg')
      : uri === 'Google'
      ? require('../asset/icons/socialLoginIcons/googleLogo.svg')
      : uri === 'Kakao'
      ? require('../asset/icons/socialLoginIcons/kakaoLogo.svg')
      : uri === 'email'
      ? require('../asset/icons/socialLoginIcons/kakaoLogo.svg')
      : null;
  return name === 'mini' ? (
    <Image
      style={{height: '100%', width: '100%', resizeMode: 'contain'}}
      source={require('../asset/icons/5039041.png')}
    />
  ) : name === 'foodSectors' ? (
    <Image
      style={{height: '100%', width: '100%', resizeMode: 'contain'}}
      source={uri}
    />
  ) : name === 'channel' ? (
    <FastImage
      style={{height: '100%', width: '100%'}}
      source={{
        uri: `${CLOUD_FRONT_URL}${uri}`,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  ) : name === 'storeLogo' ? (
    <FastImage
      style={{backgroundColor: 'black', height: '100%', width: '100%'}}
      source={{
        uri: `${CLOUD_FRONT_URL_LOGO}${uri}`,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  ) : name === 'youtubeThumbnail' ? (
    <FastImage
      style={{backgroundColor: 'black', height: '100%', width: '100%'}}
      source={{
        uri: `${CLOUD_FRONT_URL_THUMBNAIL}${uri}`,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  ) : name === 'socialLogin' ? (
    <WithLocalSvg asset={socialIcon} />
  ) : (
    <Text>IconName is undefined</Text>
  );
};

export default IconImage;
