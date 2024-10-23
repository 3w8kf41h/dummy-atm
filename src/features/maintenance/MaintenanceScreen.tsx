import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectVaultBills,
  selectVaultWithdrawalHistory,
  incrementCount,
  decrementCount,
  setCount,
  type Bill,
} from '../vault/vaultSlice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Text } from '../../components/Text';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Note } from '../../components/Note';
import { Spacer } from '../../components/Spacer';
import { Container } from '../../components/Container';

export function MaintenanceScreen() {
  const { goBack } = useNavigation();
  const bills = useAppSelector(selectVaultBills);
  const withdrawalHistory = useAppSelector(selectVaultWithdrawalHistory);

  return (
    <ScreenLayout>
      <FlatList
        ListHeaderComponent={<>
          <Spacer size={10} />
          <Button onPress={goBack} alignLeft label="<-- Back" />
          <Spacer size={30} />
          <Text>ATM Vault</Text>
          <Spacer size={30} />
          {(Object.keys(bills) as Bill[]).map(bill => <BillRow key={bill} bill={bill} />)}
          <Spacer size={100} />
          <Text>Withdrawal history</Text>
          <Spacer size={30} />
        </>}
        data={withdrawalHistory}
        renderItem={({ item: { timestamp, amount, success } }) => (
          <>
            <Container key={timestamp} flexRow>
              <Spacer horizontal size={10} />
              <Container flex={1}>
                <Text small>{(new Date(timestamp)).toLocaleString()}</Text>
              </Container>
              <Container flex={1}>
                <Text small>{amount}</Text>
              </Container>
              <Container flex={1}>
                <Text small>{success ? 'success' : 'error'}</Text>
              </Container>
              <Spacer horizontal size={10} />
            </Container>
            <Spacer size={7} />
          </>
        )}
        keyExtractor={item => item.timestamp.toString()}
      />
    </ScreenLayout>
  );
}

function BillRow({ bill }: { bill: Bill }) {
  const dispatch = useAppDispatch();
  const bills = useAppSelector(selectVaultBills);

  const onIncrementPress = useCallback(
    () => dispatch(incrementCount(bill)),
    [dispatch, bill],
  );
  const onDecrementPress = useCallback(
    () => dispatch(decrementCount(bill)),
    [dispatch, bill],
  );
  const onChangeText = useCallback((count: string) => dispatch(setCount({
    bill,
    amount: count ? parseInt(count, 10) : 0,
  })), [dispatch, bill]);

  return (
    <>
      <Container key={bill} flexRow alignCenter>
        <Spacer horizontal size={10} />
        <Note label={bill.replace('k', ',000')} />
        <Spacer flexOne />
        <Button label="-" onPress={onDecrementPress} />
        <TextInput
          keyboardType="number-pad"
          value={String(bills[bill])}
          onChangeText={onChangeText}
        />
        <Button label="+" onPress={onIncrementPress} />
      </Container>
      <Spacer size={4} />
    </>
  );
}
