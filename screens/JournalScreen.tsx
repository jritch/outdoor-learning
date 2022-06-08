import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, ScrollView, View, StyleSheet, Pressable} from 'react-native';
import JournalUtil from '../components/Journal';
import JournalCard from '../components/JournalCard';
import JournalRecordScreen from './JournalRecordScreen';
import JournalNUXScreen from './JournalNUXScreen';

import {JournalEntry} from '../types';
import JournalRecordOptionsBar from '../components/JournalRecordOptionsBar';

const closeIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/close.png';
const deleteIcon =
  'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/delete-icon.png';

export default function JournalScreen() {
  const journalData: Array<any> = [];
  const [journalRecords, setJournalRecords] = useState(journalData);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [showJournalRecord, setShowJournalRecord] = useState<boolean>(false);
  const [currentJournalRecord, setCurrentJournalRecord] =
    useState<JournalEntry>();

  useEffect(() => {
    const fetchJournalData = async () => {
      if (!dataLoaded) {
        const journalDataToPopulate = await JournalUtil.loadJournal();
        populateJournalRecords(journalDataToPopulate);
        setDataLoaded(true);
      }
    };

    function populateJournalRecords(
      journalDataToPopulate: Array<JournalEntry>,
    ) {
      const journalRecordRows: Array<any> = [];
      for (let index = 0; index < journalDataToPopulate.length; index += 2) {
        journalRecordRows.push(
          createJournalRecordRow(
            index,
            journalDataToPopulate[index],
            journalDataToPopulate[index + 1],
          ),
        );
      }
      setJournalRecords(oldArray => [...oldArray, journalRecordRows]);
    }

    function createJournalRecordRow(
      index: number,
      entry1: JournalEntry,
      entry2: JournalEntry,
    ) {
      var view1, view2;
      if (entry1) {
        view1 = createJournalRecordView(entry1);
      }
      if (entry2) {
        view2 = createJournalRecordView(entry2);
      } else {
        // Add a placeholder view so that 'space-evenly' places the views correctly in the row
        view2 = <View style={{width: '45%'}} />;
      }
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}
        >
          {view1}
          {view2}
        </View>
      );
    }

    function displayJournalRecord(entry: JournalEntry) {
      setCurrentJournalRecord(entry);
      setShowJournalRecord(true);
    }

    function createJournalRecordView(journalEntry: JournalEntry) {
      const image = journalEntry.images[0];
      // Check if image is a string to support older records
      const imageSource = typeof image === 'string' ? {uri: image} : image;

      return (
        <JournalCard
          timestamp={journalEntry.timestamp}
          onClick={() => {
            displayJournalRecord(journalEntry);
          }}
          thumbnailImage={imageSource}
        />
      );
    }

    fetchJournalData();
  }, [dataLoaded]);

  async function deleteJournalRecord() {
    if (currentJournalRecord) {
      await JournalUtil.deleteRecord(currentJournalRecord.timestamp.toString());
      setDataLoaded(false); // force loading from file system to reflect the changes.
      setJournalRecords([]);
      setShowJournalRecord(false);
    }
  }

  function showCurrentRecordScreen(currentJournalRecordToShow: JournalEntry) {
    return (
      <View
        style={{position: 'absolute', top: 0, width: '100%', height: '100%'}}
      >
        <JournalRecordScreen entry={currentJournalRecordToShow} />
      </View>
    );
  }

  function showOptionsIconBar() {
    return (
      <View style={styles.optionsArea}>
        <JournalRecordOptionsBar
          onClose={() => {
            setShowJournalRecord(false);
          }}
          onDelete={() => {
            deleteJournalRecord();
          }}
        />
      </View>
    );
  }

  function noJournalRecords() {
    // This is ugly, refactor this.
    return (
      journalRecords.length === 0 ||
      (journalRecords.length === 1 && journalRecords[0].length === 0)
    );
  }

  function showJournalListView() {
    if (noJournalRecords()) {
      return (
        <View
          style={{position: 'absolute', width: '100%', height: '100%', top: 0}}
        >
          <JournalNUXScreen />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.scrollView}>{journalRecords}</ScrollView>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showJournalListView()}
      {showJournalRecord &&
        currentJournalRecord &&
        showCurrentRecordScreen(currentJournalRecord)}
      {showJournalRecord && currentJournalRecord && showOptionsIconBar()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  scrollView: {
    backgroundColor: '#121212',
  },
  optionsArea: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  closeIconArea: {
    left: 0,
    marginLeft: 24,
    width: 40,
    height: 40,
    position: 'absolute',
  },
  deleteIconArea: {
    right: 0,
    marginRight: 24,
    width: 50,
    height: 50,
    position: 'absolute',
  },
});
