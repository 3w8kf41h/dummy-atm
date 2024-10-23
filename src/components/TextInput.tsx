import React, { type ComponentPropsWithRef } from 'react';
import { TextInput as RnTextInput, StyleSheet } from 'react-native';

export const TextInput = (props: ComponentPropsWithRef<typeof RnTextInput>) => (
  <RnTextInput {...props} placeholderTextColor="#ffffff55" style={styles.text} />
);

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontSize: 22,
    letterSpacing: 4,
    color: '#ffffff',
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
