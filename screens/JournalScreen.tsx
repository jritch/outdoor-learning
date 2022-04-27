import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import JournalUtil from '../components/Journal';
import JournalCard from '../components/JournalCard';
import JournalRecordScreen from './JournalRecordScreen';

import {JournalEntry} from '../types';

export default function JournalScreen() {
  const journalData: Array<any> = [];
  const [journalRecords, setJournalRecords] = useState(journalData);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [showJournalRecord, setShowJournalRecord] = useState<boolean>(false);
  const [currentJournalRecord, setCurrentJournalRecord] = useState<JournalEntry>();

  const closeIcon =
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/close.png';

  useEffect(() => {
    const fetchJournalData = async () => {
      if (!dataLoaded) {
        const journalData = await JournalUtil.loadJournal();
        populateJournalRecords(journalData);
        setDataLoaded(true);
      }
    }

    function populateJournalRecords(journalData: Array<JournalEntry>) {
      const journalRecordRows: Array<any> = [];
      for(let index=0; index<journalData.length; index+=2 ) {
        journalRecordRows.push(createJournalRecordRow(journalData[index], journalData[index+1]));
      }
      setJournalRecords(oldArray => [...oldArray, journalRecordRows]);
    }

    function createJournalRecordRow(entry1: JournalEntry, entry2: JournalEntry) {
      var view1, view2;
      if (entry1) {
        view1 = createJournalRecordView(entry1);
      }
      if (entry2) {
        view2 = createJournalRecordView(entry2);
      }
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
          {view1}
          {view2}
        </View>
      )
    }

    function displayJournalRecord(entry: JournalEntry) {
      setCurrentJournalRecord(entry);
      setShowJournalRecord(true);
    }

    function createJournalRecordView(journalEntry: JournalEntry) {
      return (
        <JournalCard timestamp={journalEntry['timestamp']} onClick={() => {displayJournalRecord(journalEntry)}} thumbnailImage={'https://reactjs.org/logo-og.png'}/>
      )
    }

  fetchJournalData();
  }, [dataLoaded]);


  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '85%'}}>
        <ScrollView style={styles.scrollView}>
          {journalRecords}
        </ScrollView>
      </View>
      {showJournalRecord && currentJournalRecord &&
        (
          <View style={{position: 'absolute', top: 0, width: '100%', height: '100%'}}>
            <JournalRecordScreen entry={currentJournalRecord}/>
          </View>
        )
      }
      {showJournalRecord && currentJournalRecord &&
        (
          <View style={styles.closeIcon}>
            <TouchableOpacity
              onPress={() => {
                setShowJournalRecord(false);
              }}
            >
              <Image
                source={{uri: closeIcon}}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#121212',
  },
  closeIcon: {
    position: 'absolute',
    marginLeft: 24,
  },
});
