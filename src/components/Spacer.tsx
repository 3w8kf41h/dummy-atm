import React from 'react';
import { View } from 'react-native';

interface Props {
  size?: number,
  horizontal?: boolean,
  flexOne?: boolean,
}

export const Spacer = ({ size, horizontal, flexOne }: Props) => (
  <View style={{
    width: horizontal ? size : 'auto',
    height: horizontal ? 'auto' : size,
    flex: flexOne ? 1 : undefined,
  }} />
);
