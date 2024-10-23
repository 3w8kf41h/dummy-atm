import React, { type ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
  children?: ReactNode,
  flex?: number,
  flexRow?: boolean,
  alignCenter?: boolean,
}

export const Container = ({ children, flex, flexRow, alignCenter }: Props) => (
  <View style={{
    flex,
    flexDirection: flexRow ? 'row' : 'column',
    alignItems: alignCenter ? 'center' : undefined,
  }}>
    {children}
  </View>
);
