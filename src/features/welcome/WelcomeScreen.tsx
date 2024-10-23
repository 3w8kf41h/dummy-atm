import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Spacer } from '../../components/Spacer';

export function WelcomeScreen() {
  const { navigate } = useNavigation();
  const onWithdrawalPress = useCallback(() => navigate('Withdrawal'), [navigate]);
  const onMaintenancePress = useCallback(() => navigate('Maintenance'), [navigate]);

  return (
    <ScreenLayout>
      <Spacer flexOne />
      <Text h1>Please select service</Text>
      <Spacer size={30} />
      <Button label="Withdrawal -->" alignRight onPress={onWithdrawalPress} />
      <Spacer flexOne />
      <Button label="Operator mode" secondary onPress={onMaintenancePress} />
      <Spacer size={20} />
    </ScreenLayout>
  );
}
