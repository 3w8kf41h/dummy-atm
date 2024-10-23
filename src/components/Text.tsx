import React, { type ReactNode } from 'react';
import { Text as RnText, StyleSheet } from 'react-native';

interface Props {
  children?: ReactNode,
  h1?: boolean,
  small?: boolean,
  yellow?: boolean,
  turquoise?: boolean,
  alignLeft?: boolean,
  alignRight?: boolean,
}

export const Text = ({ children, h1, small, yellow, turquoise, alignLeft, alignRight }: Props) => (
  <RnText style={[
    styles.text,
    ...(h1 ? [styles.h1] : []),
    ...(small ? [styles.small] : []),
    ...(yellow ? [styles.yellow] : []),
    ...(turquoise ? [styles.turquoise] : []),
    ...(alignLeft ? [styles.alignLeft] : []),
    ...(alignRight ? [styles.alignRight] : []),
  ]}>
    {children}
  </RnText>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    letterSpacing: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#ffffff',
  },
  h1: {
    fontSize: 24,
    letterSpacing: 7,
  },
  small: {
    fontSize: 12,
    letterSpacing: 0,
  },
  yellow: { color: '#efe744' },
  turquoise: { color: '#27cceb' },
  alignLeft: { textAlign: 'left' },
  alignRight: { textAlign: 'right' },
});
