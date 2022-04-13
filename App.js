import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Look for plant species and scan to learn about it. Turn on the volume to be guided through audio.
        </Text>
      </View>
      <View style={styles.imageSection} />
      <View style={styles.buttonPosition}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.startButtonText}>{'START'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center'
  },
  headingContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 22,
    height: 160,
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#FFFFFF",
  },
  startButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    width: 99,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 108,
  },
  imageSection: {
    marginTop: 50,
    width: '100%',
    height: 256,
    backgroundColor: '#ffffff'
  }
});
