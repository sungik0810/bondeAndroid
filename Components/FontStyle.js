import {Platform, Text} from 'react-native';

const FontStyle = ({
  text,
  size,
  color="black",
  fontWeight = '300',
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginBottom = 0,
  textAlign = 'auto',
  ellipsizeMode = "tail",
  numberOfLines = 2
}) => {
  return Platform.OS === 'ios' ? (
    size === 'mini' ? (
      <Text
        style={{
          color,
          fontSize: 12,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'small' ? (
      <Text
        style={{
          color,
          fontSize: 15,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'medium' ? (
      <Text
        style={{
          color,
          fontSize: 17,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'big' ? (
      <Text
        style={{
          color,
          fontSize: 20,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'xLarge' ? (
      <Text
        style={{
          color,
          fontSize: 28,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : (
      <Text>Font size is undefined</Text>
    )
  ) : Platform.OS === 'android' ? (
    size === 'mini' ? (
      <Text
        style={{
          color,
          fontSize: 12,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'small' ? (
      <Text
        style={{
          color,
          fontSize: 14,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'medium' ? (
      <Text
        style={{
          color,
          fontSize: 16,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'big' ? (
      <Text
        style={{
          color,
          fontSize: 20,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : size === 'xLarge' ? (
      <Text
        style={{
          color,
          fontSize: 24,
          fontWeight,
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign,
        }}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}>
        {text}
      </Text>
    ) : (
      <Text>Font size is undefined</Text>
    )
  ) : null;
};

export default FontStyle;
