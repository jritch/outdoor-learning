import * as React from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';

export default function SampleEucalyptusTreesScreen() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.textSection}>
          Try using the shape of the leaves to help you identify eucalyptus.
        </Text>
      </View>
      <View style={styles.imageSection}>
        <ImageBackground imageStyle={{ borderRadius: 20}} source={{uri: "https://reactjs.org/logo-og.png"}} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.textSection}>
          You might also notice that eucalyptus has a distinctive bark pattern. See if you can use the bark and the leaves to identify eucalyptus.
        </Text>
      </View>
      <View style={styles.imageSection}>
        <ImageBackground imageStyle={{ borderRadius: 20}} source={{uri: "https://reactjs.org/logo-og.png"}} resizeMode="cover" style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 24,
    marginRight: 24,
  },
  textSection: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  imageSection: {
    width: '100%',
    height: 250,
    marginTop: 16,
  }
});
