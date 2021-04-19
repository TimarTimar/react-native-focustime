import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/focus/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import {FocusHistory} from './src/features/focus/FocusHistory'
import AsyncStorage from '@react-native-async-storage/async-storage'



const STATUSES = {
  complete: 1,
  cancelled: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key:String(focusHistory.length+1),subject, status }]);
  };

  const onClear=()=>{setFocusHistory([])}

  const loadFocusHistory=async()=>{
    try{
      const history=await AsyncStorage.getItem("focusHistory")
      if(history && JSON.parse(history.length)){
        setFocusHistory(JSON.parse(history))
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{loadFocusHistory()}, [])

useEffect(()=>{saveFocusHistory()}, [focusHistory])

  const saveFocusHistory=async()=>{
    try{
      AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
    }catch(e){
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.complete);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.cancelled);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex:1}}>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS !== 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
