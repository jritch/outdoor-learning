import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function JournalNUXScreen() {
  const nuxMessageText = "Find and scan a eucalyptus tree to start your journal.";

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{nuxMessageText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 56,
    marginRight: 56,
  },
  message: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
});
