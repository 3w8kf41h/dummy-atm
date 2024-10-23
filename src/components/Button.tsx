import React, { type ComponentProps } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';

type Props = ComponentProps<typeof TouchableOpacity> & {
  label: string;
  secondary?: boolean;
  alignLeft?: boolean,
  alignRight?: boolean,
}

export const Button = ({ label, secondary, alignLeft, alignRight, ...rest }: Props) => (
  <TouchableOpacity {...rest} style={styles.container}>
    <Text yellow={!secondary} turquoise={secondary} alignLeft={alignLeft} alignRight={alignRight}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
});
