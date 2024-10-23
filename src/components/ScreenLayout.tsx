import React, { type ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export const ScreenLayout = ({ children }: { children?: ReactNode }) => (
  <SafeAreaView style={styles.container}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#093c9d',
  },
});
