import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';

export const Note = ({ label }: { label: string }) => (
  <View style={styles.note}>
    <Text small>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  note: {
    width: 100,
    paddingVertical: 8,
    backgroundColor: '#517669',
  },
});
