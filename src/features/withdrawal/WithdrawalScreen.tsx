import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/hooks';
import { withdraw, type BillAmounts } from '../vault/vaultSlice';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Spacer } from '../../components/Spacer';
import { Note } from '../../components/Note';
import { Container } from '../../components/Container';

export function WithdrawalScreen() {
  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(NaN);
  const [error, setError] = useState('');
  const [result, setResult] = useState<BillAmounts | undefined>();

  const onChangeText = useCallback((text: string) => setAmount(parseInt(text, 10)), []);

  const onPress = useCallback(() => {
    setResult(undefined);
    setError('');
    if (isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }
    const res = dispatch(withdraw(amount));
    if (res.success) {
      setResult(res.billAmounts);
    } else {
      setError('Unable to dispense the requested amount');
    }
  }, [amount, dispatch]);

  const onDismiss = useCallback(() => {
    setResult(undefined);
    setError('');
  }, []);

  return (
    <ScreenLayout>
      {error ? (
        <>
          <Spacer flexOne />
          <Text>{error}</Text>
          <Spacer size={30} />
          <Button onPress={onDismiss} alignRight label="OK -->" />
          <Spacer flexOne />
        </>
      ) : result ? (
        <>
          <Spacer size={30} />
          <Container alignCenter>
            {result.map(({ bill, amount: count }) => (
              <Container key={bill}>
                <Container flexRow alignCenter>
                  <Note label={bill.replace('k', ',000')} />
                  <Spacer horizontal size={10} />
                  <Text>×{count}</Text>
                </Container>
                <Spacer size={10} />
              </Container>
            ))}
          </Container>
          <Spacer size={30} />
          <Button onPress={onDismiss} alignRight label="OK -->" />
        </>
      ) : (
        <>
          <Spacer size={30} />
          <Text h1>Please enter amount</Text>
          <Spacer size={30} />
          <TextInput
            onChangeText={onChangeText}
            keyboardType="number-pad"
            placeholder="0"
            autoFocus
          />
          <Spacer size={30} />
          <Container flexRow>
            <Button onPress={goBack} alignLeft label="<-- Back" />
            <Spacer flexOne />
            <Button onPress={onPress} alignRight label="Confirm -->" />
          </Container>
        </>
      )}
    </ScreenLayout>
  );
}
