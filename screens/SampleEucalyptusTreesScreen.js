'use strict';
exports.__esModule = true;
var React = require('react');
var react_native_1 = require('react-native');
function SampleEucalyptusTreesScreen() {
  return (
    <react_native_1.View style={styles.wrapper}>
      <react_native_1.View style={styles.mainContainer}>
        <react_native_1.View>
          <react_native_1.Text style={styles.textSection}>
            Try using the shape of the leaves to help you identify eucalyptus.
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.imageSection}>
          <react_native_1.ImageBackground
            imageStyle={{borderRadius: 20}}
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            resizeMode="cover"
            style={styles.image}
          />
        </react_native_1.View>
        <react_native_1.View style={styles.textSection}>
          <react_native_1.Text style={styles.textSection}>
            You might also notice that eucalyptus has a distinctive bark
            pattern. See if you can use the bark and the leaves to identify
            eucalyptus.
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.imageSection}>
          <react_native_1.ImageBackground
            imageStyle={{borderRadius: 20}}
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            resizeMode="cover"
            style={styles.image}
          />
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>
  );
}
exports.default = SampleEucalyptusTreesScreen;
// test comment
var styles = react_native_1.StyleSheet.create({
  wrapper: {
    backgroundColor: '#121212',
  },
  mainContainer: {
    marginLeft: 24,
    marginRight: 24,
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
    height: 250,
    marginTop: 16,
  },
});
