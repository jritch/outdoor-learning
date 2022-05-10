import * as React from 'react';
import {ImageBackground, View, ImageSourcePropType} from 'react-native';
import {Dimensions} from 'react-native';

type Props = {
  imageSource: ImageSourcePropType | null;
};

export default function FeaturedCoverImage({imageSource}: Props) {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        height: windowWidth,
      }}
    >
      {imageSource != null && (
        <ImageBackground
          source={imageSource}
          resizeMode="cover"
          style={{
            height: windowWidth,
          }}
        />
      )}
    </View>
  );
}
