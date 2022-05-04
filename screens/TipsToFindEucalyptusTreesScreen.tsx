import * as React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

export default function TipsToFindEucalyptusTreesScreen() {
  const text1 =
    'Eucalyptus leaves are long and thin, with a slight bulge in the middle.';
  const text2 =
    'You might also notice that eucalyptus has a distinctive bark pattern.';
  const heading = 'Tips on how to find eucalyptus trees';

  return (
    <View style={styles.wrapper}>
      <View style={styles.mainContainer}>
        <ScrollView style={{height: '100%'}}>
          <View>
            <Text style={styles.headingSection}>{heading}</Text>
          </View>
          <View>
            <Text style={styles.textSection}>{text1}</Text>
          </View>
          <View style={styles.imageSection}>
            <ImageBackground
              imageStyle={{borderRadius: 20}}
              source={{uri: 'https://reactjs.org/logo-og.png'}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.textSection}>{text2}</Text>
          </View>
          <View style={styles.imageSection}>
            <ImageBackground
              imageStyle={{borderRadius: 20}}
              source={{uri: 'https://reactjs.org/logo-og.png'}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonPosition}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.findButtonText}>{'FIND'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#121212',
    flex: 1,
  },
  mainContainer: {
    marginLeft: 24,
    marginRight: 24,
    height: '80%',
  },
  textSection: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSection: {
    width: '100%',
    height: 200,
    marginTop: 16,
  },
  headingSection: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
  },
  findButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 24,
    marginRight: 24,
  },
});
