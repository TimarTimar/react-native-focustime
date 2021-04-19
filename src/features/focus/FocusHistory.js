import React from 'react';

import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        <Text style={styles.title}>Things we've focused on:</Text>
        {focusHistory.length !== 0 && (
          <>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
          </>
        )}
      </SafeAreaView>
      <View style={styles.clearContainer}>
        <RoundedButton size={75} title="Clear" onPress={() => clearHistory()} />
      </View>
    </>
  );
};

const historyItem = (status) => ({
  color: status > 1 ? 'red' : 'green',
  fontSize: fontSizes.md,
});
const styles = StyleSheet.create({
  title: { color: 'white', fontSize: fontSizes.md },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
